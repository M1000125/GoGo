import { NextRequest, NextResponse } from "next/server";
import type {
  AgentDecision,
  AgentState,
  Order,
  SurgeZone,
  RoadClosure,
} from "@/lib/types";
import { carriedSlots } from "@/lib/simulation/economics";

// Gemini paused — using local heuristic until re-enabled.
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

  // Capacity is a SLOT budget — hard ceiling before any economics.
  const usedSlots = carriedSlots(agentState.carriedOrders);
  if (usedSlots + order.slots > agentState.capacity) {
    return NextResponse.json(
      baseDecision(
        order,
        "skip",
        `No room — ${usedSlots + order.slots} slots needed vs ${agentState.capacity} capacity (${usedSlots} in use).`,
        0.95,
        agentState
      )
    );
  }

  const deadKm = haversineKm(agentState.position, order.pickupCoords);
  const totalMinutes =
    order.estimatedMinutes + order.prepMinutes + (deadKm / 25) * 60;
  const efficiency = order.payout / Math.max(totalMinutes, 1);

  // Accept if efficient enough AND enough shift time remains
  const accept = efficiency > 4 && remainingSeconds > order.estimatedMinutes * 60;

  // Surge orders get a lower efficiency threshold
  const acceptSurge =
    order.isSurge && efficiency > 3 && remainingSeconds > order.estimatedMinutes * 60;

  return NextResponse.json(
    baseDecision(
      order,
      accept || acceptSurge ? "accept" : "skip",
      accept || acceptSurge
        ? `Efficiency $${efficiency.toFixed(1)} MXN/min (${order.orderSizeMxn} MXN order, ${order.slots} slot${order.slots > 1 ? "s" : ""})${order.isSurge ? " (surge bonus)" : ""} — ${accept || acceptSurge ? "accepted" : "skipped"}.`
        : `Efficiency $${efficiency.toFixed(1)} MXN/min too low or shift ending — skipped.`,
      0.7,
      agentState
    )
  );
}

function baseDecision(
  order: Order,
  decision: "accept" | "skip",
  reason: string,
  confidence: number,
  agentState: AgentState
): AgentDecision {
  void agentState;
  return {
    orderId: order.id,
    decision,
    reason,
    confidence,
    timestamp: Date.now(),
    pickupLabel: order.pickupLabel,
    dropoffLabel: order.dropoffLabel,
    payout: order.payout,
    estimatedMinutes: order.estimatedMinutes,
  };
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