"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { AgentState, RouteMeta, SurgeZone, RoadClosure } from "@/lib/types";
import EarningsTicker from "./EarningsTicker";
import { vehicleLabelForCapacity } from "@/lib/simulation/economics";

const ShiftMap = dynamic(() => import("./ShiftMap"), { ssr: false });

// Live progress bar driven by rAF — no React state updates on every frame
function DeliveryProgress({ meta, pickupLabel, dropoffLabel, accentColor }: {
  meta: RouteMeta;
  pickupLabel: string;
  dropoffLabel: string;
  accentColor: string;
}) {
  const [pct, setPct] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - meta.startedAt;
      const next = Math.min((elapsed / meta.durationMs) * 100, 100);
      setPct(next);
      if (next < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [meta]);

  const phase = pct < (meta.pickupIndex / Math.max(1, 100)) * 100
    ? "heading to pickup"
    : "delivering";

  return (
    <div className="border border-[var(--gogo-line)] bg-[var(--gogo-wash)] rounded-xl p-4 text-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[var(--gogo-muted)] font-medium">
          {phase === "heading to pickup" ? `To pickup: ${pickupLabel}` : `Delivering to ${dropoffLabel}`}
        </span>
        <span className="text-[var(--gogo-muted)] tabular-nums">{Math.round(pct)}%</span>
      </div>
      <div className="h-2 bg-white rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-none"
          style={{ width: `${pct}%`, backgroundColor: accentColor }}
        />
      </div>
    </div>
  );
}

interface AgentPanelProps {
  agentState: AgentState;
  activeSurgeZones: SurgeZone[];
  activeClosures: RoadClosure[];
  label: string;
  accentColor: string;
  mapId: string;
  elapsedSeconds: number;
  isDeciding?: boolean;
}

export default function AgentPanel({
  agentState,
  activeSurgeZones,
  activeClosures,
  label,
  accentColor,
  mapId,
  elapsedSeconds,
  isDeciding = false,
}: AgentPanelProps) {
  const lastDecision = agentState.lastDecision;
  // Full history, newest first
  const fullHistory = [...agentState.decisionHistory].reverse();
  const acceptRate =
    agentState.acceptCount + agentState.skipCount > 0
      ? Math.round(
          (agentState.acceptCount /
            (agentState.acceptCount + agentState.skipCount)) *
            100
        )
      : 0;
  const elapsedMin = Math.max(elapsedSeconds / 60, 1 / 60);
  const netPerMin = agentState.netEarnings / elapsedMin;
  const vehicle = vehicleLabelForCapacity(agentState.capacity);

  return (
    <div className="flex flex-col gap-4 min-w-0">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full ring-2 ring-black/10"
          style={{ backgroundColor: accentColor }}
        />
        <h2 className="text-xl font-extrabold text-[var(--gogo-ink)]">{label}</h2>
        {isDeciding && (
          <span className="text-xs bg-[var(--gogo-wash)] text-[var(--gogo-orange)] px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--gogo-orange)] animate-ping" />
            thinking…
          </span>
        )}
        {!isDeciding && agentState.isMoving && (
          <span className="text-xs bg-[var(--gogo-wash)] text-[var(--gogo-muted)] px-2 py-0.5 rounded-full animate-pulse">
            on route…
          </span>
        )}
      </div>

      {/* Earnings ticker */}
      <div className="bg-[var(--gogo-wash)] border border-[var(--gogo-line)] rounded-xl p-4">
        <p className="text-xs text-[var(--gogo-muted)] uppercase tracking-wider mb-1">
          Net Earnings
        </p>
        <EarningsTicker
          value={agentState.netEarnings}
          className="text-4xl font-black text-[var(--gogo-ink)] tabular-nums"
        />
        <p className="text-xs text-[var(--gogo-muted)] mt-1">
          Gross ${agentState.earnings} · {vehicle} ({agentState.capacity} cap) ·{" "}
          {agentState.expenses.fuelLiters.toFixed(1)} L fuel
        </p>
        <div className="mt-2 flex gap-4 text-sm text-[var(--gogo-muted)]">
          <span>{agentState.ordersCompleted} orders</span>
          <span>{agentState.kmDriven} km</span>
          <span>${netPerMin.toFixed(1)}/min</span>
          <span>{acceptRate}% accept</span>
        </div>
        <div className="mt-2 flex gap-4 text-xs text-[var(--gogo-muted)]">
          <span>Fuel ${agentState.expenses.fuelMxn.toFixed(1)}</span>
          <span>Maint ${agentState.expenses.maintenanceMxn.toFixed(1)}</span>
          <span>Tips ${agentState.tipsEarned}</span>
          <span>Bonus ${agentState.batchBonusEarned}</span>
        </div>
      </div>

      {/* Carried load chips */}
      {agentState.carriedOrders.length > 0 && (
        <div className="bg-[var(--gogo-wash)] border border-[var(--gogo-line)] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-[var(--gogo-muted)] uppercase tracking-wider">
              Carried load
            </p>
            <span className="text-xs text-[var(--gogo-muted)]">
              {agentState.carriedOrders.length}/{agentState.capacity} capacity
            </span>
          </div>
          <div className="space-y-1">
            {agentState.carriedOrders.map((c) => (
              <div
                key={c.order.id}
                className="flex items-center gap-2 text-xs text-[var(--gogo-ink)]"
              >
                <span
                  className={
                    c.pickedUp
                      ? "w-1.5 h-1.5 rounded-full bg-green-400"
                      : "w-1.5 h-1.5 rounded-full bg-amber-400"
                  }
                />
                <span className="truncate">
                  {c.pickedUp ? "▼" : "▲"} {c.order.dropoffLabel} · $
                  {c.order.payout}
                </span>
              </div>
            ))}
          </div>
          {(agentState.expenses.fuelMxn + agentState.expenses.maintenanceMxn) > 0 && (
            <p className="mt-2 text-xs text-[var(--gogo-muted)]">
              Total expenses ${(agentState.expenses.fuelMxn + agentState.expenses.maintenanceMxn).toFixed(1)} MXN
            </p>
          )}
        </div>
      )}

      {/* Map */}
      <ShiftMap
        agentState={agentState}
        activeSurgeZones={activeSurgeZones}
        activeClosures={activeClosures}
        agentColor={accentColor}
        mapId={mapId}
      />

      {/* Delivery progress bar — shown while courier is moving */}
      {agentState.currentRouteMeta && lastDecision?.decision === "accept" && (
        <DeliveryProgress
          meta={agentState.currentRouteMeta}
          pickupLabel={lastDecision.pickupLabel}
          dropoffLabel={lastDecision.dropoffLabel}
          accentColor={accentColor}
        />
      )}

      {/* Last decision reasoning */}
      {lastDecision && (
        <div
          className={`border rounded-xl p-4 text-sm ${
            lastDecision.decision === "accept"
              ? "border-orange-200 bg-orange-50"
              : "border-[var(--gogo-line)] bg-[var(--gogo-wash)]"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`font-bold text-xs uppercase tracking-wider ${
                lastDecision.decision === "accept" ? "text-[var(--gogo-orange)]" : "text-[var(--gogo-muted)]"
              }`}
            >
              {lastDecision.decision === "accept" ? "✓ Accepted" : "✗ Skipped"}
            </span>
            <span className="text-xs text-[var(--gogo-muted)]">
              {Math.round(lastDecision.confidence * 100)}% confidence
            </span>
          </div>
          <p className="text-[var(--gogo-ink)] leading-snug">{lastDecision.reason}</p>
        </div>
      )}

      {/* Full scrollable decision history */}
      {fullHistory.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-[var(--gogo-muted)] uppercase tracking-wider">
            Decision history ({fullHistory.length})
          </p>
          {/* Scrollable container — shows all decisions from newest to oldest */}
          <div className="overflow-y-auto max-h-64 pr-1 space-y-1.5 scrollbar-thin">
            {fullHistory.map((d, i) => (
              <div
                key={`${d.orderId}-${i}`}
                className={`rounded-lg p-3 text-xs border ${
                  d.decision === "accept"
                    ? "border-orange-200 bg-orange-50"
                    : "border-[var(--gogo-line)] bg-white"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-0.5 shrink-0 font-bold ${
                      d.decision === "accept" ? "text-[var(--gogo-orange)]" : "text-[var(--gogo-muted)]"
                    }`}
                  >
                    {d.decision === "accept" ? "✓" : "✗"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[var(--gogo-ink)] font-medium truncate">{d.pickupLabel}</p>
                    <p className="text-[var(--gogo-muted)] truncate">→ {d.dropoffLabel}</p>
                  </div>
                </div>

                {d.decision === "accept" && (
                  <div className="mt-2 flex items-center gap-3 pl-5">
                    <span className="text-[var(--gogo-muted)]">
                      ~{d.estimatedMinutes} min
                    </span>
                    <span className="text-[var(--gogo-red)] font-semibold">
                      +${d.payout} MXN
                    </span>
                  </div>
                )}

                {d.decision === "skip" && (
                  <p className="mt-1.5 pl-5 text-[var(--gogo-muted)] italic leading-snug">
                    {d.reason}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}