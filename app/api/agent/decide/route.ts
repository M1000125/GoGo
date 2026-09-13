import { NextRequest, NextResponse } from "next/server";
import type {
  AgentDecision,
  AgentState,
  Order,
  SurgeZone,
  RoadClosure,
} from "@/lib/types";
import { evaluateSmartOffer } from "@/lib/agents/smartPolicy";

// Gemini remains paused — local heuristic in smartPolicy.ts (burst ranking
// + scoreAddon stacking). This endpoint is the single-order fallback.

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
  const { decision } = evaluateSmartOffer(order, agentState, remainingSeconds);
  return NextResponse.json(decision);
}
