"use client";

import { useCallback, useRef, useState } from "react";
import type {
  ShiftState,
  Order,
  ActiveOffer,
  AgentDecision,
  AgentState,
  SurgeZone,
  RoadClosure,
  CarriedOrder,
} from "@/lib/types";
import {
  createInitialShiftState,
  getEventsForElapsed,
  SHIFT_DURATION_SECONDS,
} from "@/lib/simulation/shiftEngine";
import { baselineDecide } from "@/lib/agents/baselineAgent";
import { SURGE_ZONES, ROAD_CLOSURES } from "@/lib/simulation/surgeZones";
import { solveRoutePlan } from "@/lib/routing/routeSolver";
import {
  carriedSlots,
  fuelCostMxn,
  fuelLitersForKm,
  maintenanceCostMxn,
  BATCH_BONUS_PER_EXTRA,
} from "@/lib/simulation/economics";

type AgentKey = "smartAgent" | "baselineAgent";

/** Orders offered while no surge is active (simulated seconds between spawns). */
const ORDER_INTERVAL_SIM_S = 10 * 60;
/** Interval while at least one surge zone is active (rush traffic). */
const SURGE_INTERVAL_SIM_S = 4 * 60;
/** Surge jitter, simulated seconds. */
const SPAWN_JITTER_S = 4 * 60;

const MAX_SIMULTANEOUS_OFFERS = 8;

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export function useShift() {
  const [shift, setShiftState] = useState<ShiftState>(() => createInitialShiftState());
  const shiftRef = useRef<ShiftState>(shift);

  /** Single write path: updates React state AND keeps shiftRef in sync so
   *  async delivery loops always read the freshest carried/position state. */
  const commitShift = useCallback((updater: (prev: ShiftState) => ShiftState) => {
    setShiftState((prev) => {
      const next = updater(prev);
      shiftRef.current = next;
      return next;
    });
  }, []);

  const [offers, setOffers] = useState<ActiveOffer[]>([]);
  const [isSmartDeciding, setIsSmartDeciding] = useState(false);

  // Speed: simulated-seconds that advance per real second
  const [speed, _setSpeed] = useState(60); // default 60× → 4h shift in 4 real minutes
  const speedRef = useRef(60);
  // Holds the inner schedule() fn from spawnLoop so setSpeed can reschedule
  // the order timer immediately when the user changes speed mid-shift.
  const rescheduleSpawnRef = useRef<() => void>(() => {});
  const setSpeed = useCallback((n: number) => {
    speedRef.current = n;
    _setSpeed(n);
    // Re-arm the spawn timer at the new rate if a shift is running.
    if (shiftRef.current?.status === "running") {
      rescheduleSpawnRef.current();
    }
  }, []);

  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevElapsedRef = useRef(0);
  // An animation epoch per agent: a new accept mid-run bumps the epoch, which
  // cancels the previous delivery loop so the new stack re-plans from scratch.
  const epochRef = useRef<Record<AgentKey, number>>({ smartAgent: 0, baselineAgent: 0 });
  // Synchronous carry ledger shared by the planning + settlement code paths.
  // React state updates are deferred to the next render, but a second accept can
  // land before the first one commits — this ref keeps stacking deterministic.
  const queueRef = useRef<Record<AgentKey, CarriedOrder[]>>({
    smartAgent: [],
    baselineAgent: [],
  });

  // ── Derived simulated time ─────────────────────────────────────────────
  const simulatedNow = shift.simShiftStart + shift.elapsedSeconds * 1000;

  // ── Fetch helpers ──────────────────────────────────────────────────────
  // Orders expire after 15 simulated minutes — converted to real ms at current speed.
  // Clamped: min 2s (readable at 300×), max 15s (sane at 1×).
  const ORDER_EXPIRY_SIM_S = 15 * 60;
  const fetchOrder = useCallback(async (activeSurgeZones: SurgeZone[]) => {
    const res = await fetch("/api/simulation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activeSurgeZones }),
    });
    const order = await res.json() as Order;
    const expiryMs = Math.max(2_000, Math.min(15_000, (ORDER_EXPIRY_SIM_S / speedRef.current) * 1000));
    return { ...order, expiresAt: Date.now() + expiryMs };
  }, []);

  const fetchRoute = useCallback(
    async (from: { lat: number; lng: number }, to: { lat: number; lng: number }, departureTime?: number) => {
      try {
        const res = await fetch("/api/routing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ from, to, departureTime }),
        });
        return res.json() as Promise<{ coords: { lat: number; lng: number }[]; km: number; minutes: number }>;
      } catch {
        return { coords: [from, to], km: 1, minutes: 3 };
      }
    },
    []
  );

  // ── Smart agent API call ───────────────────────────────────────────────
  const smartDecide = useCallback(
    async (
      order: Order,
      agentState: AgentState,
      remainingSeconds: number,
      activeSurgeZones: SurgeZone[],
      activeClosures: RoadClosure[],
      recentDecisions: AgentDecision[]
    ): Promise<AgentDecision> => {
      try {
        const res = await fetch("/api/agent/decide", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order,
            agentState,
            remainingSeconds,
            activeSurgeZones,
            activeClosures,
            recentDecisions,
          }),
        });
        return res.json() as Promise<AgentDecision>;
      } catch {
        return {
          orderId: order.id,
          decision: "skip",
          reason: "Network error — defaulting to skip.",
          confidence: 0.1,
          timestamp: Date.now(),
          pickupLabel: order.pickupLabel,
          dropoffLabel: order.dropoffLabel,
          payout: order.payout,
          estimatedMinutes: order.estimatedMinutes,
        };
      }
    },
    []
  );

  const enrichDecision = useCallback(
    (decision: AgentDecision, order: Order): AgentDecision => ({
      ...decision,
      pickupLabel: order.pickupLabel,
      dropoffLabel: order.dropoffLabel,
      payout: order.payout,
      estimatedMinutes: order.estimatedMinutes,
    }),
    []
  );

  // ── Settle a single dropoff: earnings, fuel, maintenance, bonus ─────────
  const settleDropoff = useCallback(
    (
      agentKey: AgentKey,
      order: Order,
      legKm: number,
      legMinutes: number,
      legIndex: number, // 0 = first dropoff of the run (no batch bonus)
      remainingCarried: number, // orders still carried after this dropoff
      dropoffCoord: { lat: number; lng: number }
    ) => {
      void remainingCarried;
      const s = shiftRef.current;
      const agent = s[agentKey];
      const capacity = agent.capacity;

      const fuelUse = fuelLitersForKm(legKm, capacity);
      const fuelMxn = fuelCostMxn(legKm, capacity);
      const maint = maintenanceCostMxn(legKm);
      const bonus = legIndex > 0 ? BATCH_BONUS_PER_EXTRA : 0;
      const gross = order.payout + order.tip + bonus;
      const net = gross - fuelMxn - maint;

      // Keep the planning ledger in sync so late-arriving accepts re-plan from
      // the true remaining load.
      queueRef.current[agentKey] = queueRef.current[agentKey].filter(
        (c) => c.order.id !== order.id
      );

      commitShift((prev) => {
        const a = prev[agentKey];
        const newCarried = a.carriedOrders.filter(
          (c) => c.order.id !== order.id
        );
        const runDone = newCarried.length === 0;
        const grossE = a.earnings + gross;
        const netE = a.netEarnings + net;
        return {
          ...prev,
          [agentKey]: {
            ...a,
            position: dropoffCoord,
            earnings: grossE,
            netEarnings: netE,
            ordersCompleted: a.ordersCompleted + 1,
            kmDriven: Math.round((a.kmDriven + legKm) * 10) / 10,
            deadMilesKm: a.deadMilesKm,
            carriedOrders: newCarried,
            runOrderCount: runDone ? 0 : newCarried.length,
            currentRoute: runDone ? [] : prev[agentKey].currentRoute,
            currentRouteMeta: runDone ? null : prev[agentKey].currentRouteMeta,
            isMoving: runDone ? false : prev[agentKey].isMoving,
            batchBonusEarned: a.batchBonusEarned + bonus,
            tipsEarned: a.tipsEarned + order.tip,
            expenses: {
              fuelLiters: Math.round((a.expenses.fuelLiters + fuelUse) * 10) / 10,
              fuelMxn: Math.round((a.expenses.fuelMxn + fuelMxn) * 10) / 10,
              maintenanceMxn: Math.round((a.expenses.maintenanceMxn + maint) * 10) / 10,
            },
            earningsHistory: [
              ...a.earningsHistory,
              { at: prev.elapsedSeconds, gross: grossE, net: netE },
            ],
          },
        };
      });
    },
    [commitShift]
  );

  // ── Deliver an accepted order (start or stack) through the full run ─────
  const runDelivery = useCallback(
    async (agentKey: AgentKey, order: Order) => {
      const s = shiftRef.current;
      if (!s || s.status !== "running") return;

      // Queued ledger is the authoritative carry state for planning (accepts
      // serialize synchronously here even while React state lags a render).
      const carried: CarriedOrder[] = [...queueRef.current[agentKey]];
      if (!carried.some((c) => c.order.id === order.id)) return; // not accepted
      if (carriedSlots(carried) > s[agentKey].capacity) return;

      const plan = solveRoutePlan(carried, s[agentKey].position);
      if (plan.stops.length === 0) return;

      const epoch = ++epochRef.current[agentKey];

      const departureTime = Math.floor(
        (s.simShiftStart + s.elapsedSeconds * 1000) / 1000
      );

      // Fetch every leg of the re-solved route (parallel).
      const fromPos = s[agentKey].position;
      let prev = fromPos;
      const legTargets = plan.stops.map((stop) => {
        const leg = { from: prev, to: stop.coord };
        prev = stop.coord;
        return leg;
      });
      const legs = await Promise.all(
        legTargets.map((l) => fetchRoute(l.from, l.to, departureTime))
      );

      const totalMinutes = Math.max(1, legs.reduce((acc, l) => acc + l.minutes, 0));
      const totalTravelMs = Math.min(
        (totalMinutes * 60_000) / speedRef.current,
        22_000
      );

      let delivered = 0;

      for (let i = 0; i < plan.stops.length; i++) {
        if (epochRef.current[agentKey] !== epoch) return; // superseded by a new stack
        if (shiftRef.current.status !== "running") return;

        const stop = plan.stops[i];
        const leg = legs[i];
        const legRoute = leg.coords;
        const pickupIndex = stop.kind === "pickup" ? legRoute.length : 0;
        const durMs = Math.max(450, Math.round((leg.minutes / totalMinutes) * totalTravelMs));

        // Animate this leg.
        commitShift((p) => ({
          ...p,
          [agentKey]: {
            ...p[agentKey],
            currentRoute: legRoute,
            currentRouteMeta: {
              startedAt: Date.now(),
              durationMs: durMs,
              pickupIndex,
            },
            isMoving: true,
            stops: plan.stops,
          },
        }));

        await sleep(durMs);
        if (epochRef.current[agentKey] !== epoch) return;

        if (stop.kind === "pickup") {
          // Courier reaches the producer: mark the order as picked up (repo arrives later).
          commitShift((p) => ({
            ...p,
            [agentKey]: {
              ...p[agentKey],
              position: stop.coord,
              carriedOrders: p[agentKey].carriedOrders.map((c) =>
                c.order.id === stop.orderId ? { ...c, pickedUp: true } : c
              ),
            },
          }));
        } else {
          const carriedOrder = carried.find((c) => c.order.id === stop.orderId);
          if (carriedOrder) {
            const remainingCarried = Math.max(0, carried.length - 1 - delivered);
            settleDropoff(agentKey, carriedOrder.order, leg.km, leg.minutes, delivered, remainingCarried, stop.coord);
            delivered += 1;
          }
        }
      }
    },
    [fetchRoute, settleDropoff, commitShift]
  );

  // ── Record a decision for one agent; accept → start a delivery ──────────
  const recordDecision = useCallback(
    (agentKey: AgentKey, decision: AgentDecision, order: Order) => {
      if (shiftRef.current.status !== "running") return;

      const queued = queueRef.current[agentKey];
      const accepted =
        decision.decision === "accept" &&
        carriedSlots(queued) + order.slots <= shiftRef.current[agentKey].capacity;

      if (accepted) {
        // Queue synchronously so a same-tick second accept sees this order.
        queueRef.current[agentKey] = [...queued, { order, pickedUp: false }];
      }

      commitShift((prev) => {
        const a = prev[agentKey];
        const nextAgent: AgentState = {
          ...a,
          lastDecision: decision,
          decisionHistory: [...a.decisionHistory, decision],
          acceptCount: a.acceptCount + (accepted ? 1 : 0),
          skipCount: a.skipCount + (accepted ? 0 : 1),
          surgeOrdersAccepted:
            a.surgeOrdersAccepted + (accepted && order.isSurge ? 1 : 0),
          ...(accepted
            ? {
                carriedOrders: [...a.carriedOrders, { order, pickedUp: false }],
                runOrderCount: a.carriedOrders.length + 1,
                isMoving: true,
              }
            : {}),
        };
        return {
          ...prev,
          [agentKey]: nextAgent,
          eventLog: [
            {
              type: "order" as const,
              label: `${agentKey === "smartAgent" ? "Smart" : "Baseline"}: ${accepted ? "ACCEPT" : "SKIP"} — ${order.pickupLabel} → ${order.dropoffLabel} (${order.slots} slot${order.slots > 1 ? "s" : ""}${order.isSurge ? " ⚡" : ""})`,
              timestamp: Date.now(),
              agentType: agentKey === "smartAgent" ? "smart" : "baseline",
            },
            ...prev.eventLog.slice(0, 29),
          ],
        };
      });

      if (accepted) void runDelivery(agentKey, order);
    },
    [commitShift, runDelivery]
  );

  const decideSmartFor = useCallback(
    (order: Order, remainingSeconds: number) => {
      const s = shiftRef.current;
      setIsSmartDeciding(true);
      smartDecide(
        order,
        s.smartAgent,
        remainingSeconds,
        s.activeSurgeZones,
        s.activeClosures,
        s.smartAgent.decisionHistory
      ).then((raw) => {
        setIsSmartDeciding(false);
        if (shiftRef.current.status !== "running") return;
        recordDecision("smartAgent", enrichDecision(raw, order), order);
      });
    },
    [smartDecide, enrichDecision, recordDecision]
  );

  const decideBaselineFor = useCallback(
    (order: Order) => {
      if (shiftRef.current.status !== "running") return;
      const raw = baselineDecide(order, shiftRef.current.baselineAgent);
      recordDecision("baselineAgent", enrichDecision(raw, order), order);
    },
    [enrichDecision, recordDecision]
  );

  // ── Present one or more simultaneous offers to both agents ──────────────
  const presentOrders = useCallback(
    (incoming: Order[]) => {
      if (!incoming.length) return;
      const s = shiftRef.current;
      if (!s || s.status !== "running") return;

      const now = Date.now();
      setOffers((prev) =>
        [...prev, ...incoming.map((order) => ({ order, expiresAt: order.expiresAt }))]
          .filter((o) => o.expiresAt > now)
          .slice(-MAX_SIMULTANEOUS_OFFERS)
      );

      const remainingSeconds = SHIFT_DURATION_SECONDS - s.elapsedSeconds;
      for (const order of incoming) {
        decideSmartFor(order, remainingSeconds);
        decideBaselineFor(order);
      }
    },
    [decideSmartFor, decideBaselineFor]
  );

  // ── Spawn loop: surge-aware cadence + bursts of simultaneous orders ─────
  const firstSpawnRef = useRef(true);
  const spawnLoop = useCallback(() => {
    const schedule = () => {
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
      // Always expose the latest schedule fn so setSpeed can re-arm the timer.
      rescheduleSpawnRef.current = schedule;

      const s = shiftRef.current;
      if (!s || s.status !== "running") return;

      const first = firstSpawnRef.current;
      firstSpawnRef.current = false;

      const surgeActive = s.activeSurgeZones.length > 0;
      const base = surgeActive ? SURGE_INTERVAL_SIM_S : ORDER_INTERVAL_SIM_S;
      const delaySim = base + Math.random() * SPAWN_JITTER_S;
      const delayMs = first ? 1500 : (delaySim / speedRef.current) * 1000;

      spawnTimerRef.current = setTimeout(async () => {
        const cur = shiftRef.current;
        if (!cur || cur.status !== "running") return;

        // Always present 2–4 simultaneous offers so the smart agent can choose
        // the best ROI order while the baseline blindly takes the first one.
        // Surge bumps the ceiling to 5 for extra chaos.
        const surging = cur.activeSurgeZones.length > 0;
        const r = Math.random();
        const burstCount = surging
          ? (r < 0.2 ? 3 : r < 0.6 ? 4 : 5)
          : (r < 0.3 ? 2 : r < 0.75 ? 3 : 4);

        const orders: Order[] = [];
        for (let i = 0; i < burstCount; i++) {
          try {
            orders.push(await fetchOrder(cur.activeSurgeZones));
          } catch {
            // transient generator failure — skip this offer
          }
        }
        presentOrders(orders);
        schedule();
      }, delayMs);
    };
    schedule();
  }, [fetchOrder, presentOrders]);

  // ── Start shift ────────────────────────────────────────────────────────
  const startShift = useCallback((capacity: number) => {
    prevElapsedRef.current = 0;
    epochRef.current = { smartAgent: 0, baselineAgent: 0 };
    queueRef.current = { smartAgent: [], baselineAgent: [] };
    setOffers([]);

    // Build the initial running state and write it to shiftRef *synchronously*
    // before starting the spawn loop. commitShift queues a setShiftState updater
    // that runs asynchronously — if we called spawnLoop() after commitShift()
    // the spawn loop's status guard would still see "idle" and exit immediately.
    const fresh = createInitialShiftState(capacity);
    const initialState: ShiftState = { ...fresh, status: "running", startedAt: Date.now(), elapsedSeconds: 0 };
    shiftRef.current = initialState;
    setShiftState(initialState);

    // Counter-based clock: advance simulated time by `speed` each real second
    tickRef.current = setInterval(() => {
      commitShift((prev) => {
        if (prev.status !== "running") return prev;

        const newElapsed = Math.min(
          prev.elapsedSeconds + speedRef.current,
          SHIFT_DURATION_SECONDS
        );

        const { surgeZones, closures } = getEventsForElapsed(newElapsed, prevElapsedRef.current);
        prevElapsedRef.current = newElapsed;

        const newActiveSurgeZones = [
          ...prev.activeSurgeZones,
          ...SURGE_ZONES.filter(
            (z) =>
              surgeZones.some((sz) => sz.id === z.id) &&
              !prev.activeSurgeZones.some((az) => az.id === z.id)
          ),
        ];

        const newActiveClosures = [
          ...prev.activeClosures,
          ...ROAD_CLOSURES.filter(
            (c) =>
              closures.some((cl) => cl.id === c.id) &&
              !prev.activeClosures.some((ac) => ac.id === c.id)
          ),
        ];

        const newEventLog = [
          ...surgeZones.map((z) => ({
            type: "surge" as const,
            label: `⚡ ${z.label}`,
            timestamp: Date.now(),
          })),
          ...closures.map((c) => ({
            type: "closure" as const,
            label: `🚧 ${c.label}`,
            timestamp: Date.now(),
          })),
          ...prev.eventLog,
        ].slice(0, 30);

        if (newElapsed >= SHIFT_DURATION_SECONDS) {
          clearInterval(tickRef.current!);
          clearTimeout(spawnTimerRef.current!);
          spawnTimerRef.current = null;
          setOffers([]);
          return {
            ...prev,
            status: "ended",
            elapsedSeconds: SHIFT_DURATION_SECONDS,
            activeSurgeZones: newActiveSurgeZones,
            activeClosures: newActiveClosures,
            eventLog: newEventLog,
          };
        }

        return {
          ...prev,
          elapsedSeconds: newElapsed,
          activeSurgeZones: newActiveSurgeZones,
          activeClosures: newActiveClosures,
          eventLog: newEventLog,
        };
      });

      // Purge expired offers once per real second.
      setOffers((prev) => prev.filter((o) => o.expiresAt > Date.now()));
    }, 1000);

    // Spawn loop handles the first order (1.5s) then enters surge-aware cadence.
    firstSpawnRef.current = true;
    spawnLoop();
  }, [commitShift, spawnLoop]);

  // ── Reset ──────────────────────────────────────────────────────────────
  const resetShift = useCallback(() => {
    clearInterval(tickRef.current!);
    clearTimeout(spawnTimerRef.current!);
    spawnTimerRef.current = null;
    prevElapsedRef.current = 0;
    epochRef.current = { smartAgent: 0, baselineAgent: 0 };
    queueRef.current = { smartAgent: [], baselineAgent: [] };
    setOffers([]);
    commitShift(() => createInitialShiftState(shiftRef.current.capacity));
  }, [commitShift]);

  return {
    shift,
    offers,
    isSmartDeciding,
    speed,
    setSpeed,
    simulatedNow,
    startShift,
    resetShift,
  };
}