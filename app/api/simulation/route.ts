import { NextRequest, NextResponse } from "next/server";
import mockOrdersData from "@/data/mock_orders.json";
import type { Order, SurgeZone } from "@/lib/types";
import { isInSurgeZone } from "@/lib/simulation/surgeZones";
import { isInBounds } from "@/lib/simulation/mapBounds";
import { quotePayout, quoteTip, orderSlots } from "@/lib/simulation/economics";

interface MockOrder {
  id: string;
  restaurant: { id: string; name: string; latitude: number; longitude: number };
  customer: { latitude: number; longitude: number };
  deliveryDistanceKm: number;
  orderTotal: number; // consumer spend in MXN — used for slots + payout formula
  driverPay: number;  // kept for reference but not used directly (too low)
}

// Only orders whose pickup AND dropoff both sit inside the Distrito Tec
// bounding box — the raw dataset spans a much wider area of Monterrey.
const pool = (mockOrdersData as MockOrder[]).filter(
  (o) =>
    isInBounds({ lat: o.restaurant.latitude, lng: o.restaurant.longitude }) &&
    isInBounds({ lat: o.customer.latitude, lng: o.customer.longitude })
);
let poolIndex = Math.floor(Math.random() * pool.length);

function nextMockOrder(): MockOrder {
  const order = pool[poolIndex % pool.length];
  poolIndex++;
  return order;
}

/** Pull the next mock order whose pickup and dropoff both sit inside the
 *  delivery zone. The dataset is already bounded; this is defense-in-depth so a
 *  hand-edited file can never leak an off-zone spawn. */
function nextInBoundsOrder(): MockOrder {
  for (let i = 0; i < pool.length; i++) {
    const raw = nextMockOrder();
    const pickup = { lat: raw.restaurant.latitude, lng: raw.restaurant.longitude };
    const dropoff = { lat: raw.customer.latitude, lng: raw.customer.longitude };
    if (isInBounds(pickup) && isInBounds(dropoff)) return raw;
  }
  return pool[0];
}

export async function POST(req: NextRequest) {
  const { activeSurgeZones }: { activeSurgeZones?: SurgeZone[] } = await req.json();

  const raw = nextInBoundsOrder();

  const pickupCoords = { lat: raw.restaurant.latitude, lng: raw.restaurant.longitude };
  const dropoffCoords = { lat: raw.customer.latitude, lng: raw.customer.longitude };

  const surgeZone = isInSurgeZone(pickupCoords, activeSurgeZones ?? []);
  const multiplier = surgeZone?.multiplier ?? 1;
  const isSurge = multiplier > 1;

  // Use orderTotal as the consumer spend — already in MXN.
  const orderSizeMxn = Math.round(raw.orderTotal);
  const slots = orderSlots(orderSizeMxn);

  const estimatedKm = raw.deliveryDistanceKm;
  const estimatedMinutes = Math.max(2, Math.round((estimatedKm / 25) * 60));

  // Compute payout via the calibrated economics formula (not raw driverPay).
  const basePayout = quotePayout(orderSizeMxn, estimatedKm);
  const payout = Math.round(basePayout * multiplier);
  const tip = quoteTip(orderSizeMxn);

  const order: Order = {
    id: `${raw.id}-${Date.now()}`,
    pickupCoords,
    dropoffCoords,
    pickupLabel: raw.restaurant.name,
    dropoffLabel: `Cliente · ${estimatedKm.toFixed(1)} km`,
    payout,
    estimatedKm,
    estimatedMinutes,
    expiresAt: Date.now() + 15_000,
    isSurge,
    prepMinutes: Math.floor(Math.random() * 6),
    tip,
    orderSizeMxn,
    slots,
  };

  return NextResponse.json(order);
}
