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
    <div className="border border-white/10 bg-white/5 rounded-xl p-4 text-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white/60 font-medium">
          🛵 {phase === "heading to pickup" ? `To pickup: ${pickupLabel}` : `Delivering to ${dropoffLabel}`}
        </span>
        <span className="text-white/40 tabular-nums">{Math.round(pct)}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
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
          className="w-3 h-3 rounded-full ring-2 ring-white/20"
          style={{ backgroundColor: accentColor }}
        />
        <h2 className="font-display text-xl font-black text-white uppercase tracking-wide">{label}</h2>
        {isDeciding && (
          <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            thinking…
          </span>
        )}
        {!isDeciding && agentState.isMoving && (
          <span className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full animate-pulse">
            on route…
          </span>
        )}
      </div>

      {/* Earnings ticker */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
          Net Earnings
        </p>
        <EarningsTicker
          value={agentState.netEarnings}
          className="font-display text-4xl font-black text-white tabular-nums"
        />
        <p className="text-xs text-white/40 mt-1">
          Gross ${agentState.earnings} · {vehicle} ({agentState.capacity} cap) ·{" "}
          {agentState.expenses.fuelLiters.toFixed(1)} L fuel
        </p>
        <div className="mt-2 flex gap-4 text-sm text-white/60">
          <span>{agentState.ordersCompleted} orders</span>
          <span>{agentState.kmDriven} km</span>
          <span>${netPerMin.toFixed(1)}/min</span>
          <span>{acceptRate}% accept</span>
        </div>
        <div className="mt-2 flex gap-4 text-xs text-white/40">
          <span>Fuel ${agentState.expenses.fuelMxn.toFixed(1)}</span>
          <span>Maint ${agentState.expenses.maintenanceMxn.toFixed(1)}</span>
          <span>Tips ${agentState.tipsEarned}</span>
          <span>Bonus ${agentState.batchBonusEarned}</span>
        </div>
      </div>

      {/* Carried load chips */}
      {agentState.carriedOrders.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-white/50 uppercase tracking-wider">
              Carried load
            </p>
            <span className="text-xs text-white/40">
              {agentState.carriedOrders.length}/{agentState.capacity} capacity
            </span>
          </div>
          <div className="space-y-1">
            {agentState.carriedOrders.map((c) => (
              <div
                key={c.order.id}
                className="flex items-center gap-2 text-xs text-white/70"
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
            <p className="mt-2 text-xs text-white/40">
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
              ? "border-green-500/30 bg-green-950/30"
              : "border-white/10 bg-white/5"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`font-bold text-xs uppercase tracking-wider ${
                lastDecision.decision === "accept" ? "text-green-400" : "text-white/50"
              }`}
            >
              {lastDecision.decision === "accept" ? "✓ Accepted" : "✗ Skipped"}
            </span>
            <span className="text-xs text-white/30">
              {Math.round(lastDecision.confidence * 100)}% confidence
            </span>
          </div>
          <p className="text-white/80 leading-snug">{lastDecision.reason}</p>
        </div>
      )}

      {/* Full scrollable decision history */}
      {fullHistory.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-white/30 uppercase tracking-wider">
            Decision history ({fullHistory.length})
          </p>
          {/* Scrollable container — shows all decisions from newest to oldest */}
          <div className="overflow-y-auto max-h-64 pr-1 space-y-1.5 scrollbar-thin">
            {fullHistory.map((d, i) => (
              <div
                key={`${d.orderId}-${i}`}
                className={`rounded-lg p-3 text-xs border ${
                  d.decision === "accept"
                    ? "border-green-500/20 bg-green-950/20"
                    : "border-white/5 bg-white/3"
                }`}
              >
                {/* Top row: badge + route */}
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-0.5 shrink-0 font-bold ${
                      d.decision === "accept" ? "text-green-400" : "text-white/30"
                    }`}
                  >
                    {d.decision === "accept" ? "✓" : "✗"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 font-medium truncate">{d.pickupLabel}</p>
                    <p className="text-white/40 truncate">→ {d.dropoffLabel}</p>
                  </div>
                </div>

                {/* Bottom row: time + earnings (only for accepted) */}
                {d.decision === "accept" && (
                  <div className="mt-2 flex items-center gap-3 pl-5">
                    <span className="text-white/40">
                      ~{d.estimatedMinutes} min
                    </span>
                    <span className="text-green-400 font-semibold">
                      +${d.payout} MXN
                    </span>
                  </div>
                )}

                {/* Reason — show for skipped orders */}
                {d.decision === "skip" && (
                  <p className="mt-1.5 pl-5 text-white/30 italic leading-snug">
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