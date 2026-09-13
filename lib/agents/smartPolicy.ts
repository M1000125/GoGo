import type { AgentDecision, AgentState, CarriedOrder, Order } from "@/lib/types";
import { carriedSlots, haversineKm } from "@/lib/simulation/economics";
import { perceivedCostFactor } from "@/lib/simulation/restaurantCentroid";
import { scoreAddon } from "./scoring";

/** Idle MXN/min floor — modest so cheap short hops still compete with waiting. */
export const SMART_IDLE_EFFICIENCY = 3.2;
export const SMART_SURGE_EFFICIENCY = 2.4;
export const SMART_ENDING_EFFICIENCY = 1.8;
export const ENDING_WINDOW_SECONDS = 45 * 60;

export interface SmartKnobs {
  idleEfficiency: number;
  surgeEfficiency: number;
  endingEfficiency: number;
}

export const DEFAULT_SMART_KNOBS: SmartKnobs = {
  idleEfficiency: SMART_IDLE_EFFICIENCY,
  surgeEfficiency: SMART_SURGE_EFFICIENCY,
  endingEfficiency: SMART_ENDING_EFFICIENCY,
};

/** Routed (or haversine-fallback) minutes used instead of a flat 25 km/h clock. */
export interface OfferTimes {
  deadheadMinutes: number;
  tripMinutes: number;
}

export function fallbackOfferTimes(order: Order, agent: AgentState): OfferTimes {
  const deadKm = haversineKm(agent.position, order.pickupCoords);
  return {
    deadheadMinutes: (deadKm / 25) * 60,
    tripMinutes: Math.max(1, order.estimatedMinutes),
  };
}

function totalMinutes(order: Order, times: OfferTimes): number {
  return Math.max(1, times.deadheadMinutes + times.tripMinutes + order.prepMinutes);
}

function decision(
  order: Order,
  accept: boolean,
  reason: string,
  confidence: number
): AgentDecision {
  return {
    orderId: order.id,
    decision: accept ? "accept" : "skip",
    reason,
    confidence,
    timestamp: Date.now(),
    pickupLabel: order.pickupLabel,
    dropoffLabel: order.dropoffLabel,
    payout: order.payout,
    estimatedMinutes: order.estimatedMinutes,
  };
}

export interface SmartEval {
  decision: AgentDecision;
  score: number;
  feasible: boolean;
}

/**
 * Score a single offer given the agent's current carried load (from the
 * synchronous queue, not lagged React state).
 */
export function evaluateSmartOffer(
  order: Order,
  agent: AgentState,
  remainingSeconds: number,
  knobs: SmartKnobs = DEFAULT_SMART_KNOBS,
  times: OfferTimes = fallbackOfferTimes(order, agent)
): SmartEval {
  const usedSlots = carriedSlots(agent.carriedOrders);
  if (usedSlots + order.slots > agent.capacity) {
    return {
      score: -Infinity,
      feasible: false,
      decision: decision(
        order,
        false,
        `No room — ${usedSlots + order.slots} slots needed vs ${agent.capacity} capacity (${usedSlots} in use).`,
        0.95
      ),
    };
  }

  const mins = totalMinutes(order, times);
  if (remainingSeconds < mins * 60) {
    return {
      score: -Infinity,
      feasible: false,
      decision: decision(
        order,
        false,
        `Shift ending — ${Math.round(mins)} min routed trip, ${Math.round(remainingSeconds / 60)} min left.`,
        0.8
      ),
    };
  }

  const endingSoon = remainingSeconds < ENDING_WINDOW_SECONDS;
  const isAddon = agent.carriedOrders.length > 0;

  if (isAddon) {
    const candidate: CarriedOrder[] = [
      ...agent.carriedOrders,
      { order, pickedUp: false },
    ];
    const scored = scoreAddon(
      agent.carriedOrders,
      candidate,
      agent.position,
      agent.capacity
    );
    // Prefer routed extra minutes so stacking is not blind to traffic.
    const routedCandidateMins = Math.max(scored.candidate.totalMinutes, mins);
    const dropFactor = perceivedCostFactor(order.dropoffCoords);
    const stackedScore =
      (routedCandidateMins > 0
        ? scored.candidate.netMxn / routedCandidateMins
        : scored.candidate.netMxnMin) / dropFactor;
    const floor = endingSoon ? 0.3 : undefined;
    const accept =
      scored.accept ||
      (floor !== undefined && scored.deltaMxnMin >= floor);
    const farNote =
      dropFactor > 1.15 ? ` · perceived ×${dropFactor.toFixed(2)} vs restaurant cluster` : "";
    const reason =
      scored.reason ??
      (accept
        ? `Stack +${scored.deltaMxnMin.toFixed(1)} MXN/min → ${scored.candidate.netMxnMin.toFixed(1)} net${farNote} — accepted.`
        : `Add-on ${scored.deltaMxnMin.toFixed(1)} MXN/min vs current ${scored.current.netMxnMin.toFixed(1)}${farNote} — skipped.`);
    return {
      score: stackedScore,
      feasible: true,
      decision: decision(order, accept, reason, 0.75),
    };
  }

  const efficiency = order.payout / mins;
  const dropFactor = perceivedCostFactor(order.dropoffCoords);
  const posFactor = perceivedCostFactor(agent.position);
  const perceivedEfficiency = efficiency / dropFactor / Math.sqrt(posFactor);
  const minEff = order.isSurge
    ? knobs.surgeEfficiency
    : endingSoon
      ? knobs.endingEfficiency
      : knobs.idleEfficiency;
  const accept = perceivedEfficiency > minEff;
  const farNote =
    dropFactor > 1.15 ? ` · cluster bias ×${dropFactor.toFixed(2)}` : "";
  return {
    score: perceivedEfficiency,
    feasible: true,
    decision: decision(
      order,
      accept,
      accept
        ? `$${order.payout} MXN · ${efficiency.toFixed(1)} MXN/min routed${farNote} — accepted.`
        : `$${order.payout} MXN · ${efficiency.toFixed(1)} MXN/min routed${farNote} below ${minEff} perceived floor — waiting.`,
      0.75
    ),
  };
}

function timesFor(
  order: Order,
  agent: AgentState,
  timesById?: Map<string, OfferTimes>
): OfferTimes {
  return timesById?.get(order.id) ?? fallbackOfferTimes(order, agent);
}

/**
 * Rank a simultaneous burst. Empty courier always takes the best feasible
 * offer (stops idle stalling). Further stacks still need the efficiency gate.
 */
export function decideSmartBurst(
  orders: Order[],
  agent: AgentState,
  remainingSeconds: number,
  knobs: SmartKnobs = DEFAULT_SMART_KNOBS,
  timesById?: Map<string, OfferTimes>
): AgentDecision[] {
  const evalOne = (order: Order, carried: CarriedOrder[]) =>
    evaluateSmartOffer(
      order,
      { ...agent, carriedOrders: carried },
      remainingSeconds,
      knobs,
      timesFor(order, { ...agent, carriedOrders: carried }, timesById)
    );

  const empty = agent.carriedOrders.length === 0;
  const ranked = orders
    .map((order) => ({ order, ...evalOne(order, agent.carriedOrders) }))
    .sort((a, b) => b.score - a.score);

  let simulated: CarriedOrder[] = [...agent.carriedOrders];
  const acceptedIds = new Set<string>();
  const forced = new Map<string, AgentDecision>();

  if (empty) {
    const best = ranked.find((r) => r.feasible);
    if (best) {
      simulated = [{ order: best.order, pickedUp: false }];
      acceptedIds.add(best.order.id);
      if (best.decision.decision !== "accept") {
        forced.set(
          best.order.id,
          decision(
            best.order,
            true,
            `Idle — taking best feasible in burst ($${best.order.payout} MXN, ${best.score.toFixed(1)} MXN/min routed).`,
            0.72
          )
        );
      }
    }
  }

  for (const row of ranked) {
    if (acceptedIds.has(row.order.id)) continue;
    const again = evalOne(row.order, simulated);
    if (again.decision.decision !== "accept") continue;
    simulated = [...simulated, { order: row.order, pickedUp: false }];
    acceptedIds.add(row.order.id);
  }

  return orders.map((order) => {
    if (forced.has(order.id)) return forced.get(order.id)!;
    const row = ranked.find((r) => r.order.id === order.id)!;
    if (acceptedIds.has(order.id)) {
      return row.decision.decision === "accept"
        ? row.decision
        : decision(order, true, row.decision.reason, row.decision.confidence);
    }
    if (row.decision.decision === "skip") return row.decision;
    return decision(
      order,
      false,
      `Better offers in this burst took the remaining slots.`,
      0.7
    );
  });
}
