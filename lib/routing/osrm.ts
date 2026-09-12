import type { Coords } from "@/lib/types";

const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";

interface OSRMRoute {
  distance: number; // meters
  duration: number; // seconds
  geometry: { coordinates: [number, number][] };
}

interface OSRMResponse {
  routes: OSRMRoute[];
  code: string;
}

// Simple in-memory cache keyed by "lat1,lng1->lat2,lng2"
const routeCache = new Map<string, { coords: Coords[]; km: number; minutes: number }>();

function cacheKey(from: Coords, to: Coords) {
  return `${from.lat.toFixed(4)},${from.lng.toFixed(4)}->${to.lat.toFixed(4)},${to.lng.toFixed(4)}`;
}

export async function fetchRoute(
  from: Coords,
  to: Coords
): Promise<{ coords: Coords[]; km: number; minutes: number }> {
  const key = cacheKey(from, to);
  const cached = routeCache.get(key);
  if (cached) return cached;

  const url = `${OSRM_BASE}/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`OSRM HTTP ${res.status}`);

    const data: OSRMResponse = await res.json();
    if (data.code !== "Ok" || !data.routes.length) throw new Error("No route found");

    const route = data.routes[0];
    const coords: Coords[] = route.geometry.coordinates.map(([lng, lat]) => ({
      lat,
      lng,
    }));
    const km = Math.round((route.distance / 1000) * 10) / 10;
    const minutes = Math.round(route.duration / 60);

    const result = { coords, km, minutes };
    routeCache.set(key, result);
    return result;
  } catch {
    // Fallback: straight line
    return {
      coords: [from, to],
      km: Math.round(haversineKm(from, to) * 1.4 * 10) / 10,
      minutes: Math.round((haversineKm(from, to) * 1.4) / 25 * 60),
    };
  }
}

function haversineKm(a: Coords, b: Coords): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const c =
    sinLat * sinLat +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      sinLng * sinLng;
  return R * 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
}
