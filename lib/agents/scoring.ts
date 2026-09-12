import type { Coords, CarriedOrder } from "@/lib/types";
import { planEfficiency, type Efficiency } from "@/lib/routing/routeSolver";
import { EFFICIENCY_GATE_MXN_MIN } from "@/lib/simulation/economics";

export interface AddonScore {
  current: Efficiency;
  candidate: Efficiency;
  deltaMxnMin: number;
  accept: boolean;
}

/**
 * Compare route-level net efficiency (MXN/min) of the current carried load
 * against the load plus a candidate add-on order.
 */
export function scoreAddon(
  carried: CarriedOrder[],
  candidate: CarriedOrder[],
  position: Coords,
  capacity: number
): AddonScore {
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