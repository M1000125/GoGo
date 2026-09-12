import { NextRequest, NextResponse } from "next/server";
import type { AgentDecision, AgentState, Order, SurgeZone, RoadClosure } from "@/lib/types";

// Gemini paused — using local heuristic until re-enabled
// The agent branch's batching efficiency logic (planEfficiency) lives in
// lib/routing/routeSolver.ts and is used by baselineAgent.ts for add-on scoring.

interface DecideInput {
  order: Order;
  agentState: AgentState;
  remainingSeconds: number;
  activeSurgeZones: SurgeZone[];
  activeClosures: RoadClosure[];
  recentDecisions: AgentDecision[];
}

export async function POST(req: NextRequest) {
  const { order, agentState, remainingSeconds }: DecideInput = await req.json();

  const deadKm = haversineKm(agentState.position, order.pickupCoords);
  const totalMinutes = order.estimatedMinutes + (deadKm / 25) * 60;
  const efficiency = order.payout / Math.max(totalMinutes, 1);

  // Accept if efficient enough AND enough shift time remains
  const accept = efficiency > 4 && remainingSeconds > order.estimatedMinutes * 60;

  // Surge orders get a lower efficiency threshold
  const acceptSurge = order.isSurge && efficiency > 3 && remainingSeconds > order.estimatedMinutes * 60;

  const decision: AgentDecision = {
    orderId: order.id,
    decision: accept || acceptSurge ? "accept" : "skip",
    reason:
      accept || acceptSurge
        ? `Efficiency $${efficiency.toFixed(1)} MXN/min${order.isSurge ? " (surge bonus)" : ""} — accepted.`
        : `Efficiency $${efficiency.toFixed(1)} MXN/min too low or shift ending — skipped.`,
    confidence: 0.7,
    timestamp: Date.now(),
    pickupLabel: order.pickupLabel,
    dropoffLabel: order.dropoffLabel,
    payout: order.payout,
    estimatedMinutes: order.estimatedMinutes,
  };

  return NextResponse.json(decision);
}

function haversineKm(
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
