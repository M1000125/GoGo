import type { Coords } from "@/lib/types";

const DIRECTIONS_BASE = "https://maps.googleapis.com/maps/api/directions/json";

interface DirectionsLeg {
  distance: { value: number };
  duration: { value: number };
  duration_in_traffic?: { value: number };
}

interface DirectionsRoute {
  legs: DirectionsLeg[];
  overview_polyline: { points: string };
}

interface DirectionsResponse {
  status: string;
  routes: DirectionsRoute[];
}

// In-memory cache keyed by coords + departure hour so traffic varies by time of day
const routeCache = new Map<
  string,
  { coords: Coords[]; km: number; minutes: number }
>();

function cacheKey(from: Coords, to: Coords, departureHour: number) {
  return `${from.lat.toFixed(4)},${from.lng.toFixed(4)}->${to.lat.toFixed(4)},${to.lng.toFixed(4)}@h${departureHour}`;
}

/**
 * Decode a Google Maps encoded polyline into {lat, lng} pairs.
 */
function decodePolyline(encoded: string): Coords[] {
  const coords: Coords[] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let result = 0;
    let shift = 0;
    let byte: number;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    lat += result & 1 ? ~(result >> 1) : result >> 1;
    result = 0;
    shift = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    lng += result & 1 ? ~(result >> 1) : result >> 1;
    coords.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }

  return coords;
}

export async function fetchRouteWithTraffic(
  from: Coords,
  to: Coords,
  apiKey: string,
  /** Unix seconds for the simulated departure time. Falls back to "now". */
  departureTime?: number
): Promise<{ coords: Coords[]; km: number; minutes: number }> {
  // Round to the hour so we don't create a new cache entry every simulated minute
  const deptHour = departureTime
    ? Math.floor(departureTime / 3600)
    : Math.floor(Date.now() / 3_600_000);

  const key = cacheKey(from, to, deptHour);
  const cached = routeCache.get(key);
  if (cached) return cached;

  // Google Maps requires departure_time to be an integer unix timestamp OR "now"
  const deptParam = departureTime ? String(departureTime) : "now";

  const params = new URLSearchParams({
    origin: `${from.lat},${from.lng}`,
    destination: `${to.lat},${to.lng}`,
    departure_time: deptParam,
    traffic_model: "best_guess",
    key: apiKey,
  });

  const url = `${DIRECTIONS_BASE}?${params}`;

  const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
  if (!res.ok) throw new Error(`Google Maps HTTP ${res.status}`);

  const data: DirectionsResponse = await res.json();

  if (data.status !== "OK" || !data.routes.length) {
    throw new Error(`Google Maps status: ${data.status}`);
  }

  const leg = data.routes[0].legs[0];
  const polyline = data.routes[0].overview_polyline.points;

  const coords = decodePolyline(polyline);
  const km = Math.round((leg.distance.value / 1000) * 10) / 10;

  // Prefer traffic-aware duration when available
  const durationSeconds =
    leg.duration_in_traffic?.value ?? leg.duration.value;
  const minutes = Math.round(durationSeconds / 60);

  const result = { coords, km, minutes };
  routeCache.set(key, result);
  console.log(`✅ [googleMaps] ${km} km, ${minutes} min — departure ${deptParam === "now" ? "now" : new Date(departureTime! * 1000).toISOString()}`);
  return result;
}
