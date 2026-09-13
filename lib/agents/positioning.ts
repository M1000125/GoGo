import type { Coords, Order, SurgeZone } from "@/lib/types";
import { haversineKm } from "@/lib/simulation/economics";

/**
 * Positioning steering — the "center of demand" term.
 *
 * The Smart Agent is drawn toward the geographic center of where future
 * orders are likely to appear. That center is a weighted centroid of:
 *   1. active surge-zone centers (weighted by their multiplier — a 2× zone
 *      pulls harder than a 1.5× zone),
 *   2. the pickup points of the current burst of offers,
 *   3. the courier's own position as an anchor.
 *
 * Orders whose pickup sits farther from that center are charged a small extra
 * "repositioning" cost (fuel + time), which lowers their effective net rate —
 * so far-from-demand orders get skipped and near-demand orders get taken.
 * With no surge and no pending offers the centroid is null, the cost is zero,
 * and behaviour is identical to today's dead-head accounting.
 */

/** Extra route-km charged per km the pickup sits from the demand centroid. */
const REPOSITION_KM_PER_KM = 0.35;

export interface RepositionCost {
  /** Extra kilometres charged to this order's route as net-margin drag. */
  extraKm: number;
  /** Weighted demand centroid, or null when no demand signal exists. */
  centroid: Coords | null;
}

export function demandCentroid(
  surgeZones: SurgeZone[],
  offerSources: Coords[],
  anchor: Coords
): Coords | null {
  let lat = anchor.lat;
  let lng = anchor.lng;
  let weight = 1;
  let signals = 0;

  for (const zone of surgeZones) {
    const w = Math.max(zone.multiplier, 1);
    lat += zone.center.lat * w;
    lng += zone.center.lng * w;
    weight += w;
    signals += 1;
  }
  for (const src of offerSources) {
    lat += src.lat;
    lng += src.lng;
    weight += 1;
    signals += 1;
  }

  if (signals === 0) return null;
  return { lat: lat / weight, lng: lng / weight };
}

export function repositionCost(
  order: Order,
  anchor: Coords,
  surgeZones: SurgeZone[],
  offerSources: Coords[]
): RepositionCost {
  const centroid = demandCentroid(surgeZones, offerSources, anchor);
  if (!centroid) return { extraKm: 0, centroid: null };
  const extraKm =
    Math.round(haversineKm(order.pickupCoords, centroid) * REPOSITION_KM_PER_KM * 10) / 10;
  return { extraKm, centroid };
}