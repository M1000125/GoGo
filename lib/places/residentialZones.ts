import type { Consumer } from "./types";
import { isInBounds } from "@/lib/simulation/mapBounds";

// ── Seeded PRNG for deterministic residential scatter ─────────────────────────
// Constrains a 32-bit seed.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Real colonias inside / hugging the Distrito Tec bounds ───────────────────
interface ResidentialZone {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  radiusKm: number;
  count: number; // consumer instances scattered per zone
  sizeMultiplier: number; // order-spend bias vs the "base" tier range
  tipPropensity: number; // 0–1
}

export const RESIDENTIAL_ZONES: ResidentialZone[] = [
  { id: "zon-tecnologico", name: "Tecnológico", center: { lat: 25.6494, lng: -100.2950 }, radiusKm: 0.25, count: 4, sizeMultiplier: 1.0, tipPropensity: 0.4 },
  { id: "zon-cuauhtemoc", name: "Cuauhtémoc", center: { lat: 25.6566, lng: -100.2805 }, radiusKm: 0.28, count: 4, sizeMultiplier: 1.35, tipPropensity: 0.6 },
  { id: "zon-independencia", name: "Independencia", center: { lat: 25.6405, lng: -100.2840 }, radiusKm: 0.25, count: 3, sizeMultiplier: 0.85, tipPropensity: 0.25 },
  { id: "zon-vista-hermosa", name: "Vista Hermosa", center: { lat: 25.6398, lng: -100.2780 }, radiusKm: 0.22, count: 3, sizeMultiplier: 1.0, tipPropensity: 0.3 },
  { id: "zon-chepevera", name: "Chepevera", center: { lat: 25.6605, lng: -100.2885 }, radiusKm: 0.2, count: 3, sizeMultiplier: 1.15, tipPropensity: 0.45 },
  { id: "zon-del-valle", name: "del Valle", center: { lat: 25.6415, lng: -100.2985 }, radiusKm: 0.22, count: 3, sizeMultiplier: 1.0, tipPropensity: 0.35 },
  { id: "zon-altavista", name: "Altavista", center: { lat: 25.6475, lng: -100.2750 }, radiusKm: 0.2, count: 3, sizeMultiplier: 1.2, tipPropensity: 0.6 },
  { id: "zon-empalme", name: "Empalme", center: { lat: 25.6555, lng: -100.2930 }, radiusKm: 0.18, count: 2, sizeMultiplier: 0.9, tipPropensity: 0.3 },
];

// Campus footprint (ITESM) — residential consumers must not land inside it.
const CAMPUS_BOUNDS = { north: 25.6540, south: 25.6475, east: -100.2845, west: -100.2935 };

export function residentialConsumers(): Consumer[] {
  const out: Consumer[] = [];
  for (const zone of RESIDENTIAL_ZONES) {
    const rand = mulberry32(2026 + zone.center.lat * 1000 + zone.center.lng * 100 + zone.count);
    let placed = 0;
    let attempts = 0;
    while (placed < zone.count && attempts < 50) {
      attempts += 1;
      // Random point uniformly inside the zone's radius circle
      const r = Math.sqrt(rand()) * zone.radiusKm;
      const theta = rand() * Math.PI * 2;
      const dLat = (r * Math.cos(theta)) / 111.0;
      const dLng = (r * Math.sin(theta)) / (111.0 * Math.cos((zone.center.lat * Math.PI) / 180));
      const coords = { lat: zone.center.lat + dLat, lng: zone.center.lng + dLng };
      if (!isInBounds(coords)) continue;
      if (
        coords.lat <= CAMPUS_BOUNDS.north &&
        coords.lat >= CAMPUS_BOUNDS.south &&
        coords.lng <= CAMPUS_BOUNDS.east &&
        coords.lng >= CAMPUS_BOUNDS.west
      ) {
        continue;
      }
      out.push({
        id: `${zone.id}-h${placed + 1}`,
        name: `Casa · Colonia ${zone.name}`,
        coords,
        kind: "residential",
        sizeMultiplier: zone.sizeMultiplier,
        tipPropensity: zone.tipPropensity,
      });
      placed += 1;
    }
  }
  return out;
}