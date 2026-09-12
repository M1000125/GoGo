import type { Coords, CarriedOrder } from "@/lib/types";
import { planEfficiency, type Efficiency } from "@/lib/routing/routeSolver";
import { EFFICIENCY_GATE_MXN_MIN, carriedSlots } from "@/lib/simulation/economics";

export interface AddonScore {
  current: Efficiency;
  candidate: Efficiency;
  deltaMxnMin: number;
  /** Reason phrase — includes the capacity refusal when over-budget. */
  reason?: string;
  accept: boolean;
}

/**
 * Compare route-level net efficiency (MXN/min) of the current carried load
 * against the load plus a candidate add-on order.
 *
 * Capacity is a SLOT budget: if the candidate's total slots exceed vehicle
 * capacity, the add-on is declined outright (before any economics compare).
 */
export function scoreAddon(
  carried: CarriedOrder[],
  candidate: CarriedOrder[],
  position: Coords,
  capacity: number
): AddonScore {
  const candidateSlots = carriedSlots(candidate);
  const currentSlots = carriedSlots(carried);

  if (candidateSlots > capacity) {
    const current = planEfficiency(carried, position, capacity);
    return {
      current,
      candidate: current, // not meaningful — used only for display parity
      deltaMxnMin: 0,
      reason: `No room — ${candidateSlots} slots needed vs ${capacity} capacity (${currentSlots} in use).`,
      accept: false,
    };
  }

  const current = planEfficiency(carried, position, capacity);
  const candidateEff = planEfficiency(candidate, position, capacity);
  const deltaMxnMin = round1(candidateEff.netMxnMin - current.netMxnMin);
  return {
    current,
    candidate: candidateEff,
    deltaMxnMin,
    accept: deltaMxnMin >= EFFICIENCY_GATE_MXN_MIN,
  };
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}