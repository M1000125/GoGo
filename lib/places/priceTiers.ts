import type { PriceTier } from "./types";

// ── Price tier classification ────────────────────────────────────────────────

const TIER1: Set<string> = new Set([
  "fast_food",
  "cafe",
  "bakery",
  "meal_delivery",
  "meal_takeaway",
  "food_court",
  "coffee_shop",
  "sandwich_shop",
  "taco_stand",
  "japanese_restaurant", // cheap fast-casual sushi
  "chinese_restaurant",
  "korean_restaurant",
  "pizza_restaurant",
  "burger_restaurant",
]);

const TIER3: Set<string> = new Set([
  "steak_house",
  "seafood_restaurant",
  "fine_dining_restaurant",
]);

/**
 * Map a Places API `primaryType` / `types[]` to a price tier 1–3.
 * Tier 2 (default) = sit-down restaurant / bar.
 */
export function priceTierForTypes(types: string[]): PriceTier {
  for (const t of types) {
    if (TIER1.has(t)) return 1;
    if (TIER3.has(t)) return 3;
  }
  return 2;
}

// ── Order-size range per tier ────────────────────────────────────────────────
// These represent the consumer spend (pre-fee) in MXN.
// One capacity slot ≈ $100 MXN; tiers 1 and 3 sit on either side.

const ORDER_SIZE_RANGES: Record<PriceTier, [min: number, max: number]> = {
  1: [55, 85],
  2: [95, 115],
  3: [140, 220],
};

/** Sample a random order-size MXN within the tier range, optionally scaled by a consumer multiplier. */
export function orderSizeForTier(tier: PriceTier, consumerMultiplier: number = 1): number {
  const [min, max] = ORDER_SIZE_RANGES[tier];
  const raw = min + Math.random() * (max - min);
  return Math.round(Math.max(min, Math.min(max, raw * consumerMultiplier)));
}

/** Derive a representative prep-time range (minutes) from the price tier. */
export function prepRangeForTier(tier: PriceTier): [min: number, max: number] {
  switch (tier) {
    case 1: return [0, 3];
    case 2: return [1, 5];
    case 3: return [3, 8];
  }
}
