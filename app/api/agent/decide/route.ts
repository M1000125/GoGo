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

  // Smart agent is selective: only takes Tier B/C orders (payout ≥ $85 MXN)
  // with decent efficiency. Since 2–4 offers arrive simultaneously, it can
  // afford to skip cheap Tier A orders and wait for premium ones.
  // Batching gives an extra $15 MXN bonus per stacked order, so the smart
  // agent stacks 2–3 premium orders per run instead of filling up on cheap ones.
  const MIN_PAYOUT = 85; // MXN — skip Tier A (cheap fast food, avg ~$60 payout)
  const MIN_EFFICIENCY = 4.5; // MXN/min

  const shiftEndingSoon = remainingSeconds < 20 * 60; // last 20 sim-min: lower bar
  const accept =
    order.payout >= (shiftEndingSoon ? 55 : MIN_PAYOUT) &&
    efficiency > (shiftEndingSoon ? 2.5 : MIN_EFFICIENCY) &&
    remainingSeconds > order.estimatedMinutes * 60;

  // Surge orders: accept anything decent — surge multiplier already inflates payout.
  const acceptSurge =
    order.isSurge &&
    order.payout >= 65 &&
    efficiency > 3 &&
    remainingSeconds > order.estimatedMinutes * 60;

  const decided = accept || acceptSurge;
  return NextResponse.json(
    baseDecision(
      order,
      decided ? "accept" : "skip",
      decided
        ? `$${order.payout} MXN · ${efficiency.toFixed(1)} MXN/min · ${order.slots} slot${order.slots > 1 ? "s" : ""}${order.isSurge ? " ⚡ surge" : ""} — accepted.`
        : `$${order.payout} MXN · ${efficiency.toFixed(1)} MXN/min — below threshold ($${MIN_PAYOUT} / ${MIN_EFFICIENCY} MXN/min), waiting for better offer.`,
      0.75,
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