import { promises as fs } from "fs";
import path from "path";
import type { PlacesCatalog, Producer, Consumer } from "./types";
import { searchNearby } from "./nearbySearch";
import { priceTierForTypes, prepRangeForTier } from "./priceTiers";
import { residentialConsumers } from "./residentialZones";
import { isInBounds, DISTRITO_TEC_CENTER } from "@/lib/simulation/mapBounds";
import { MONTERREY_POIS } from "@/lib/simulation/monterreyPois";

const CIRCLE_RADIUS_M = 1600;

// Producer (food) primary types — Table A, usable in includedTypes.
const PRODUCER_TYPES = [
  "restaurant",
  "fast_food",
  "cafe",
  "bakery",
  "meal_delivery",
  "meal_takeaway",
];

// Non-food places that can act as order destinations (a person ordering to a
// lobby, campus, office, or shop).
const CONSUMER_TYPES = [
  "university",
  "office",
  "school",
  "library",
  "store",
  "gym",
  "park",
  "point_of_interest",
];

interface CacheFile {
  date: string;
  producers: Producer[];
  consumerPois: Consumer[];
}

const homeDir = process.cwd();
const CACHE_PATH = path.join(homeDir, "data", "places_cache.json");

let memoized: PlacesCatalog | null = null;

// ── Consumer profile from place type ─────────────────────────────────────────
const SIZE_MULT: Record<string, number> = {
  university: 1.1,
  school: 1.0,
  office: 1.2,
  library: 0.9,
  store: 0.9,
  gym: 0.8,
  park: 0.8,
};

const TIP_MULT: Record<string, number> = {
  university: 0.35,
  office: 0.45,
  store: 0.3,
  library: 0.25,
  gym: 0.25,
  park: 0.2,
};

function consumerFromPlace(p: {
  id: string;
  name: string;
  coords: { lat: number; lng: number };
  types: string[];
}): Consumer {
  const primary = p.types[0] ?? "point_of_interest";
  return {
    id: p.id,
    name: p.name,
    coords: p.coords,
    kind: "poi",
    sizeMultiplier: SIZE_MULT[primary] ?? 1.0,
    tipPropensity: TIP_MULT[primary] ?? 0.35,
  };
}

// ── Fallback: synthesize a catalog from bundled POIs ─────────────────────────
const FOOD_KEYWORDS = [
  "taqu",
  "tacos",
  "tacon",
  "starbucks",
  "mcdonald",
  "subway",
  "domino",
  "pizza",
  "burguer",
  "burger",
  "loncher",
  "restaurant",
  "firehouse",
  "cafe",
  "café",
  "coffee",
  "oxxo",
  "kirbys",
  "sushi",
  "la birria",
];

function synthesizeFromPois(): PlacesCatalog {
  const producers: Producer[] = [];
  const consumerPois: Consumer[] = [];
  const lower = (s: string) => s.toLowerCase();

  for (let i = 0; i < MONTERREY_POIS.length; i++) {
    const p = MONTERREY_POIS[i];
    const isFood = FOOD_KEYWORDS.some((k) => lower(p.label).includes(k));
    if (isFood) {
      const tier = priceTierForTypes([lower(p.label).includes("domino") || lower(p.label).includes("fast") || lower(p.label).includes("coffee") ? "fast_food" : "restaurant"]);
      const [pMin, pMax] = prepRangeForTier(tier);
      producers.push({
        id: `poi-${i}`,
        name: p.label,
        coords: p.coords,
        priceTier: tier,
        avgPrepMinutes: Math.round((pMin + pMax) / 2),
        types: ["restaurant"],
      });
    } else {
      consumerPois.push({
        id: `poi-c-${i}`,
        name: p.label,
        coords: p.coords,
        kind: "poi",
        sizeMultiplier: 1.0,
        tipPropensity: 0.35,
      });
    }
  }

  return {
    producers,
    consumers: [...consumerPois, ...residentialConsumers()],
    source: "fallback",
  };
}

// ── Public loader (memoized; file-cached across restarts) ────────────────────
export async function loadPlacesCatalog(): Promise<PlacesCatalog> {
  if (memoized) return memoized;

  const today = new Date().toISOString().slice(0, 10);
  let cached: CacheFile | null = null;
  try {
    cached = JSON.parse(await fs.readFile(CACHE_PATH, "utf8")) as CacheFile;
  } catch {
    cached = null;
  }

  if (cached && cached.date === today && cached.producers.length && cached.consumerPois.length) {
    console.log(`✅ [catalog] loaded ${cached.producers.length} producers / ${cached.consumerPois.length} consumer POIs from cache`);
    memoized = {
      producers: cached.producers,
      consumers: [...cached.consumerPois, ...residentialConsumers()],
      source: "places",
    };
    return memoized;
  }

  if (process.env.GOOGLE_MAPS_API_KEY) {
    try {
      const [prodPlaces, consPlaces] = await Promise.all([
        searchNearby(PRODUCER_TYPES, DISTRITO_TEC_CENTER, CIRCLE_RADIUS_M),
        searchNearby(CONSUMER_TYPES, DISTRITO_TEC_CENTER, CIRCLE_RADIUS_M),
      ]);

      const producers: Producer[] = [];
      for (const p of prodPlaces) {
        if (!isInBounds(p.coords)) continue;
        const tier = priceTierForTypes(p.types);
        const [pMin, pMax] = prepRangeForTier(tier);
        producers.push({
          id: p.id,
          name: p.name,
          coords: p.coords,
          priceTier: tier,
          avgPrepMinutes: Math.round((pMin + pMax) / 2),
          types: p.types,
        });
      }

      const consumerPois: Consumer[] = consPlaces
        .filter((p) => isInBounds(p.coords))
        .map(consumerFromPlace);

      if (producers.length === 0) throw new Error("Nearby Search returned no producers");

      const file: CacheFile = { date: today, producers, consumerPois };
      try {
        await fs.writeFile(CACHE_PATH, JSON.stringify(file, null, 2), "utf8");
      } catch (err) {
        console.warn(`⚠️  [catalog] could not write cache file: ${(err as Error).message}`);
      }

      memoized = {
        producers,
        consumers: [...consumerPois, ...residentialConsumers()],
        source: "places",
      };
      console.log(
        `✅ [catalog] live Nearby Search → ${producers.length} producers / ${consumerPois.length} consumer POIs`
      );
      return memoized;
    } catch (err) {
      console.warn(`⚠️  [catalog] Places search failed (${(err as Error).message}) — synthesizing from POIs`);
    }
  }

  memoized = synthesizeFromPois();
  return memoized;
}