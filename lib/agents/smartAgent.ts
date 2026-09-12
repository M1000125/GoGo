import type {
  Order,
  AgentState,
  AgentDecision,
  SurgeZone,
  RoadClosure,
} from "@/lib/types";
import { vehicleLabelForCapacity } from "@/lib/simulation/economics";

export interface SmartDecideInput {
  order: Order;
  agentState: AgentState;
  remainingSeconds: number;
  activeSurgeZones: SurgeZone[];
  activeClosures: RoadClosure[];
  recentDecisions: AgentDecision[];
  capacity: number;
  isAddon: boolean; // true = offered to be folded into the current route
  carriedSlots: number; // capacity slots currently used by the carried load
  currentEfficiencyMxnMin: number; // current route's net MXN/min
  candidateEfficiencyMxnMin: number; // route + this order
  fuelCostMxn: number; // estimated fuel for candidate route
  batchBonusMxn: number; // bonus included if the run will hold 2+ orders
}

function describeLoad(agent: AgentState): string {
  if (agent.carriedOrders.length === 0) return "None — courier is empty";
  return agent.carriedOrders
    .map((c) => {
      const status = c.pickedUp ? "picked up" : "to pick up";
      return `• ${c.order.dropoffLabel} (payout $${c.order.payout}, ${status})`;
    })
    .join("\n");
}

export function buildGeminiPrompt(input: SmartDecideInput): string {
  const {
    order,
    agentState,
    remainingSeconds,
    activeSurgeZones,
    activeClosures,
    recentDecisions,
    capacity,
    isAddon,
    carriedSlots,
    currentEfficiencyMxnMin,
    candidateEfficiencyMxnMin,
    fuelCostMxn,
    batchBonusMxn,
  } = input;

  const remainingMin = Math.round(remainingSeconds / 60);
  const surgeInfo =
    activeSurgeZones.length > 0
      ? activeSurgeZones.map((z) => `${z.label} (×${z.multiplier})`).join(", ")
      : "None";
  const closureInfo =
    activeClosures.length > 0
      ? activeClosures.map((c) => c.label).join(", ")
      : "None";
  const recentSummary =
    recentDecisions.length > 0
      ? recentDecisions
          .slice(-3)
          .map((d) => `${d.decision.toUpperCase()}: ${d.reason}`)
          .join(" | ")
      : "No recent decisions";
  const vehicle = vehicleLabelForCapacity(capacity);

  const loadSection = isAddon
    ? `An add-on offer: the courier carries ${carriedSlots}/${capacity} capacity slots and the dispatcher asks if it should STACK this ${order.slots}-slot delivery into the current route.
CURRENT ROUTE:
${describeLoad(agentState)}
- Current route efficiency: $${currentEfficiencyMxnMin.toFixed(1)} MXN/min (net after fuel & maintenance)
- Candidate route efficiency with this add-on: $${candidateEfficiencyMxnMin.toFixed(1)} MXN/min
- Estimated fuel cost for candidate route: $${fuelCostMxn.toFixed(1)} MXN
- Batch bonus if stacked: $${batchBonusMxn} MXN`
    : `A fresh offer: the courier is empty (0/${capacity} slots) and can start a new run.`;

  return `You are an AI agent optimizing NET earnings (after fuel & maintenance) for a delivery courier in Monterrey, Mexico.
Vehicle: ${vehicle} — capacity ${capacity} capacity slot(s); each order consumes 1-3 slots and orders can be stacked into one multi-stop route.
NEVER accept an order if the stacked carried load would exceed ${capacity} slots.
Fuel economy is lower for higher-capacity vehicles, so stacking only pays when it lifts net MXN/min.

CURRENT SHIFT STATE:
- Remaining shift time: ${remainingMin} minutes
- Gross earnings: $${agentState.earnings} MXN (net $${agentState.netEarnings} MXN)
- Orders completed: ${agentState.ordersCompleted}
- Expended fuel: ${agentState.expenses.fuelLiters.toFixed(1)} L ($${agentState.expenses.fuelMxn.toFixed(1)} MXN)
- Total km driven: ${agentState.kmDriven} km

ACTIVE CONDITIONS:
- Surge zones: ${surgeInfo}
- Road closures: ${closureInfo}

STATUS:
${loadSection}

NEW ORDER OFFER (expires in 15 seconds):
- Pickup: ${order.pickupLabel} (prep time ~${order.prepMinutes} min)
- Dropoff: ${order.dropoffLabel}
- Orders: ${order.orderSizeMxn} MXN food / ${order.slots} slot(s)
- Payout: $${order.payout} MXN${order.isSurge ? " (SURGE ⚡)" : ""}
- Tip potential: $${order.tip} MXN
- Estimated distance: ${order.estimatedKm} km
- Estimated delivery time: ${order.estimatedMinutes} minutes

RECENT DECISIONS:
${recentSummary}

TASK: Decide whether to ACCEPT or SKIP this order. Consider:
1. Net efficiency in MXN/min — does this order (or the stacked route) clear a healthy net rate?
2. Remaining shift time — is there enough time to complete every stop?
3. Fuel cost — is the add-on's dead-head worth it for this vehicle's economy?
4. Surge zone positioning — does accepting bring us closer to or away from surge zones?
5. Road closures — will the route be affected?
6. Opportunity cost — could a better order appear if we skip?
7. Add-on gate — for add-ons, only accept if the candidate route NET efficiency is clearly better than the current route.

YOU MUST respond with ONLY a raw JSON object. No explanation, no markdown, no code fences. Output nothing except the JSON object itself:
{"decision":"accept","reason":"<one sentence, max 20 words>","confidence":0.85}`;
}
