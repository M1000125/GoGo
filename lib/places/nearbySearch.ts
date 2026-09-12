import type { Coords } from "@/lib/types";

export interface NearbyPlace {
  id: string;
  name: string;
  coords: Coords;
  types: string[];
  primaryType: string | null;
}

const SEARCH_NEARBY_URL = "https://places.googleapis.com/v1/places:searchNearby";

// Basic SKU only — intentionally excludes Enterprise fields (priceLevel, rating,
// priceRange, openingHours, phone, websiteUri) to keep billing off.
const FIELD_MASK =
  "places.id,places.displayName,places.location,places.types,places.primaryType,places.formattedAddress";

// In-memory cache keyed by included-types list, so repeated catalog loads
// during a server's lifetime never re-bill.
const cache = new Map<string, NearbyPlace[]>();

function cacheKey(includedTypes: string[], lat: number, lng: number): string {
  return `${[...includedTypes].sort().join(",")}@${lat.toFixed(3)},${lng.toFixed(3)}`;
}

/**
 * Query Google Places API (New) Nearby Search for up to `maxResults` places of
 * the given Table-A primary types around a circle. Throws when the API is not
 * configured or the call fails — callers fall back to a synthesized catalog.
 */
export async function searchNearby(
  includedTypes: string[],
  center: Coords,
  radiusM: number,
  maxResults = 20
): Promise<NearbyPlace[]> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_MAPS_API_KEY not set");

  const key = cacheKey(includedTypes, center.lat, center.lng);
  const cached = cache.get(key);
  if (cached) return cached;

  const body = {
    includedTypes,
    maxResultCount: maxResults,
    languageCode: "es-MX",
    regionCode: "MX",
    locationRestriction: {
      circle: {
        center: { latitude: center.lat, longitude: center.lng },
        radius: radiusM,
      },
    },
  };

  const res = await fetch(SEARCH_NEARBY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) throw new Error(`Nearby Search HTTP ${res.status}`);

  const data = (await res.json()) as {
    places?: Array<{
      id?: string;
      displayName?: { text?: string };
      location?: { latitude?: number; longitude?: number };
      types?: string[];
      primaryType?: string;
    }>;
  };

  const places: NearbyPlace[] = (data.places ?? [])
    .filter((p) => p.id && p.location?.latitude != null && p.location?.longitude != null)
    .map((p) => ({
      id: p.id!,
      name: p.displayName?.text ?? "Lugar",
      coords: { lat: p.location!.latitude!, lng: p.location!.longitude! },
      types: p.types ?? [],
      primaryType: p.primaryType ?? null,
    }));

  cache.set(key, places);
  console.log(
    `✅ [places] searchNearby ${includedTypes.join("|")} → ${places.length} places`
  );
  return places;
}