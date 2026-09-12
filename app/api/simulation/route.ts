import { NextRequest, NextResponse } from "next/server";
import mockOrdersData from "@/data/mock_orders.json";
import type { Order, SurgeZone } from "@/lib/types";
import { isInSurgeZone } from "@/lib/simulation/surgeZones";

interface MockOrder {
  id: string;
  restaurant: { id: string; name: string; latitude: number; longitude: number };
  customer: { latitude: number; longitude: number };
  deliveryDistanceKm: number;
  orderTotal: number;
  driverPay: number;
}

const pool = mockOrdersData as MockOrder[];
let poolIndex = Math.floor(Math.random() * pool.length);

function nextMockOrder(): MockOrder {
  const order = pool[poolIndex % pool.length];
  poolIndex++;
  return order;
}

export async function POST(req: NextRequest) {
  const { activeSurgeZones }: { activeSurgeZones: SurgeZone[] } = await req.json();

  const raw = nextMockOrder();

  const pickupCoords = { lat: raw.restaurant.latitude, lng: raw.restaurant.longitude };
  const dropoffCoords = { lat: raw.customer.latitude, lng: raw.customer.longitude };

  const surgeZone = isInSurgeZone(pickupCoords, activeSurgeZones ?? []);
  const multiplier = surgeZone?.multiplier ?? 1;
  const isSurge = multiplier > 1;

  const estimatedMinutes = Math.max(
    2,
    Math.round((raw.deliveryDistanceKm / 20) * 60) // assume 20 km/h avg in Tec area
  );

  const order: Order = {
    id: raw.id,
    pickupCoords,
    dropoffCoords,
    pickupLabel: raw.restaurant.name,
    dropoffLabel: `Cliente (${raw.deliveryDistanceKm} km)`,
    payout: Math.round(raw.driverPay * multiplier * 100) / 100,
    estimatedKm: raw.deliveryDistanceKm,
    estimatedMinutes,
    expiresAt: Date.now() + 15_000,
    isSurge,
    prepMinutes: Math.floor(Math.random() * 6),  // 0–5 simulated minutes prep time
    tip: Math.random() < 0.4 ? Math.floor(Math.random() * 11) + 5 : 0, // 40% chance, $5–15
  };

  return NextResponse.json(order);
}
