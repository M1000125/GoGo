import type { SurgeZone, RoadClosure } from "@/lib/types";

// Mid-shift = T+2h = 7 200 simulated seconds into a 4-hour shift
const MID_SHIFT = 2 * 60 * 60; // 7 200 s

// Surge zones activate at mid-shift and shortly after
export const SURGE_ZONES: SurgeZone[] = [
  {
    id: "surge-itesm-entrance",
    label: "ITESM Entrada Principal — Lunch surge 2×",
    center: { lat: 25.6513, lng: -100.2891 },
    radiusKm: 0.4,
    multiplier: 2.0,
    activeAt: MID_SHIFT, // T+2h
  },
  {
    id: "surge-garza-sada-sur",
    label: "Garza Sada Sur — Dinner rush 1.5×",
    center: { lat: 25.6450, lng: -100.2958 },
    radiusKm: 0.35,
    multiplier: 1.5,
    activeAt: MID_SHIFT + 8 * 60, // T+2h 8min
  },
];

// Road closure activates 10 simulated minutes after mid-shift
export const ROAD_CLOSURES: RoadClosure[] = [
  {
    id: "closure-garza-sada",
    label: "Av. Garza Sada — Accidente, carril cerrado",
    coords: [
      { lat: 25.6500, lng: -100.2905 },
      { lat: 25.6480, lng: -100.2920 },
      { lat: 25.6460, lng: -100.2940 },
    ],
    activeAt: MID_SHIFT + 10 * 60, // T+2h 10min
  },
];

export function isInSurgeZone(
  coords: { lat: number; lng: number },
  surgeZones: SurgeZone[]
): SurgeZone | null {
  for (const zone of surgeZones) {
    const distKm = haversineKm(coords, zone.center);
    if (distKm <= zone.radiusKm) return zone;
  }
  return null;
}

function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
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
