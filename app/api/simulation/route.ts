import { NextRequest, NextResponse } from "next/server";
import type { SurgeZone } from "@/lib/types";
import { loadPlacesCatalog } from "@/lib/places/catalog";
import { generateOrder } from "@/lib/simulation/orderGenerator";

// Memoized once per server start (also file-cached across restarts).
const catalogPromise = loadPlacesCatalog();

export async function POST(req: NextRequest) {
  const { activeSurgeZones }: { activeSurgeZones?: SurgeZone[] } = await req.json();

  const catalog = await catalogPromise;
  const order = generateOrder(activeSurgeZones ?? [], catalog);

  return NextResponse.json(order);
}