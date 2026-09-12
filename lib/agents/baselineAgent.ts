import type { Order, AgentState, AgentDecision, CarriedOrder } from "@/lib/types";
import { scoreAddon } from "./scoring";

const MINIMUM_PAYOUT = 30; // MXN

/**
 * Greedy baseline: accept any single order above the payout floor; take an
 * add-on only when it lifts the route's net MXN/min past the efficiency gate.
 */
export function baselineDecide(
  order: Order,
  agent: AgentState
): AgentDecision {
  const isAddon = agent.carriedOrders.length > 0;

  if (!isAddon) {
    const accept = order.payout >= MINIMUM_PAYOUT;
    return {
      orderId: order.id,
      decision: accept ? "accept" : "skip",
      reason: accept
        ? `Payout ${order.payout} MXN ≥ ${MINIMUM_PAYOUT} MXN threshold — accepted.`
        : `Payout ${order.payout} MXN < ${MINIMUM_PAYOUT} MXN threshold — skipped.`,
      confidence: 0.6,
      timestamp: Date.now(),
      pickupLabel: order.pickupLabel,
      dropoffLabel: order.dropoffLabel,
      payout: order.payout,
      estimatedMinutes: order.estimatedMinutes,
    };
  }

  const candidate: CarriedOrder[] = [
    ...agent.carriedOrders,
    { order, pickedUp: false },
  ];
  const { current, candidate: cand, deltaMxnMin, accept } = scoreAddon(
    agent.carriedOrders,
    candidate,
    agent.position,
    agent.capacity
  );
  const candNet = cand.totalMinutes > 0 ? cand.netMxnMin : 0;

  return {
    orderId: order.id,
    decision: accept ? "accept" : "skip",
    reason: accept
      ? `Add-on lifts route to ${candNet.toFixed(1)} MXN/min (+${deltaMxnMin.toFixed(1)}) — stacking.`
      : `Add-on only ${candNet.toFixed(1)} vs ${current.netMxnMin.toFixed(1)} MXN/min — not worth it.`,
    confidence: 0.5,
    timestamp: Date.now(),
    pickupLabel: order.pickupLabel,
    dropoffLabel: order.dropoffLabel,
    payout: order.payout,
    estimatedMinutes: order.estimatedMinutes,
  };
}