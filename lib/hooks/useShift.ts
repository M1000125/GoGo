"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  ShiftState,
  Order,
  AgentDecision,
  AgentState,
  SurgeZone,
  RoadClosure,
} from "@/lib/types";
import { createInitialShiftState, getEventsForElapsed, SHIFT_DURATION_SECONDS } from "@/lib/simulation/shiftEngine";
import { baselineDecide } from "@/lib/agents/baselineAgent";
import { SURGE_ZONES, ROAD_CLOSURES } from "@/lib/simulation/surgeZones";

/** One order every ~10 simulated minutes (600 sim-seconds). */
const ORDER_INTERVAL_SIM_S = 10 * 60;

export function useShift() {
  const [shift, setShift] = useState<ShiftState>(() => createInitialShiftState());
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderExpiry, setOrderExpiry] = useState<number | null>(null);
  const [isSmartDeciding, setIsSmartDeciding] = useState(false);

  // Speed: simulated-seconds that advance per real second
  const [speed, _setSpeed] = useState(60); // default 60× → 4h shift in 4 real minutes
  const speedRef = useRef(60);
  const setSpeed = useCallback((n: number) => {
    speedRef.current = n;
    _setSpeed(n);
  }, []);

  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const orderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevElapsedRef = useRef(0);

  // ── Derived simulated time ─────────────────────────────────────────────
  // Unix ms: what "now" is in the simulated world
  const simulatedNow = shift.simShiftStart + shift.elapsedSeconds * 1000;

  // ── Fetch helpers ──────────────────────────────────────────────────────
  const fetchOrder = useCallback(async (activeSurgeZones: SurgeZone[]) => {
    const res = await fetch("/api/simulation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activeSurgeZones }),
    });
    return res.json() as Promise<Order>;
  }, []);

  const fetchRoute = useCallback(
    async (
      from: { lat: number; lng: number },
      to: { lat: number; lng: number },
      departureTime?: number // unix seconds for the simulated time
    ) => {
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

  // ── Apply a decision: fetch routes, animate courier, settle earnings ───
  const applyDecision = useCallback(
    async (
      agentKey: "smartAgent" | "baselineAgent",
      decision: AgentDecision,
      order: Order,
      currentShift: ShiftState
    ) => {
      if (decision.decision !== "accept") return;

      // Simulated departure timestamp (unix seconds) for traffic-aware routing
      const departureTime = Math.floor(
        (currentShift.simShiftStart + currentShift.elapsedSeconds * 1000) / 1000
      );

      const agent = currentShift[agentKey];
      const [routeToPickup, routeToDropoff] = await Promise.all([
        fetchRoute(agent.position, order.pickupCoords, departureTime),
        fetchRoute(order.pickupCoords, order.dropoffCoords, departureTime),
      ]);

      const totalKm = routeToPickup.km + routeToDropoff.km;
      const pickupIndex = routeToPickup.coords.length;
      const fullRoute = [...routeToPickup.coords, ...routeToDropoff.coords];

      // Real-time animation duration: scale inversely with speed, cap at 20s
      const travelMs = Math.min(
        (order.estimatedMinutes * 60_000) / speedRef.current,
        20_000
      );

      setShift((prev) => ({
        ...prev,
        [agentKey]: {
          ...prev[agentKey],
          earnings: prev[agentKey].earnings + order.payout,
          ordersCompleted: prev[agentKey].ordersCompleted + 1,
          kmDriven: Math.round((prev[agentKey].kmDriven + totalKm) * 10) / 10,
          currentRoute: fullRoute,
          currentRouteMeta: { startedAt: Date.now(), durationMs: travelMs, pickupIndex },
          currentOrder: order,
          isMoving: true,
          lastDecision: decision,
          decisionHistory: [...prev[agentKey].decisionHistory, decision],
        },
      }));

      // Snap position to dropoff when delivery animation completes
      setTimeout(() => {
        setShift((prev) => ({
          ...prev,
          [agentKey]: {
            ...prev[agentKey],
            currentOrder: null,
            currentRoute: [],
            currentRouteMeta: null,
            isMoving: false,
            position: order.dropoffCoords,
          },
        }));
      }, travelMs);
    },
    [fetchRoute]
  );

  // ── Present a new order to both agents ────────────────────────────────
  const presentOrder = useCallback(
    async (order: Order, currentShift: ShiftState) => {
      setCurrentOrder(order);
      setOrderExpiry(order.expiresAt);

      const remainingSeconds = SHIFT_DURATION_SECONDS - currentShift.elapsedSeconds;

      // Smart agent — async
      setIsSmartDeciding(true);
      smartDecide(
        order,
        currentShift.smartAgent,
        remainingSeconds,
        currentShift.activeSurgeZones,
        currentShift.activeClosures,
        currentShift.smartAgent.decisionHistory
      ).then((rawDecision) => {
        setIsSmartDeciding(false);
        const decision = enrichDecision(rawDecision, order);
        setShift((prev) => {
          applyDecision("smartAgent", decision, order, prev);
          return {
            ...prev,
            smartAgent: {
              ...prev.smartAgent,
              lastDecision: decision,
              decisionHistory: [...prev.smartAgent.decisionHistory, decision],
            },
            eventLog: [
              {
                type: "order",
                label: `Smart: ${decision.decision.toUpperCase()} — ${order.pickupLabel} → ${order.dropoffLabel}`,
                timestamp: Date.now(),
                agentType: "smart",
              },
              ...prev.eventLog.slice(0, 29),
            ],
          };
        });
      });

      // Baseline agent — sync
      const baseDecision = enrichDecision(baselineDecide(order, currentShift.baselineAgent), order);
      setShift((prev) => {
        applyDecision("baselineAgent", baseDecision, order, prev);
        return {
          ...prev,
          baselineAgent: {
            ...prev.baselineAgent,
            lastDecision: baseDecision,
            decisionHistory: [...prev.baselineAgent.decisionHistory, baseDecision],
          },
          eventLog: [
            {
              type: "order",
              label: `Baseline: ${baseDecision.decision.toUpperCase()} — ${order.pickupLabel} → ${order.dropoffLabel}`,
              timestamp: Date.now(),
              agentType: "baseline",
            },
            ...prev.eventLog.slice(0, 29),
          ],
        };
      });

      // Clear order ping
      setTimeout(() => setCurrentOrder(null), 15_000);
    },
    [smartDecide, applyDecision, enrichDecision]
  );

  // ── Start shift ────────────────────────────────────────────────────────
  const startShift = useCallback(() => {
    prevElapsedRef.current = 0;

    setShift((prev) => ({
      ...prev,
      status: "running",
      startedAt: Date.now(),
      elapsedSeconds: 0,
    }));

    // Counter-based clock: advance simulated time by `speed` each real second
    tickRef.current = setInterval(() => {
      setShift((prev) => {
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
          clearTimeout(orderTimerRef.current!);
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
    }, 1000);

    // Order generator: one order every ORDER_INTERVAL_SIM_S simulated seconds
    // Real delay = (sim interval / speed) × 1000 ms
    let firstOrder = true;
    const scheduleNextOrder = () => {
      const simJitterS = Math.random() * 5 * 60; // ±0–5 simulated minutes jitter
      const realDelayMs = firstOrder
        ? 2_000
        : ((ORDER_INTERVAL_SIM_S + simJitterS) / speedRef.current) * 1000;
      firstOrder = false;

      orderTimerRef.current = setTimeout(() => {
        setShift((prev) => {
          if (prev.status !== "running") return prev;
          fetchOrder(prev.activeSurgeZones).then((order) => {
            setShift((s) => {
              if (s.status === "running") presentOrder(order, s);
              return s;
            });
          });
          return prev;
        });
        scheduleNextOrder();
      }, realDelayMs);
    };
    scheduleNextOrder();
  }, [fetchOrder, presentOrder]);

  // ── Reset ──────────────────────────────────────────────────────────────
  const resetShift = useCallback(() => {
    clearInterval(tickRef.current!);
    clearTimeout(orderTimerRef.current!);
    prevElapsedRef.current = 0;
    setCurrentOrder(null);
    setOrderExpiry(null);
    setShift(createInitialShiftState());
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(tickRef.current!);
      clearTimeout(orderTimerRef.current!);
    };
  }, []);

  return {
    shift,
    currentOrder,
    orderExpiry,
    isSmartDeciding,
    speed,
    setSpeed,
    simulatedNow,
    startShift,
    resetShift,
  };
}
