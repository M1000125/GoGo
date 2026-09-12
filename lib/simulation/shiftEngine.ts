import type { ShiftState, AgentState, SurgeZone, RoadClosure } from "@/lib/types";
import { MONTERREY_CENTER } from "./monterreyPois";
import { SURGE_ZONES, ROAD_CLOSURES } from "./surgeZones";
import { nanoid } from "./nanoid";
import { DEFAULT_CAPACITY, clampCapacity } from "./economics";

/** 4-hour simulated shift */
export const SHIFT_DURATION_SECONDS = 4 * 60 * 60; // 14 400 simulated seconds

/**
 * Compute the unix-ms timestamp for "tomorrow 08:00 AM Monterrey time (UTC-6)".
 * Always in the future → Google Maps can predict traffic for this departure time.
 */
export function nextShiftStart(): number {
  const now = new Date();
  // Move to Monterrey local time (UTC-6) to set hours correctly
  const mty = new Date(now.toLocaleString("en-US", { timeZone: "America/Monterrey" }));
  mty.setDate(mty.getDate() + 1);
  mty.setHours(8, 0, 0, 0);
  // Convert back to UTC by reversing the local offset
  const offset = now.getTime() - new Date(now.toLocaleString("en-US", { timeZone: "America/Monterrey" })).getTime();
  return mty.getTime() + offset;
}

function initialAgentState(type: "smart" | "baseline", capacity: number): AgentState {
  return {
    type,
    position: { ...MONTERREY_CENTER },
    earnings: 0,
    netEarnings: 0,
    ordersCompleted: 0,
    kmDriven: 0,
    carriedOrders: [],
    stops: [],
    currentRoute: [],
    currentRouteMeta: null,
    capacity,
    runOrderCount: 0,
    batchBonusEarned: 0,
    tipsEarned: 0,
    waitMinutes: 0,
    acceptCount: 0,
    skipCount: 0,
    deadMilesKm: 0,
    surgeOrdersAccepted: 0,
    expenses: { fuelLiters: 0, fuelMxn: 0, maintenanceMxn: 0 },
    earningsHistory: [],
    lastDecision: null,
    decisionHistory: [],
    isMoving: false,
  };
}

export function createInitialShiftState(capacity = DEFAULT_CAPACITY): ShiftState {
  const cap = clampCapacity(capacity);
  return {
    id: nanoid(),
    status: "idle",
    capacity: cap,
    startedAt: null,
    elapsedSeconds: 0,
    durationSeconds: SHIFT_DURATION_SECONDS,
    simShiftStart: nextShiftStart(),
    activeSurgeZones: [],
    activeClosures: [],
    eventLog: [],
    smartAgent: initialAgentState("smart", cap),
    baselineAgent: initialAgentState("baseline", cap),
  };
}

export function getEventsForElapsed(
  elapsedSeconds: number,
  previousElapsed: number
): { surgeZones: SurgeZone[]; closures: RoadClosure[] } {
  const newSurgeZones = SURGE_ZONES.filter(
    (z) => z.activeAt > previousElapsed && z.activeAt <= elapsedSeconds
  );
  const newClosures = ROAD_CLOSURES.filter(
    (c) => c.activeAt > previousElapsed && c.activeAt <= elapsedSeconds
  );
  return { surgeZones: newSurgeZones, closures: newClosures };
}

export function shouldGenerateOrder(elapsedSeconds: number): boolean {
  // Generate an order roughly every 8–15 seconds (handled by client timer)
  // This function is a gate check — always returns true for the generator to decide
  return elapsedSeconds > 0;
}
