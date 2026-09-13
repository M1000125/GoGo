import type { Order, AgentState, AgentDecision } from "@/lib/types";
import { carriedSlots } from "@/lib/simulation/economics";

/**
 * Greedy baseline: pure first-come-first-served.
 * Accepts every order that fits the capacity slot budget — no ROI evaluation,
 * no payout threshold, no efficiency gate. This mirrors a courier who always
 * takes the first ping they see, relying on volume over selectivity.
 */
export function baselineDecide(
  order: Order,
  agent: AgentState
): AgentDecision {
  const usedSlots = carriedSlots(agent.carriedOrders);
  const accept = usedSlots + order.slots <= agent.capacity;

  return {
    orderId: order.id,
    decision: accept ? "accept" : "skip",
    reason: accept
      ? `First ping accepted — ${usedSlots + order.slots}/${agent.capacity} slots used.`
      : `Full — ${usedSlots + order.slots} slots needed vs ${agent.capacity} capacity (${usedSlots} in use).`,
    confidence: 1.0,
    timestamp: Date.now(),
    pickupLabel: order.pickupLabel,
    dropoffLabel: order.dropoffLabel,
    payout: order.payout,
    estimatedMinutes: order.estimatedMinutes,
  };
}
