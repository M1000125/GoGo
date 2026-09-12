// --- Capacity (2-8, selectable per shift) ---
export const CAPACITY_MIN = 2;
export const CAPACITY_MAX = 8;
export const DEFAULT_CAPACITY = 4;

export function clampCapacity(capacity: number): number {
  return Math.min(CAPACITY_MAX, Math.max(CAPACITY_MIN, Math.round(capacity)));
}

// --- Fuel efficiency model ---
// kmPerLiter(capacity) = BASE_KM_PER_LITER * FUEL_EFFICIENCY_MULT ^ (capacity - 2)
// 2-cap motorcycle (~40 km/L) -> 8-cap van/SUV (~10 km/L); each +1 capacity = -20%.
export const BASE_KM_PER_LITER = 40;
export const FUEL_EFFICIENCY_MULT = 0.8;
export const FUEL_PRICE_PER_LITER = 23; // MXN
export const MAINTENANCE_PER_KM = 0.8; // MXN, amortized

export function kmPerLiterForCapacity(capacity: number): number {
  const c = clampCapacity(capacity);
  return BASE_KM_PER_LITER * Math.pow(FUEL_EFFICIENCY_MULT, c - CAPACITY_MIN);
}

export function fuelLitersForKm(km: number, capacity: number): number {
  return km / kmPerLiterForCapacity(capacity);
}

export function fuelCostMxn(km: number, capacity: number): number {
  return fuelLitersForKm(km, capacity) * FUEL_PRICE_PER_LITER;
}

export function maintenanceCostMxn(km: number): number {
  return km * MAINTENANCE_PER_KM;
}

export function vehicleLabelForCapacity(capacity: number): string {
  switch (clampCapacity(capacity)) {
    case 2:
      return "Motorcycle";
    case 3:
      return "Scooter";
    case 4:
      return "Compact Car";
    case 5:
      return "Hatchback";
    case 6:
      return "Small Van";
    case 7:
      return "Crossover";
    case 8:
      return "Van / SUV";
    default:
      return "Courier";
  }
}

// --- Dispatch economics ---
// Calibrated to real Mexican app-delivery courier pay (Rappi / DiDi Food, 2025).
// A typical 4-hour shift in Distrito Tec earns $400–700 MXN net after fuel.
export const BATCH_BONUS_PER_EXTRA = 15; // MXN per extra stacked order (>= 2 orders)
export const EFFICIENCY_GATE_MXN_MIN = 1.5; // min net MXN/min gain to justify an add-on

// --- Price pattern → capacity slot model ---
// Anchor: one capacity slot ≈ a large meal / stackable bag (~$250 MXN).
// One slot ≈ a large meal / small stackable bag — cap so a 4-slot vehicle
// can still carry 1–2 premium (Tier C) orders.
export const SLOT_VALUE_MXN = 250;
export const MAX_ORDER_SLOTS = 3;
export const MIN_PAYOUT_FLOOR = 40;  // MXN formula floor — minimum any order pays
export const BASE_FEE = 35;          // MXN flat per-delivery fee (was 18)
export const PER_KM_FEE = 10;        // MXN per estimated km (was 6)
export const COMMISSION_RATE = 0.08; // 8% of consumer spend paid to courier (was 7%)
export const MAX_PAYOUT_BASE = 220;  // cap before surge (was 120)
export const TIP_PCT_MIN = 0.05;     // tip as share of order spend
export const TIP_PCT_MAX = 0.12;
export const TIP_MIN = 8;            // MXN realised tip floor (was 5)
export const TIP_MAX = 60;           // MXN realised tip cap (was 40)

// Quote payout + tip for an order's orderSize, distance, and slots.
export function quotePayout(orderSizeMxn: number, km: number): number {
  const sizeComponent = Math.round(orderSizeMxn * COMMISSION_RATE);
  const distComponent = Math.round(BASE_FEE + PER_KM_FEE * km);
  const raw = Math.min(sizeComponent + distComponent, MAX_PAYOUT_BASE);
  return Math.max(MIN_PAYOUT_FLOOR, raw);
}

export function quoteTip(orderSizeMxn: number): number {
  const pct = TIP_PCT_MIN + Math.random() * (TIP_PCT_MAX - TIP_PCT_MIN);
  return Math.min(TIP_MAX, Math.max(TIP_MIN, Math.round(orderSizeMxn * pct)));
}

export function orderSlots(orderSizeMxn: number): number {
  return Math.min(
    MAX_ORDER_SLOTS,
    Math.max(1, Math.ceil(orderSizeMxn / SLOT_VALUE_MXN))
  );
}

/** Total capacity slots used by a carried load. */
export function carriedSlots(orders: { order: { slots: number } }[]): number {
  return orders.reduce((s, c) => s + c.order.slots, 0);
}

// --- Order params ---
export const PREP_MIN_MIN = 0;
export const PREP_MIN_MAX = 6;

// --- Movement ---
export const AVG_SPEED_KMH = 25;
export const ROAD_FACTOR = 1.4;

export function haversineKm(
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

// Straight-line haversine x winding factor, rounded to 0.1 km
export function estimateKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  return Math.round(haversineKm(a, b) * ROAD_FACTOR * 10) / 10;
}

export function estimateMinutes(km: number): number {
  return Math.round((km / AVG_SPEED_KMH) * 60);
}