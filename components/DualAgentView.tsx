"use client";

import type { ShiftState, Order } from "@/lib/types";
import AgentPanel from "./AgentPanel";
import OrderPing from "./OrderPing";
import EventAlert from "./EventAlert";

interface DualAgentViewProps {
  shift: ShiftState;
  currentOrder: Order | null;
  orderExpiry: number | null;
  isSmartDeciding?: boolean;
  speed: number;
  setSpeed: (n: number) => void;
  simulatedNow: number;
}

const SPEED_OPTIONS = [1, 10, 30, 60, 120, 300] as const;

/** Format simulated seconds into H:MM */
function formatSimTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  return `${h}:${m}`;
}

/** Format a unix-ms timestamp into "Mon · 08:23 AM" (Monterrey time) */
function formatSimClock(ms: number): string {
  return new Date(ms).toLocaleString("en-US", {
    timeZone: "America/Monterrey",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DualAgentView({
  shift,
  currentOrder,
  orderExpiry,
  isSmartDeciding = false,
  speed,
  setSpeed,
  simulatedNow,
}: DualAgentViewProps) {
  const elapsed = shift.elapsedSeconds;
  const remaining = shift.durationSeconds - elapsed;
  const progress = (elapsed / shift.durationSeconds) * 100;

  return (
    <div className="space-y-4">
      {/* Shift header */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">

          {/* Left: live indicator + simulated clock */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-display uppercase tracking-wide text-sm font-bold text-white/60">
                Live Shift
              </span>
            </div>
            <span className="text-sm font-mono text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
              🕐 {formatSimClock(simulatedNow)}
            </span>
          </div>

          {/* Right: countdown + speed control */}
          <div className="flex items-center gap-4">
            {/* Remaining time */}
            <div className="text-right">
              <span className="font-display font-black text-3xl text-white tabular-nums">
                {formatSimTime(remaining)}
              </span>
              <span className="text-xs text-white/40 ml-1">remaining</span>
            </div>

            {/* Speed control */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-white/30 uppercase tracking-wider mr-1">Speed</span>
              {SPEED_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-colors ${
                    speed === s
                      ? "bg-blue-600 text-white"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
                  }`}
                >
                  {s}×
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Crisis event banners */}
        {(shift.activeSurgeZones.length > 0 || shift.activeClosures.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {shift.activeSurgeZones.map((z) => (
              <span
                key={z.id}
                className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30"
              >
                ⚡ {z.label}
              </span>
            ))}
            {shift.activeClosures.map((c) => (
              <span
                key={c.id}
                className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30"
              >
                🚧 {c.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Current order ping */}
      {currentOrder && orderExpiry && (
        <OrderPing
          order={currentOrder}
          expiresAt={orderExpiry}
          carriedCount={shift.smartAgent.carriedOrders.length}
          capacity={shift.capacity}
        />
      )}

      {/* Event alerts */}
      <EventAlert events={shift.eventLog} />

      {/* Dual agent panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 border border-blue-500/20 rounded-2xl p-4">
          <AgentPanel
            agentState={shift.smartAgent}
            activeSurgeZones={shift.activeSurgeZones}
            activeClosures={shift.activeClosures}
            label="Smart Agent (AI)"
            accentColor="#3b82f6"
            mapId="map-smart"
            elapsedSeconds={elapsed}
            isDeciding={isSmartDeciding}
          />
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <AgentPanel
            agentState={shift.baselineAgent}
            activeSurgeZones={shift.activeSurgeZones}
            activeClosures={shift.activeClosures}
            label="Baseline (Greedy)"
            accentColor="#6b7280"
            mapId="map-baseline"
            elapsedSeconds={elapsed}
          />
        </div>
      </div>
    </div>
  );
}
