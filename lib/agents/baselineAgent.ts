import type { Order, AgentState, AgentDecision, CarriedOrder } from "@/lib/types";
import { carriedSlots } from "@/lib/simulation/economics";
import { scoreAddon } from "./scoring";

const MINIMUM_PAYOUT = 30; // MXN

/**
 * Greedy baseline: accept any single order above the payout floor; for add-ons
 * decline when capacity is exhausted, otherwise stack only when the route's
 * net MXN/min clears the efficiency gate.
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

  // Capacity is a SLOT budget — hard ceiling before any stacking economics.
  const usedSlots = carriedSlots(agent.carriedOrders);
  const neededSlots = order.slots;
  if (usedSlots + neededSlots > agent.capacity) {
    return {
      orderId: order.id,
      decision: "skip",
      reason: `No room — ${usedSlots + neededSlots} slots needed vs ${agent.capacity} capacity (${usedSlots} in use).`,
      confidence: 0.95,
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
  const { current, candidate: cand, deltaMxnMin, reason, accept } = scoreAddon(
    agent.carriedOrders,
    candidate,
    agent.position,
    agent.capacity
  );
  const candNet = cand.totalMinutes > 0 ? cand.netMxnMin : 0;

  return {
    orderId: order.id,
    decision: accept ? "accept" : "skip",
    reason: reason
      ? reason
      : accept
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