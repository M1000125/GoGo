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
      <div className="bg-white border border-[var(--gogo-line)] rounded-[1.65rem] p-4 shadow-[0_8px_24px_rgba(42,26,20,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--gogo-red)] animate-pulse" />
              <span className="text-sm font-bold text-[var(--gogo-muted)]">
                Live shift
              </span>
            </div>
            <span className="text-sm font-semibold text-[var(--gogo-red)] bg-[var(--gogo-wash)] px-2.5 py-0.5 rounded-full">
              {formatSimClock(simulatedNow)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="font-extrabold text-3xl text-[var(--gogo-ink)] tabular-nums">
                {formatSimTime(remaining)}
              </span>
              <span className="text-xs text-[var(--gogo-muted)] ml-1">remaining</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[var(--gogo-muted)] uppercase tracking-wider mr-1">Speed</span>
              {SPEED_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-colors duration-150 ${
                    speed === s
                      ? "bg-[var(--gogo-red)] text-white"
                      : "bg-[var(--gogo-wash)] text-[var(--gogo-muted)] hover:text-[var(--gogo-ink)]"
                  }`}
                >
                  {s}×
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-1.5 bg-[var(--gogo-wash)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--gogo-red)] to-[var(--gogo-orange)] rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>

        {(shift.activeSurgeZones.length > 0 || shift.activeClosures.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {shift.activeSurgeZones.map((z) => (
              <span
                key={z.id}
                className="text-xs px-2 py-1 rounded-full bg-orange-50 text-[var(--gogo-orange)] border border-orange-200"
              >
                Surge · {z.label}
              </span>
            ))}
            {shift.activeClosures.map((c) => (
              <span
                key={c.id}
                className="text-xs px-2 py-1 rounded-full bg-red-50 text-[var(--gogo-red)] border border-red-200"
              >
                Closure · {c.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {currentOrder && orderExpiry && (
        <OrderPing
          order={currentOrder}
          expiresAt={orderExpiry}
          carriedCount={shift.smartAgent.carriedOrders.length}
          capacity={shift.capacity}
        />
      )}

      <EventAlert events={shift.eventLog} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-[var(--gogo-line)] rounded-[1.65rem] p-4 shadow-[0_8px_24px_rgba(42,26,20,0.06)]">
          <AgentPanel
            agentState={shift.smartAgent}
            activeSurgeZones={shift.activeSurgeZones}
            activeClosures={shift.activeClosures}
            label="Smart Agent (AI)"
            accentColor="#E23D28"
            mapId="map-smart"
            elapsedSeconds={elapsed}
            isDeciding={isSmartDeciding}
          />
        </div>
        <div className="bg-white border border-[var(--gogo-line)] rounded-[1.65rem] p-4 shadow-[0_8px_24px_rgba(42,26,20,0.06)]">
          <AgentPanel
            agentState={shift.baselineAgent}
            activeSurgeZones={shift.activeSurgeZones}
            activeClosures={shift.activeClosures}
            label="Baseline (Greedy)"
            accentColor="#C47A54"
            mapId="map-baseline"
            elapsedSeconds={elapsed}
          />
        </div>
      </div>
    </div>
  );
}
