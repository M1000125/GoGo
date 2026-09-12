import { NextRequest, NextResponse } from "next/server";
import { fetchRoute } from "@/lib/routing/osrm";
import { fetchRouteWithTraffic } from "@/lib/routing/googleMaps";
import type { Coords } from "@/lib/types";

export async function POST(req: NextRequest) {
  const { from, to, departureTime }: { from: Coords; to: Coords; departureTime?: number } = await req.json();

  if (!from || !to) {
    return NextResponse.json({ error: "Missing from/to coords" }, { status: 400 });
  }

  const mapsKey = process.env.GOOGLE_MAPS_API_KEY;

  // Use Google Maps (with simulated-time traffic) when the key is configured
  if (mapsKey) {
    try {
      const route = await fetchRouteWithTraffic(from, to, mapsKey, departureTime);
      const timeLabel = departureTime
        ? new Date(departureTime * 1000).toISOString()
        : "now";
      console.log(`✅ [routing] Google Maps — ${route.km} km, ${route.minutes} min @ ${timeLabel}`);
      return NextResponse.json({ ...route, source: "google" });
    } catch (err) {
      console.warn(`⚠️  [routing] Google Maps failed (${(err as Error).message}) — falling back to OSRM`);
    }
  } else {
    console.log("ℹ️  [routing] No GOOGLE_MAPS_API_KEY set — using OSRM");
  }

  // Fallback: OSRM (no traffic, always free)
  const route = await fetchRoute(from, to);
  console.log(`🗺️  [routing] OSRM — ${route.km} km, ${route.minutes} min`);
  return NextResponse.json({ ...route, source: "osrm" });
}
