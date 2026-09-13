import { NextRequest, NextResponse } from "next/server";
import type {
  AgentDecision,
  AgentState,
  Order,
  SurgeZone,
  RoadClosure,
} from "@/lib/types";
import { SHIFT_DURATION_SECONDS } from "@/lib/simulation/shiftEngine";
import { smartDecision } from "@/lib/agents/decisionCore";

// This route is the "reasoning surface": useShift runs the smart policy
// in-process (synchronous), and this endpoint exposes the exact same policy
// over HTTP — useful as a standalone decision API and for parity checks.

interface DecideInput {
  order: Order;
  agentState: AgentState;
  remainingSeconds: number;
  activeSurgeZones: SurgeZone[];
  activeClosures: RoadClosure[];
  recentDecisions: AgentDecision[];
}

export async function POST(req: NextRequest) {
  const {
    order,
    agentState,
    remainingSeconds,
    activeSurgeZones,
    activeClosures,
    recentDecisions,
  }: DecideInput = await req.json();

  const decision = smartDecision({
    order,
    carried: agentState.carriedOrders,
    position: agentState.position,
    capacity: agentState.capacity,
    elapsedSeconds:
      SHIFT_DURATION_SECONDS - Math.max(0, remainingSeconds),
    remainingSeconds: Math.max(0, remainingSeconds),
    activeSurgeZones,
    activeClosures,
    recentDecisions,
    agentType: "smart",
  });

  return NextResponse.json(decision);
}