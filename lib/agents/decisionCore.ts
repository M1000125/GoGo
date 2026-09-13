import type {
  Order,
  AgentDecision,
  AgentType,
  CarriedOrder,
  Coords,
  SurgeZone,
  RoadClosure,
} from "@/lib/types";
import {
  carriedSlots,
  MIN_PAYOUT_FLOOR,
  AVG_SPEED_KMH,
  fuelCostMxn,
  maintenanceCostMxn,
  haversineKm,
} from "@/lib/simulation/economics";
import { planEfficiency } from "@/lib/routing/routeSolver";
import { repositionCost } from "./positioning";
import { scoreAddon } from "./scoring";
import { perceivedCostFactor } from "@/lib/simulation/restaurantCentroid";
import {
  SMART_STANDALONE_GATE,
  SMART_SURGE_GATE,
  SMART_ADDON_FLOOR,
  SMART_ADDON_TOLERANCE,
  ENDGAME_BUFFER_MIN,
  SURGE_RESERVE_SLOTS,
  SURGE_LOOKAHEAD_MIN,
  SURGE_POSITION_FACTOR,
} from "./agentConfig";

/**
 * Shared decision context for both policies. `carried` is the agent's
 * synchronous carry ledger (authoritative over React state during a burst),
 * `position` its live coords, `elapsedSeconds` the shift clock.
 */
export interface DecisionInput {
  order: Order;
  carried: CarriedOrder[];
  position: Coords;
  capacity: number;
  elapsedSeconds: number;
  remainingSeconds: number;
  activeSurgeZones: SurgeZone[];
  activeClosures: RoadClosure[];
  recentDecisions: AgentDecision[];
  agentType: AgentType;
  /** Pickup coords of the currently pending offers — used to steer toward the
   *  center of potential order sources (see ./positioning). */
  offerSources?: Coords[];
}

interface SurgeContext {
  surgeActive: boolean;
  surgeSoon: boolean;
  nearSurge: boolean;
}

/** Which active/upcoming surge zones exist, and whether this order positions
 *  the courier near one (pickup or dropoff within radius × factor). */
function surgeContext(input: DecisionInput): SurgeContext {
  const { order, activeSurgeZones, elapsedSeconds } = input;
  const mustHave = (z: SurgeZone) =>
    z.activeAt <= elapsedSeconds + SURGE_LOOKAHEAD_MIN * 60;
  const relevant = activeSurgeZones.filter(mustHave);
  const surgeActive = activeSurgeZones.length > 0;
  const surgeSoon = !surgeActive && relevant.length > 0;

  const near = (coord: Coords) =>
    relevant.some((z) =>
      haversineKm(coord, z.center) <= z.radiusKm * SURGE_POSITION_FACTOR
    );

  const nearSurge =
    order.isSurge ||
    surgeActive ||
    near(order.pickupCoords) ||
    near(order.dropoffCoords);

  return { surgeActive, surgeSoon, nearSurge };
}

function decision(
  order: Order,
  decision: "accept" | "skip",
  reason: string,
  confidence: number
): AgentDecision {
  return {
    orderId: order.id,
    decision,
    reason,
    confidence,
    timestamp: Date.now(),
    pickupLabel: order.pickupLabel,
    dropoffLabel: order.dropoffLabel,
    payout: order.payout,
    estimatedMinutes: order.estimatedMinutes,
  };
}

// ── Greedy baseline ─────────────────────────────────────────────────────────
/** Myopic greedy: accept any standalone order above the payout floor; stack an
 *  add-on only when the route's net MXN/min clears the strict efficiency gate.
 *  Deliberately ignores endgame and surge — it is the "street-fighter" bar. */
export function baselineDecision(input: DecisionInput): AgentDecision {
  const { order, carried, position, capacity } = input;
  const isAddon = carried.length > 0;

  if (!isAddon) {
    const accept = order.payout >= MIN_PAYOUT_FLOOR;
    return decision(
      order,
      accept ? "accept" : "skip",
      accept
        ? `Payout ${order.payout} MXN ≥ ${MIN_PAYOUT_FLOOR} MXN floor — accepted.`
        : `Payout ${order.payout} MXN < ${MIN_PAYOUT_FLOOR} MXN floor — skipped.`,
      accept ? 0.6 : 0.7
    );
  }

  const usedSlots = carriedSlots(carried);
  const neededSlots = order.slots;
  if (usedSlots + neededSlots > capacity) {
    return decision(
      order,
      "skip",
      `No room — ${usedSlots + neededSlots} slots needed vs ${capacity} capacity (${usedSlots} in use).`,
      0.95
    );
  }

  const candidate: CarriedOrder[] = [...carried, { order, pickedUp: false }];
  const { current, candidate: cand, deltaMxnMin, reason, accept } = scoreAddon(
    carried,
    candidate,
    position,
    capacity
  );
  const candNet = cand.totalMinutes > 0 ? cand.netMxnMin : 0;

  return decision(
    order,
    accept ? "accept" : "skip",
    reason
      ? reason
      : accept
        ? `Add-on lifts route to ${candNet.toFixed(1)} MXN/min (+${deltaMxnMin.toFixed(1)}) — stacking.`
        : `Add-on only ${candNet.toFixed(1)} vs ${current.netMxnMin.toFixed(1)} MXN/min — not worth it.`,
    accept ? 0.5 : 0.65
  );
}

// ── Smart policy ────────────────────────────────────────────────────────────
/** Profitable courier: net-margin gate on whole-route economics (dead-head +
 *  fuel + prep), aggressive stacking (batch bonus + tips), surge positioning
 *  and slot reservation, and endgame discipline so every accepted order is
 *  actually delivered. */
export function smartDecision(input: DecisionInput): AgentDecision {
  const { order, carried, position, capacity, remainingSeconds } = input;
  const surge = surgeContext(input);
  const usedSlots = carriedSlots(carried);
  const isAddon = carried.length > 0;

  // 1. Slot budget — hard ceiling before any economics.
  if (usedSlots + order.slots > capacity) {
    return decision(
      order,
      "skip",
      `No room — ${usedSlots + order.slots} slots needed vs ${capacity} capacity (${usedSlots} in use).`,
      0.95
    );
  }

  const candidate: CarriedOrder[] = [...carried, { order, pickedUp: false }];
  const currentEff = isAddon ? planEfficiency(carried, position, capacity) : null;
  const candEff = planEfficiency(candidate, position, capacity);

  // 2. Endgame — decline anything the courier could not finish (unfinished
  //    runs earn $0: delivered orders alone count).
  const completionMinutes = isAddon
    ? candEff.totalMinutes
    : order.estimatedMinutes + order.prepMinutes;
  const endgameRemaining = remainingSeconds - completionMinutes * 60;
  if (endgameRemaining < ENDGAME_BUFFER_MIN * 60) {
    return decision(
      order,
      "skip",
      `Endgame — ${completionMinutes} min to finish > ${Math.round(remainingSeconds / 60)} min left (+${ENDGAME_BUFFER_MIN} buffer). Can't deliver in time.`,
      0.85
    );
  }

  // 3. Surge slot reservation — keep headroom for the incoming rush.
  const surgeHeadroom = capacity - usedSlots;
  if (
    (surge.surgeActive || surge.surgeSoon) &&
    isAddon &&
    surgeHeadroom - order.slots < SURGE_RESERVE_SLOTS &&
    !order.isSurge &&
    !surge.nearSurge
  ) {
    const leftAfter = surgeHeadroom - order.slots;
    return decision(
      order,
      "skip",
      `Reserving ${SURGE_RESERVE_SLOTS} slot(s) for the ${surge.surgeActive ? "active" : "incoming"} surge — this add-on would leave ${leftAfter}.`,
      0.75
    );
  }

  // 4. Net-margin gate.
  if (!isAddon) {
    const gate = surge.nearSurge || surge.surgeActive || surge.surgeSoon
      ? SMART_SURGE_GATE
      : SMART_STANDALONE_GATE;

    // Positioning drag: charge extra km (fuel + time) for pickups far from the
    // center of demand, so the courier is pulled toward order sources.
    const reposition = repositionCost(
      order,
      position,
      input.activeSurgeZones,
      input.offerSources ?? []
    );
    const extraMinutes = (reposition.extraKm / AVG_SPEED_KMH) * 60;
    const extraMxn =
      fuelCostMxn(reposition.extraKm, capacity) +
      maintenanceCostMxn(reposition.extraKm);
    const eff = candEff;
    const adjNet = eff.netMxn - extraMxn;
    const adjMin = eff.totalMinutes + extraMinutes;
    // Penalise orders whose dropoff pulls the courier away from the restaurant
    // cluster — identical to the perceivedCostFactor from da67f0ce (smartPolicy).
    const dropFactor = perceivedCostFactor(order.dropoffCoords);
    const posFactor = perceivedCostFactor(position);
    const adjRate = adjMin > 0
      ? (adjNet / adjMin) / dropFactor / Math.sqrt(posFactor)
      : 0;

    const accept = adjRate >= gate;
    const posNote =
      reposition.extraKm > 0
        ? ` · ${reposition.extraKm} km repositioning`
        : "";
    const clusterFarNote =
      perceivedCostFactor(order.dropoffCoords) > 1.15
        ? ` · cluster bias ×${perceivedCostFactor(order.dropoffCoords).toFixed(2)}`
        : "";
    return decision(
      order,
      accept ? "accept" : "skip",
      accept
        ? `Net ${adjRate.toFixed(1)} MXN/min after $${eff.fuelMxn.toFixed(0)} fuel + ${adjMin.toFixed(0)} min${surge.nearSurge ? ` · surge positioning (gate ${gate.toFixed(1)})` : ""}${posNote}${clusterFarNote} — profitable run.`
        : `Net ${adjRate.toFixed(1)} MXN/min below ${gate.toFixed(1)} gate${surge.nearSurge ? " (surge bias)" : ""}${posNote}${clusterFarNote} — not worth the ride.`,
      accept ? 0.72 : 0.8
    );
  }

  const deltaMxnMin = candEff.netMxnMin - (currentEff?.netMxnMin ?? 0);
  const relaxed = surge.nearSurge || surge.surgeActive;
  const floor = relaxed ? SMART_ADDON_FLOOR - 0.25 : SMART_ADDON_FLOOR;
  const accept =
    candEff.netMxnMin >= currentEff!.netMxnMin + SMART_ADDON_TOLERANCE &&
    candEff.netMxnMin >= floor;

  return decision(
    order,
    accept ? "accept" : "skip",
    accept
      ? `Stack ${order.slots}-slot add-on: route ${candEff.netMxnMin.toFixed(1)} vs ${currentEff!.netMxnMin.toFixed(1)} MXN/min (${deltaMxnMin >= 0 ? "+" : ""}${deltaMxnMin.toFixed(1)}) + $${candEff.batchBonusMxn} batch bonus${relaxed ? " · surge bias" : ""}.`
      : `Add-on dilutes route to ${candEff.netMxnMin.toFixed(1)} vs ${currentEff!.netMxnMin.toFixed(1)} MXN/min — skip.`,
    accept ? 0.68 : 0.78
  );
}