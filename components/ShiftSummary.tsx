"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ShiftState, EarningsPoint } from "@/lib/types";

interface ShiftSummaryProps {
  shift: ShiftState;
  onReset: () => void;
  competeMode: boolean;
}

function mergeEarningsHistory(
  smart: EarningsPoint[],
  baseline: EarningsPoint[]
): { t: number; smart: number; baseline: number }[] {
  const times = Array.from(
    new Set([...smart.map((p) => p.at), ...baseline.map((p) => p.at)])
  ).sort((a, b) => a - b);

  let sg = 0;
  let bg = 0;
  let si = 0;
  let bi = 0;
  return times.map((t) => {
    while (si < smart.length && smart[si].at <= t) {
      sg = smart[si].net;
      si++;
    }
    while (bi < baseline.length && baseline[bi].at <= t) {
      bg = baseline[bi].net;
      bi++;
    }
    return { t, smart: sg, baseline: bg };
  });
}

export default function ShiftSummary({ shift, onReset, competeMode }: ShiftSummaryProps) {
  const smart = shift.smartAgent;
  const baseline = shift.baselineAgent;

  const smartNet = smart.netEarnings;
  const baselineNet = baseline.netEarnings;
  const netImprovement =
    baselineNet > 0
      ? Math.round(((smartNet - baselineNet) / baselineNet) * 100)
      : smartNet > 0
        ? 100
        : 0;

  const chartData = [
    {
      name: "Net Earnings (MXN)",
      "Smart Agent": smartNet,
      Baseline: baselineNet,
    },
    {
      name: "Gross Earnings",
      "Smart Agent": smart.earnings,
      Baseline: baseline.earnings,
    },
    {
      name: "Orders Completed",
      "Smart Agent": smart.ordersCompleted,
      Baseline: baseline.ordersCompleted,
    },
    {
      name: "Fuel (L)",
      "Smart Agent": Math.round(smart.expenses.fuelLiters),
      Baseline: Math.round(baseline.expenses.fuelLiters),
    },
  ];

  const elapsedMin = Math.max(shift.elapsedSeconds / 60, 1 / 60);
  const smartNetPerMin = smartNet / elapsedMin;
  const baselineNetPerMin = baselineNet / elapsedMin;

  const historyData = mergeEarningsHistory(
    smart.earningsHistory,
    baseline.earningsHistory
  );

  const stats = [
    {
      label: "Net Earnings",
      smart: `$${smartNet.toFixed(0)} MXN`,
      baseline: `$${baselineNet.toFixed(0)} MXN`,
    },
    {
      label: "Gross Earnings",
      smart: `$${smart.earnings} MXN`,
      baseline: `$${baseline.earnings} MXN`,
    },
    {
      label: "Net / min",
      smart: `$${smartNetPerMin.toFixed(1)}`,
      baseline: `$${baselineNetPerMin.toFixed(1)}`,
    },
    {
      label: "Orders Completed",
      smart: smart.ordersCompleted,
      baseline: baseline.ordersCompleted,
    },
    {
      label: "Km Driven",
      smart: `${smart.kmDriven} km`,
      baseline: `${baseline.kmDriven} km`,
    },
    {
      label: "Fuel / Maint",
      smart: `$${smart.expenses.fuelMxn.toFixed(0)} / $${smart.expenses.maintenanceMxn.toFixed(0)}`,
      baseline: `$${baseline.expenses.fuelMxn.toFixed(0)} / $${baseline.expenses.maintenanceMxn.toFixed(0)}`,
    },
    {
      label: "Tips / Batch Bonus",
      smart: `$${smart.tipsEarned} / $${smart.batchBonusEarned}`,
      baseline: `$${baseline.tipsEarned} / $${baseline.batchBonusEarned}`,
    },
    {
      label: "Stacks / Surge",
      smart: `${smart.stacksWon} / ${smart.surgeOrdersAccepted}`,
      baseline: `${baseline.stacksWon} / ${baseline.surgeOrdersAccepted}`,
    },
    {
      label: "Unfinished Runs",
      smart: smart.unfinishedRuns.toString(),
      baseline: baseline.unfinishedRuns.toString(),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-black text-white mb-2">Shift Complete</h1>
        <p className="text-white/50">
          {Math.round(shift.durationSeconds / 60)}-minute shift · capacity{" "}
          {shift.capacity} · {competeMode ? "⚔️ compete mode" : "🔀 compare mode"}
        </p>
      </div>

      {/* Winner banner (net) */}
      <div
        className={`rounded-2xl p-6 text-center border ${
          smartNet >= baselineNet
            ? "bg-blue-950/50 border-blue-500/30"
            : "bg-white/5 border-white/10"
        }`}
      >
        {smartNet > baselineNet ? (
          <>
            <p className="text-blue-300 font-semibold text-lg mb-1">🏆 Smart Agent wins</p>
            <p className="text-white/70">
              +{netImprovement}% more net earnings (${(smartNet - baselineNet).toFixed(0)} MXN extra)
            </p>
          </>
        ) : smartNet === baselineNet ? (
          <p className="text-white/70 font-semibold text-lg">Tie — equal net this shift</p>
        ) : (
          <>
            <p className="text-amber-300 font-semibold text-lg mb-1">Baseline wins this shift</p>
            <p className="text-white/70">Smart Agent is still learning this route pattern.</p>
          </>
        )}
      </div>

      {/* Stats comparison */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((row) => (
          <div key={row.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">{row.label}</p>
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-blue-400 mb-1">Smart</p>
                <p className="text-xl font-bold text-white">{row.smart}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/40 mb-1">Baseline</p>
                <p className="text-xl font-bold text-white/60">{row.baseline}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
          Performance Comparison
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: "#1a1a2e",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "white",
              }}
            />
            <Legend wrapperStyle={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }} />
            <Bar dataKey="Smart Agent" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Baseline" fill="rgba(255,255,255,0.2)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cumulative net earnings line chart */}
      {historyData.length > 1 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
            Cumulative Net Earnings Over Time
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={historyData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis
                dataKey="t"
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                tickFormatter={(v) => `${Math.floor(v / 60)}m`}
              />
              <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: "#1a1a2e",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "white",
                }}
                labelFormatter={(v) => `t+${v}s`}
              />
              <Legend wrapperStyle={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }} />
              <Line type="monotone" dataKey="smart" name="Smart Agent" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="baseline" name="Baseline" stroke="rgba(255,255,255,0.4)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Event log */}
      {shift.eventLog.filter((e) => e.type !== "order").length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
            Shift Events
          </h3>
          <div className="space-y-2">
            {shift.eventLog
              .filter((e) => e.type !== "order")
              .map((e, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span>{e.type === "surge" ? "⚡" : "🚧"}</span>
                  <span className="text-white/70">{e.label}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-colors"
        >
          Run Another Shift
        </button>
      </div>
    </div>
  );
}