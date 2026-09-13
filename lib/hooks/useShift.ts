"use client";

import { useCallback, useRef, useState } from "react";
import type {
  ShiftState,
  Order,
  ActiveOffer,
  AgentDecision,
  AgentState,
  SurgeZone,
  CarriedOrder,
} from "@/lib/types";
import {
  createInitialShiftState,
  getEventsForElapsed,
  SHIFT_DURATION_SECONDS,
} from "@/lib/simulation/shiftEngine";
import { SURGE_ZONES, ROAD_CLOSURES } from "@/lib/simulation/surgeZones";
import { solveRoutePlan } from "@/lib/routing/routeSolver";
import {
  carriedSlots,
  fuelCostMxn,
  fuelLitersForKm,
  maintenanceCostMxn,
  BATCH_BONUS_PER_EXTRA,
} from "@/lib/simulation/economics";
import {
  baselineDecision,
  smartDecision,
  type DecisionInput,
} from "@/lib/agents/decisionCore";
import {
  COMPETE_MODE,
  SLOW_WINDOW_PROBABILITY,
  SLOW_WINDOW_EXTRA_SIM_S,
} from "@/lib/agents/agentConfig";

type AgentKey = "smartAgent" | "baselineAgent";

/** Orders offered while no surge is active (simulated seconds between spawns). */
const ORDER_INTERVAL_SIM_S = 10 * 60;
/** Interval while at least one surge zone is active (rush traffic). */
const SURGE_INTERVAL_SIM_S = 4 * 60;
/** Surge jitter, simulated seconds. */
const SPAWN_JITTER_S = 4 * 60;

/** Simulated seconds an offer stays on the table (scaled to real ms by speed). */
const ORDER_EXPIRY_SIM_S = 15 * 60;

const MAX_SIMULTANEOUS_OFFERS = 8;

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Burst evaluation ────────────────────────────────────────────────────────
// Smart agent evaluates all simultaneous orders in one pass, greedily picking
// the highest net-MXN/min offers that fit the slot budget and shift time.
// After each pick, the carry state is re-evaluated so later offers see the true
// remaining capacity. Orders that would have been accepted but were outranked
// or capacity-filled are turned into skip decisions with a diagnostic reason.

function smartBurstDecisions(
  orders: Order[],
  base: Omit<DecisionInput, "order">
): AgentDecision[] {
  // First pass: evaluate every order against the current carry snapshot.
  const evaluated = orders.map((order) => {
    const input: DecisionInput = { ...base, order };
    const res = smartDecision(input);
    const candidate = [...base.carried, { order, pickedUp: false }];
    const eff =
      res.decision === "accept"
        ? solveRoutePlan(candidate, base.position).totalMinutes
        : null;
    return { order, res, eff };
  });

  const accepts = evaluated.filter((e) => e.res.decision === "accept");
  const skips = evaluated
    .filter((e) => e.res.decision === "skip")
    .map((e) => ({ order: e.order, decision: e.res }));

  // Sort by net MXN/min descending — take the best ones first.
  const planSolver = (c: CarriedOrder[]) =>
    solveRoutePlan(c, base.position).totalMinutes;
  const effNet = (c: CarriedOrder[]) => {
    const p = planSolver(c);
    return p > 0 ? 1 / p : 0;
  };

  accepts.sort((a, b) => {
    const ca = [...base.carried, { order: a.order, pickedUp: false }];
    const cb = [...base.carried, { order: b.order, pickedUp: false }];
    return effNet(cb) - effNet(ca);
  });

  let simCarried = [...base.carried];
  const simCapacity = base.capacity;
  const accepted: { order: Order; decision: AgentDecision }[] = [];

  for (const c of accepts) {
    if (carriedSlots(simCarried) + c.order.slots > simCapacity) {
      const topLabel = accepted[0]?.order.pickupLabel ?? "—";
      skips.push({
        order: c.order,
        decision: {
          ...c.res,
          decision: "skip" as const,
          reason: `Outranked by ${topLabel} — burst capacity full.`,
          confidence: 0.6,
        },
      });
      continue;
    }
    const updInput: DecisionInput = { ...base, order: c.order, carried: simCarried };
    const recheck = smartDecision(updInput);
    if (recheck.decision === "accept") {
      accepted.push({ order: c.order, decision: c.res });
      simCarried = [...simCarried, { order: c.order, pickedUp: false }];
    } else {
      skips.push({ order: c.order, decision: recheck });
    }
  }

  // Build final array matching input order
  const out = new Map<string, AgentDecision>();
  for (const a of accepted) out.set(a.order.id, a.decision);
  for (const s of skips) out.set(s.order.id, s.decision);
  return orders.map((o) => out.get(o.id)!);
}

// ── Baseline burst (greedy fill, one at a time, same as existing) ──────────
function baselineBurstDecisions(
  orders: Order[],
  base: Omit<DecisionInput, "order">
): AgentDecision[] {
  const results: AgentDecision[] = [];
  let simCarried = [...base.carried];
  for (const order of orders) {
    const res = baselineDecision({ ...base, order, carried: simCarried });
    results.push(res);
    if (res.decision === "accept") {
      simCarried = [...simCarried, { order, pickedUp: false }];
    }
  }
  return results;
}

export function useShift() {
  const [shift, setShiftState] = useState<ShiftState>(() =>
    createInitialShiftState()
  );
  const shiftRef = useRef<ShiftState>(shift);

  /** Single write path: updates React state AND keeps shiftRef in sync so
   *  async delivery loops always read the freshest carried/position state. */
  const commitShift = useCallback(
    (updater: (prev: ShiftState) => ShiftState) => {
      setShiftState((prev) => {
        const next = updater(prev);
        shiftRef.current = next;
        return next;
      });
    },
    []
  );

  const [offers, setOffers] = useState<ActiveOffer[]>([]);

  // Speed: simulated-seconds that advance per real second
  const [speed, _setSpeed] = useState(60);
  const speedRef = useRef(60);
  const rescheduleSpawnRef = useRef<() => void>(() => {});
  const setSpeed = useCallback((n: number) => {
    speedRef.current = n;
    _setSpeed(n);
    if (shiftRef.current?.status === "running") {
      rescheduleSpawnRef.current();
    }
  }, []);

  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevElapsedRef = useRef(0);
  const epochRef = useRef<Record<AgentKey, number>>({
    smartAgent: 0,
    baselineAgent: 0,
  });
  const queueRef = useRef<Record<AgentKey, CarriedOrder[]>>({
    smartAgent: [],
    baselineAgent: [],
  });

  const simulatedNow = shift.simShiftStart + shift.elapsedSeconds * 1000;

  // ── Fetch helpers ──────────────────────────────────────────────────────
  const fetchOrder = useCallback(async (activeSurgeZones: SurgeZone[]) => {
    const res = await fetch("/api/simulation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activeSurgeZones }),
    });
    const order = (await res.json()) as Order;
    const expiryMs = Math.max(
      2_000,
      Math.min(
        15_000,
        (ORDER_EXPIRY_SIM_S / speedRef.current) * 1000
      )
    );
    return { ...order, expiresAt: Date.now() + expiryMs };
  }, []);

  const fetchRoute = useCallback(
    async (
      from: { lat: number; lng: number },
      to: { lat: number; lng: number },
      departureTime?: number
    ) => {
      try {
        const res = await fetch("/api/routing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ from, to, departureTime }),
        });
        return res.json() as Promise<{
          coords: { lat: number; lng: number }[];
          km: number;
          minutes: number;
        }>;
      } catch {
        return { coords: [from, to], km: 1, minutes: 3 };
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

  // ── Settle a single dropoff ────────────────────────────────────────────
  const settleDropoff = useCallback(
    (
      agentKey: AgentKey,
      order: Order,
      legKm: number,
      legMinutes: number,
      legIndex: number,
      _remainingCarried: number,
      dropoffCoord: { lat: number; lng: number }
    ) => {
      const s = shiftRef.current;
      const agent = s[agentKey];
      const capacity = agent.capacity;

      const fuelUse = fuelLitersForKm(legKm, capacity);
      const fuelMxn = fuelCostMxn(legKm, capacity);
      const maint = maintenanceCostMxn(legKm);
      const bonus = legIndex > 0 ? BATCH_BONUS_PER_EXTRA : 0;
      const gross = order.payout + order.tip + bonus;
      const net = gross - fuelMxn - maint;

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
            currentRouteMeta: runDone
              ? null
              : prev[agentKey].currentRouteMeta,
            isMoving: runDone ? false : prev[agentKey].isMoving,
            batchBonusEarned: a.batchBonusEarned + bonus,
            tipsEarned: a.tipsEarned + order.tip,
            expenses: {
              fuelLiters:
                Math.round((a.expenses.fuelLiters + fuelUse) * 10) / 10,
              fuelMxn:
                Math.round((a.expenses.fuelMxn + fuelMxn) * 10) / 10,
              maintenanceMxn:
                Math.round(
                  (a.expenses.maintenanceMxn + maint) * 10
                ) / 10,
            },
            earningsHistory: [
              ...a.earningsHistory,
              {
                at: prev.elapsedSeconds,
                gross: grossE,
                net: netE,
              },
            ],
          },
        };
      });
    },
    [commitShift]
  );

  // ── Deliver an accepted order through the full run ─────────────────────
  const runDelivery = useCallback(
    async (agentKey: AgentKey, order: Order) => {
      const s = shiftRef.current;
      if (!s || s.status !== "running") return;

      const carried: CarriedOrder[] = [...queueRef.current[agentKey]];
      if (!carried.some((c) => c.order.id === order.id)) return;
      if (carriedSlots(carried) > s[agentKey].capacity) return;

      const plan = solveRoutePlan(carried, s[agentKey].position);
      if (plan.stops.length === 0) return;

      const epoch = ++epochRef.current[agentKey];

      // Count the dead-head km (position → first pickup) against this run.
      commitShift((p) =>
        p.status === "running"
          ? {
              ...p,
              [agentKey]: {
                ...p[agentKey],
                deadMilesKm: p[agentKey].deadMilesKm + plan.deadKm,
              },
            }
          : p
      );

      const departureTime = Math.floor(
        (s.simShiftStart + s.elapsedSeconds * 1000) / 1000
      );

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

      const totalMinutes = Math.max(
        1,
        legs.reduce((acc, l) => acc + l.minutes, 0)
      );
      const totalTravelMs = Math.min(
        (totalMinutes * 60_000) / speedRef.current,
        22_000
      );

      let delivered = 0;

      for (let i = 0; i < plan.stops.length; i++) {
        if (epochRef.current[agentKey] !== epoch) return;
        if (shiftRef.current.status !== "running") return;

        const stop = plan.stops[i];
        const leg = legs[i];
        const legRoute = leg.coords;
        const pickupIndex =
          stop.kind === "pickup" ? legRoute.length : 0;
        const durMs = Math.max(
          450,
          Math.round((leg.minutes / totalMinutes) * totalTravelMs)
        );

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
          commitShift((p) => ({
            ...p,
            [agentKey]: {
              ...p[agentKey],
              position: stop.coord,
              carriedOrders: p[agentKey].carriedOrders.map((c) =>
                c.order.id === stop.orderId
                  ? { ...c, pickedUp: true }
                  : c
              ),
            },
          }));
        } else {
          const carriedOrder = carried.find(
            (c) => c.order.id === stop.orderId
          );
          if (carriedOrder) {
            const remainingCarried = Math.max(
              0,
              carried.length - 1 - delivered
            );
            settleDropoff(
              agentKey,
              carriedOrder.order,
              leg.km,
              leg.minutes,
              delivered,
              remainingCarried,
              stop.coord
            );
            delivered += 1;
          }
        }
      }
    },
    [fetchRoute, settleDropoff, commitShift]
  );

  // ── Record a decision for one agent ────────────────────────────────────
  const recordDecision = useCallback(
    (
      agentKey: AgentKey,
      decisionResult: AgentDecision,
      order: Order,
      opts?: {
        elapsedSeconds?: number;
        claimResult?: "won" | "lost" | "neutral";
      }
    ) => {
      if (shiftRef.current.status !== "running") return;

      const queued = queueRef.current[agentKey];
      const fits =
        carriedSlots(queued) + order.slots <=
        shiftRef.current[agentKey].capacity;
      const accepted = decisionResult.decision === "accept" && fits;
      const hadCarried = queued.length > 0;

      if (accepted) {
        queueRef.current[agentKey] = [
          ...queued,
          { order, pickedUp: false },
        ];
      }

      commitShift((prev) => {
        const a = prev[agentKey];
        const nextAgent: AgentState = {
          ...a,
          lastDecision: decisionResult,
          decisionHistory: [...a.decisionHistory, decisionResult],
          acceptCount: a.acceptCount + (accepted ? 1 : 0),
          skipCount: a.skipCount + (accepted ? 0 : 1),
          surgeOrdersAccepted:
            a.surgeOrdersAccepted + (accepted && order.isSurge ? 1 : 0),
          stacksWon:
            a.stacksWon +
            (accepted && hadCarried ? 1 : 0),
          offersWon:
            a.offersWon +
            (opts?.claimResult === "won" ? 1 : 0),
          offersLost:
            a.offersLost +
            (opts?.claimResult === "lost" ? 1 : 0),
          ...(accepted
            ? {
                carriedOrders: [
                  ...a.carriedOrders,
                  { order, pickedUp: false },
                ],
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
              agentType:
                agentKey === "smartAgent" ? "smart" : "baseline",
            },
            ...prev.eventLog.slice(0, 29),
          ],
        };
      });

      if (accepted) void runDelivery(agentKey, order);
    },
    [commitShift, runDelivery]
  );

  // ── Present simultaneous orders to both agents ────────────────────────
  const presentOrders = useCallback(
    (incoming: Order[]) => {
      if (!incoming.length) return;
      const s = shiftRef.current;
      if (!s || s.status !== "running") return;

      const now = Date.now();
      setOffers((prev) =>
        [
          ...prev,
          ...incoming.map((order) => ({
            order,
            expiresAt: order.expiresAt,
            createdAt: now,
          })),
        ]
          .filter((o) => o.expiresAt > now)
          .slice(-MAX_SIMULTANEOUS_OFFERS)
      );

      const remaining = SHIFT_DURATION_SECONDS - s.elapsedSeconds;
      const elapsed = s.elapsedSeconds;

      const smartCarried = queueRef.current.smartAgent;
      const baseCarried = queueRef.current.baselineAgent;

      const baseInput: Pick<
        DecisionInput,
        | "elapsedSeconds"
        | "remainingSeconds"
        | "activeSurgeZones"
        | "activeClosures"
        | "capacity"
      > = {
        elapsedSeconds: elapsed,
        remainingSeconds: remaining,
        activeSurgeZones: s.activeSurgeZones,
        activeClosures: s.activeClosures,
        capacity: s.capacity,
      };

      // ── In-process smart decisions (synchronous burst evaluation) ─────
      const smartResults = smartBurstDecisions(incoming, {
        ...baseInput,
        carried: smartCarried,
        position: s.smartAgent.position,
        agentType: "smart",
        recentDecisions: s.smartAgent.decisionHistory,
        offerSources: incoming.map((o) => o.pickupCoords),
      });

      const baselineResults = baselineBurstDecisions(incoming, {
        ...baseInput,
        carried: baseCarried,
        position: s.baselineAgent.position,
        agentType: "baseline",
        recentDecisions: s.baselineAgent.decisionHistory,
      });

      // ── Claim resolution (compete mode) or shared ─────────────────────
      if (COMPETE_MODE && smartResults.length > 0) {
        let claimIdx = 0;
        for (let i = 0; i < incoming.length; i++) {
          const order = incoming[i];
          const smartRes = smartResults[i];
          const baseRes = baselineResults[i];
          const smartFits =
            carriedSlots(queueRef.current.smartAgent) + order.slots <=
            s.smartAgent.capacity;
          const baseFits =
            carriedSlots(queueRef.current.baselineAgent) + order.slots <=
            s.baselineAgent.capacity;
          const smartWants = smartRes.decision === "accept" && smartFits;
          const baseWants = baseRes.decision === "accept" && baseFits;

          let owner: AgentKey | null = null;
          if (smartWants && baseWants) {
            owner = claimIdx % 2 === 0 ? "smartAgent" : "baselineAgent";
          } else if (smartWants) {
            owner = "smartAgent";
          } else if (baseWants) {
            owner = "baselineAgent";
          }
          claimIdx++;

          if (!owner) {
            recordDecision(
              "smartAgent",
              enrichDecision(smartRes, order),
              order,
              { elapsedSeconds: elapsed, claimResult: "neutral" }
            );
            recordDecision(
              "baselineAgent",
              enrichDecision(baseRes, order),
              order,
              { elapsedSeconds: elapsed, claimResult: "neutral" }
            );
            continue;
          }

          const loser =
            owner === "smartAgent"
              ? "baselineAgent"
              : "smartAgent";
          const winnerRes =
            owner === "smartAgent" ? smartRes : baseRes;
          const loserLost =
            owner === "smartAgent" ? baseWants : smartWants;
          const loserRes: AgentDecision = {
            orderId: order.id,
            decision: "skip",
            reason: `Compete mode — order claimed by ${owner === "smartAgent" ? "Smart" : "Baseline"}.`,
            confidence: 0.5,
            timestamp: Date.now(),
            pickupLabel: order.pickupLabel,
            dropoffLabel: order.dropoffLabel,
            payout: order.payout,
            estimatedMinutes: order.estimatedMinutes,
          };

          recordDecision(
            owner,
            enrichDecision(winnerRes, order),
            order,
            {
              elapsedSeconds: elapsed,
              claimResult: "won",
            }
          );
          recordDecision(
            loser,
            loserLost ? loserRes : enrichDecision(owner === "smartAgent" ? baseRes : smartRes, order),
            order,
            {
              elapsedSeconds: elapsed,
              claimResult: loserLost ? "lost" : "neutral",
            }
          );
        }
      } else if (smartResults.length > 0) {
        // Shared mode — both agents evaluate every order independently
        for (let i = 0; i < incoming.length; i++) {
          const order = incoming[i];
          recordDecision(
            "smartAgent",
            enrichDecision(smartResults[i], order),
            order,
            { elapsedSeconds: elapsed }
          );
          recordDecision(
            "baselineAgent",
            enrichDecision(baselineResults[i], order),
            order,
            { elapsedSeconds: elapsed }
          );
        }
      }
    },
    [enrichDecision, recordDecision]
  );

  // ── Spawn loop: surge-aware cadence + bursts ──────────────────────────
  const firstSpawnRef = useRef(true);
  const spawnLoop = useCallback(() => {
    const schedule = () => {
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
      rescheduleSpawnRef.current = schedule;

      const s = shiftRef.current;
      if (!s || s.status !== "running") return;

      const first = firstSpawnRef.current;
      firstSpawnRef.current = false;

      const surgeActive = s.activeSurgeZones.length > 0;
      const base = surgeActive ? SURGE_INTERVAL_SIM_S : ORDER_INTERVAL_SIM_S;
      const slowWindow =
        !surgeActive && Math.random() < SLOW_WINDOW_PROBABILITY;
      const extra = slowWindow ? SLOW_WINDOW_EXTRA_SIM_S : 0;
      const delaySim = base + extra + Math.random() * SPAWN_JITTER_S;
      const delayMs = first
        ? 1500
        : (delaySim / speedRef.current) * 1000;

      spawnTimerRef.current = setTimeout(async () => {
        const cur = shiftRef.current;
        if (!cur || cur.status !== "running") return;

        const busted = cur.activeSurgeZones.length > 0;
        let burstCount = 1;
        if (busted) {
          const r = Math.random();
          burstCount = r < 0.35 ? 2 : r < 0.8 ? 1 : 3;
        }

        const orders: Order[] = [];
        for (let i = 0; i < burstCount; i++) {
          try {
            orders.push(await fetchOrder(cur.activeSurgeZones));
          } catch {
            // transient generator failure
          }
        }
        presentOrders(orders);
        schedule();
      }, delayMs);
    };
    schedule();
  }, [fetchOrder, presentOrders]);

  // ── Start shift ──────────────────────────────────────────────────────
  const startShift = useCallback(
    (capacity: number) => {
      prevElapsedRef.current = 0;
      epochRef.current = { smartAgent: 0, baselineAgent: 0 };
      queueRef.current = { smartAgent: [], baselineAgent: [] };
      setOffers([]);

      const fresh = createInitialShiftState(capacity);
      const initialState: ShiftState = {
        ...fresh,
        status: "running",
        startedAt: Date.now(),
        elapsedSeconds: 0,
      };
      shiftRef.current = initialState;
      setShiftState(initialState);

      tickRef.current = setInterval(() => {
        commitShift((prev) => {
          if (prev.status !== "running") return prev;

          const newElapsed = Math.min(
            prev.elapsedSeconds + speedRef.current,
            SHIFT_DURATION_SECONDS
          );

          const { surgeZones, closures } = getEventsForElapsed(
            newElapsed,
            prevElapsedRef.current
          );
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

            // Count unfinished (still carried) orders per agent.
            const unfinishedSmart =
              queueRef.current.smartAgent.length;
            const unfinishedBase =
              queueRef.current.baselineAgent.length;

            return {
              ...prev,
              status: "ended",
              elapsedSeconds: SHIFT_DURATION_SECONDS,
              activeSurgeZones: newActiveSurgeZones,
              activeClosures: newActiveClosures,
              eventLog: newEventLog,
              smartAgent: {
                ...prev.smartAgent,
                unfinishedRuns:
                  prev.smartAgent.unfinishedRuns + unfinishedSmart,
              },
              baselineAgent: {
                ...prev.baselineAgent,
                unfinishedRuns:
                  prev.baselineAgent.unfinishedRuns + unfinishedBase,
              },
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

      firstSpawnRef.current = true;
      spawnLoop();
    },
    [commitShift, spawnLoop]
  );

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
    speed,
    setSpeed,
    simulatedNow,
    startShift,
    resetShift,
  };
}