import type { Coords } from "@/lib/types";
import { haversineKm } from "@/lib/simulation/economics";
import mockOrdersData from "@/data/mock_orders.json";

interface MockRestaurant {
  id: string;
  latitude: number;
  longitude: number;
}

interface MockOrderRow {
  restaurant: MockRestaurant;
}

/** Extra perceived cost per km from the restaurant cluster. Ranking only. */
export const PERCEPTION_KM_GAIN = 0.25;
export const PERCEPTION_FACTOR_MAX = 2;

function uniqueRestaurantCoords(): Coords[] {
  const seen = new Set<string>();
  const coords: Coords[] = [];
  for (const row of mockOrdersData as MockOrderRow[]) {
    const r = row.restaurant;
    if (!r || seen.has(r.id)) continue;
    seen.add(r.id);
    coords.push({ lat: r.latitude, lng: r.longitude });
  }
  return coords;
}

function meanCoords(points: Coords[]): Coords {
  if (points.length === 0) return { lat: 25.6515, lng: -100.2875 };
  const lat = points.reduce((s, p) => s + p.lat, 0) / points.length;
  const lng = points.reduce((s, p) => s + p.lng, 0) / points.length;
  return { lat, lng };
}

const RESTAURANT_COORDS = uniqueRestaurantCoords();

/** Arithmetic mean of unique mock-pool restaurants (Paseo Tec cluster). */
export const RESTAURANT_MASS_CENTER: Coords = meanCoords(RESTAURANT_COORDS);

export function distanceFromRestaurantMassKm(coords: Coords): number {
  return haversineKm(coords, RESTAURANT_MASS_CENTER);
}

/**
 * Decision-only multiplier. Never apply to payout, fuel, or net earnings.
 * 1 at the cluster; up to PERCEPTION_FACTOR_MAX at the edge.
 */
export function perceivedCostFactor(coords: Coords): number {
  const km = distanceFromRestaurantMassKm(coords);
  const raw = 1 + PERCEPTION_KM_GAIN * km;
  return Math.min(PERCEPTION_FACTOR_MAX, Math.max(1, raw));
}
