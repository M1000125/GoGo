"use client";

import { useState } from "react";
import { useShift } from "@/lib/hooks/useShift";
import DualAgentView from "@/components/DualAgentView";
import ShiftSummary from "@/components/ShiftSummary";
import {
  CAPACITY_MIN,
  CAPACITY_MAX,
  DEFAULT_CAPACITY,
  vehicleLabelForCapacity,
} from "@/lib/simulation/economics";

export default function Home() {
  const { shift, offers, speed, setSpeed, simulatedNow, startShift, resetShift } = useShift();
  const [capacity, setCapacity] = useState(DEFAULT_CAPACITY);

  if (shift.status === "ended") {
    return (
      <main className="min-h-screen bg-[#0a0a14]">
        <ShiftSummary shift={shift} onReset={resetShift} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a14]">
      {/* Navbar */}
      <header className="land-item land-d0 border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-50 bg-[#0a0a14]/95 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="text-xl">🛵</span>
          <span className="font-display font-black text-white text-xl uppercase tracking-wide">Courier</span>
          <span className="text-xs text-white/30 border border-white/10 px-2 py-0.5 rounded-full">
            HackMTY 2026
          </span>
        </div>
        <div className="flex items-center gap-3">
          {shift.status === "running" && (
            <button
              onClick={resetShift}
              className="text-xs text-white/40 hover:text-white/70 transition-colors px-3 py-1.5 border border-white/10 rounded-lg"
            >
              Reset
            </button>
          )}
          {shift.status === "idle" && (
            <button
              onClick={() => startShift(capacity)}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-colors"
            >
              Start Shift
            </button>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {shift.status === "idle" ? (
          <IdleScreen
            onStart={() => startShift(capacity)}
            capacity={capacity}
            onCapacityChange={setCapacity}
          />
        ) : (
          <DualAgentView
            shift={shift}
            offers={offers}
            speed={speed}
            setSpeed={setSpeed}
            simulatedNow={simulatedNow}
          />
        )}
      </div>
    </main>
  );
}

function IdleScreen({
  onStart,
  capacity,
  onCapacityChange,
}: {
  onStart: () => void;
  capacity: number;
  onCapacityChange: (n: number) => void;
}) {
  const caps = Array.from(
    { length: CAPACITY_MAX - CAPACITY_MIN + 1 },
    (_, i) => CAPACITY_MIN + i
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center gap-8 px-4">

      {/* Floating scooter */}
      <div className="land-item land-d0">
        <span className="scooter-float text-6xl select-none" role="img" aria-label="scooter">
          🛵
        </span>
      </div>

      {/* Headline */}
      <div className="space-y-3">
        <h1 className="land-item land-d1 font-display text-6xl md:text-7xl font-black text-white leading-none tracking-tight uppercase">
          Can AI beat a<br />
          <span className="text-blue-400">Monterrey courier?</span>
        </h1>
        <p className="land-item land-d2 text-white/50 text-lg max-w-[44ch] mx-auto leading-relaxed">
          Two agents. One 4-hour shift. Real Distrito Tec streets from the
          Google Places API. Orders are quoted on a &ldquo;1 slot ≈ $100 MXN meal&rdquo;
          economy — crisis hits at mid-shift, watch who adapts.
        </p>
      </div>

      {/* Feature pills */}
      <div className="land-item land-d3 flex flex-wrap justify-center gap-3">
        {[
          { icon: "⚡", label: "Surge bursts at mid-shift (T+2h)" },
          { icon: "🚧", label: "Road closure at T+2h 10min" },
          { icon: "📍", label: "Live Places API generators" },
          { icon: "📦", label: "Stack orders up to 8 slots" },
          { icon: "🎛️", label: "Adjustable speed: up to 300×" },
        ].map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-2 text-sm text-white/60 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:border-white/20 hover:text-white/80 transition-colors duration-200"
          >
            <span>{item.icon}</span>
            {item.label}
          </span>
        ))}
      </div>

      {/* Vehicle capacity selector */}
      <div className="land-item land-d4 bg-white/5 border border-white/10 rounded-2xl p-5 max-w-md w-full">
        <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
          Vehicle capacity — {vehicleLabelForCapacity(capacity)} ({capacity} slots)
        </p>
        <div className="flex justify-between gap-2">
          {caps.map((c) => (
            <button
              key={c}
              onClick={() => onCapacityChange(c)}
              className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
                c === capacity
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-white/30 mt-3">
          Higher capacity = more orders per run, higher fuel costs. 1 slot ≈ $100 MXN
          consumer order. Default: {DEFAULT_CAPACITY}.
        </p>
      </div>

      {/* CTA */}
      <div className="land-item-scale land-d6 flex flex-col items-center gap-3">
        <button
          onClick={onStart}
          className="
            group relative px-12 py-4 bg-blue-600 text-white text-lg font-black rounded-2xl
            transition-all duration-150
            hover:bg-blue-500
            active:scale-[0.97] active:bg-blue-700
            hover:scale-[1.03]
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400
          "
        >
          <span className="relative inline-flex items-center gap-2">
            Start Shift
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </button>
        <p className="text-white/20 text-xs">
          Infosys Challenge Track · HackMTY 2026 · Monterrey, NL
        </p>
      </div>

    </div>
  );
}
