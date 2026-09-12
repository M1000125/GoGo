import type { Order, SurgeZone } from "@/lib/types";
import { isInSurgeZone } from "./surgeZones";
import { estimateKm, orderSlots, quotePayout, quoteTip } from "./economics";
import { orderSizeForTier } from "@/lib/places/priceTiers";
import type { PlacesCatalog } from "@/lib/places/types";

let orderCounter = 0;

function randomFrom<T>(pool: T[]): T {
  return pool[Math.floor(Math.random() * pool.length)];
}

function coordsCloseKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
  minKm = 0.08
): boolean {
  return Math.abs(a.lat - b.lat) <= minKm / 111 && Math.abs(a.lng - b.lng) <= minKm / 111;
}

/**
 * Pick a producer. When a surge zone is active, bias toward producers whose
 * pickup sits inside the zone (up to 8 attempts) so surged demand is visible
 * geographically, not just as a payout bump.
 */
function pickProducer(
  producers: PlacesCatalog["producers"],
  activeSurgeZones: SurgeZone[]
) {
  if (activeSurgeZones.length === 0) return randomFrom(producers);
  for (let i = 0; i < 8; i++) {
    const p = randomFrom(producers);
    const inZone = Boolean(isInSurgeZone(p.coords, activeSurgeZones));
    if (inZone && Math.random() < 0.65) return p;
    if (!inZone && i >= 6) return p; // avoid spin when few surged producers exist
  }
  return randomFrom(producers);
}

/**
 * Generate a single realistic order from a producer + consumer sourced from the
 * Places catalog. Payout/tip/slots follow the price->capacity economy:
 * orderSize ~ tier range × consumer multiplier; 1 slot ≈ $100 MXN.
 */
export function generateOrder(
  activeSurgeZones: SurgeZone[] = [],
  catalog: PlacesCatalog
): Order {
  orderCounter += 1;

  const producer = pickProducer(catalog.producers, activeSurgeZones);

  let consumer = randomFrom(catalog.consumers);
  for (let i = 0; i < 20; i++) {
    if (!coordsCloseKm(consumer.coords, producer.coords)) break;
    consumer = randomFrom(catalog.consumers);
  }

  const orderSizeMxn = orderSizeForTier(producer.priceTier, consumer.sizeMultiplier);
  const slots = orderSlots(orderSizeMxn);

  const estimatedKm = estimateKm(producer.coords, consumer.coords);
  const estimatedMinutes = Math.max(2, Math.round((estimatedKm / 25) * 60)); // 25 km/h avg

  const surgeZone = isInSurgeZone(producer.coords, activeSurgeZones);
  const multiplier = surgeZone?.multiplier ?? 1;
  const isSurge = multiplier > 1;

  const basePayout = quotePayout(orderSizeMxn, estimatedKm);
  const payout = Math.round(basePayout * multiplier);

  return {
    id: `order-${Date.now()}-${orderCounter}`,
    pickupCoords: producer.coords,
    dropoffCoords: consumer.coords,
    pickupLabel: producer.name,
    dropoffLabel: consumer.name,
    payout,
    estimatedKm,
    estimatedMinutes,
    expiresAt: Date.now() + 15_000,
    isSurge,
    prepMinutes: producer.avgPrepMinutes + Math.floor(Math.random() * 3),
    tip: quoteTip(orderSizeMxn),
    orderSizeMxn,
    slots,
  };
}