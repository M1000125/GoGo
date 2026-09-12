import type { Order, SurgeZone } from "@/lib/types";
import { MONTERREY_POIS } from "./monterreyPois";
import { isInSurgeZone } from "./surgeZones";
import {
  estimateKm,
  PREP_MIN_MIN,
  PREP_MIN_MAX,
  TIP_CHANCE,
  TIP_MIN,
  TIP_MAX,
} from "./economics";

export function generateTip(): number {
  return Math.random() < TIP_CHANCE
    ? Math.round(TIP_MIN + Math.random() * (TIP_MAX - TIP_MIN))
    : 0;
}

export function generatePrepMinutes(): number {
  return Math.round(PREP_MIN_MIN + Math.random() * (PREP_MIN_MAX - PREP_MIN_MIN));
}

let orderCounter = 0;

function randomPOI(exclude?: string) {
  const pool = exclude
    ? MONTERREY_POIS.filter((p) => p.label !== exclude)
    : MONTERREY_POIS;
  return pool[Math.floor(Math.random() * pool.length)];
}

function basePayout(km: number): number {
  // Base: 25 MXN + 8 MXN/km, ±20% randomness
  const base = 25 + km * 8;
  const jitter = 0.8 + Math.random() * 0.4;
  return Math.round(base * jitter);
}

export function generateOrder(activeSurgeZones: SurgeZone[] = []): Order {
  orderCounter += 1;
  const pickup = randomPOI();
  const dropoff = randomPOI(pickup.label);

  const estimatedKm = estimateKm(pickup.coords, dropoff.coords);
  const estimatedMinutes = Math.round((estimatedKm / 25) * 60); // assume 25 km/h avg

  const surgeZone = isInSurgeZone(pickup.coords, activeSurgeZones);
  const multiplier = surgeZone?.multiplier ?? 1;
  const isSurge = multiplier > 1;

  const payout = Math.round(basePayout(estimatedKm) * multiplier);

  return {
    id: `order-${Date.now()}-${orderCounter}`,
    pickupCoords: pickup.coords,
    dropoffCoords: dropoff.coords,
    pickupLabel: pickup.label,
    dropoffLabel: dropoff.label,
    payout,
    estimatedKm,
    estimatedMinutes,
    expiresAt: Date.now() + 15_000,
    isSurge,
    prepMinutes: generatePrepMinutes(),
    tip: generateTip(),
  };
}
