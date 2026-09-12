"use client";

import { useEffect, useRef, useState } from "react";
import { useShift } from "@/lib/hooks/useShift";
import DualAgentView from "@/components/DualAgentView";
import ShiftSummary from "@/components/ShiftSummary";
import ProfileScreen from "@/components/ProfileScreen";
import CourierFeed from "@/components/CourierFeed";
import AppHeader from "@/components/AppHeader";

type View = "profile" | "feed" | "compare";

export default function Home() {
  const {
    shift,
    currentOrder,
    orderExpiry,
    isSmartDeciding,
    speed,
    setSpeed,
    simulatedNow,
    startShift,
    resetShift,
  } = useShift();
  const [view, setView] = useState<View>("profile");
  const compareStartedRef = useRef(false);

  useEffect(() => {
    if (view !== "compare") return;
    if (shift.status === "idle" && !compareStartedRef.current) {
      compareStartedRef.current = true;
      startShift();
    }
  }, [view, shift.status, startShift]);

  if (view === "profile") {
    return <ProfileScreen onEnter={() => setView("feed")} />;
  }

  return (
    <main className="min-h-screen">
      <AppHeader
        view={view === "compare" ? "compare" : "feed"}
        onOpenComparison={() => setView("compare")}
        onOpenFeed={() => setView("feed")}
      />

      {view === "feed" && <CourierFeed />}

      {view === "compare" && shift.status === "ended" && (
        <ShiftSummary
          shift={shift}
          onReset={() => {
            compareStartedRef.current = false;
            resetShift();
          }}
        />
      )}

      {view === "compare" && shift.status === "running" && (
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <DualAgentView
            shift={shift}
            currentOrder={currentOrder}
            orderExpiry={orderExpiry}
            isSmartDeciding={isSmartDeciding}
            speed={speed}
            setSpeed={setSpeed}
            simulatedNow={simulatedNow}
          />
        </div>
      )}

      {view === "compare" && shift.status !== "ended" && shift.status !== "running" && (
        <p className="px-4 py-16 text-center text-sm font-semibold text-[var(--gogo-muted)]">
          Opening model comparison…
        </p>
      )}
    </main>
  );
}
