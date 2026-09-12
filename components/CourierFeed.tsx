"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Map } from "lucide-react";
import type { AgentDecision, AgentState, Order } from "@/lib/types";
import { createInitialShiftState, SHIFT_DURATION_SECONDS } from "@/lib/simulation/shiftEngine";
import { ORDER_INTERVAL_SIM_S } from "@/lib/hooks/useShift";
import OrderCard from "./OrderCard";
import OrderPing from "./OrderPing";

const ShiftMap = dynamic(() => import("./ShiftMap"), { ssr: false });

interface RankedOrder {
  order: Order;
  decision: AgentDecision;
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json() as Promise<T>;
}

function rankByAgent(items: RankedOrder[]): RankedOrder[] {
  return [...items].sort((a, b) => {
    if (a.decision.decision !== b.decision.decision) {
      return a.decision.decision === "accept" ? -1 : 1;
    }
    if (b.decision.confidence !== a.decision.confidence) {
      return b.decision.confidence - a.decision.confidence;
    }
    return b.order.payout - a.order.payout;
  });
}

export default function CourierFeed() {
  const [ranked, setRanked] = useState<RankedOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [previewAgent, setPreviewAgent] = useState<AgentState | null>(null);
  const [routeStats, setRouteStats] = useState<{ km: number; minutes: number } | null>(null);
  const [justSelected, setJustSelected] = useState(false);
  const [liveOrder, setLiveOrder] = useState<Order | null>(null);
  const [liveExpiry, setLiveExpiry] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const seed = createInitialShiftState();
        const orders: Order[] = [];
        for (let i = 0; i < 8; i++) {
          const order = await postJson<Order>("/api/simulation", {
            activeSurgeZones: [],
          });
          orders.push(order);
        }

        const decisions = await Promise.all(
          orders.map((order) =>
            postJson<AgentDecision>("/api/agent/decide", {
              order,
              agentState: seed.smartAgent,
              remainingSeconds: SHIFT_DURATION_SECONDS,
              activeSurgeZones: [],
              activeClosures: [],
              recentDecisions: [],
            })
          )
        );

        if (cancelled) return;

        const paired = orders.map((order, i) => ({
          order,
          decision: {
            ...decisions[i],
            pickupLabel: order.pickupLabel,
            dropoffLabel: order.dropoffLabel,
            payout: order.payout,
            estimatedMinutes: order.estimatedMinutes,
          },
        }));

        setRanked(rankByAgent(paired).slice(0, 3));
      } catch {
        if (!cancelled) setError("Could not load orders right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let delayTimer: ReturnType<typeof setTimeout> | null = null;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    let firstOrder = true;
    const streamSpeed = 60;

    const scheduleNext = () => {
      const simJitterS = Math.random() * 5 * 60;
      const realDelayMs = firstOrder
        ? 2_000
        : ((ORDER_INTERVAL_SIM_S + simJitterS) / streamSpeed) * 1000;
      firstOrder = false;

      delayTimer = setTimeout(async () => {
        if (cancelled) return;
        try {
          const order = await postJson<Order>("/api/simulation", {
            activeSurgeZones: [],
          });
          if (cancelled) return;
          setLiveOrder(order);
          setLiveExpiry(order.expiresAt);
          hideTimer = setTimeout(() => {
            setLiveOrder((prev) => (prev?.id === order.id ? null : prev));
            setLiveExpiry((prev) => (prev === order.expiresAt ? null : prev));
          }, Math.max(0, order.expiresAt - Date.now()));
        } catch {
          // Keep the waiting state and try again on the next interval.
        }
        if (!cancelled) scheduleNext();
      }, realDelayMs);
    };

    scheduleNext();

    return () => {
      cancelled = true;
      if (delayTimer) clearTimeout(delayTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (!selectedOrder) {
      setPreviewAgent(null);
      setRouteStats(null);
      return;
    }

    let cancelled = false;
    const base = createInitialShiftState().smartAgent;

    (async () => {
      let coords = [selectedOrder.pickupCoords, selectedOrder.dropoffCoords];
      let km = selectedOrder.estimatedKm;
      let minutes = selectedOrder.estimatedMinutes;

      try {
        const route = await postJson<{
          coords?: { lat: number; lng: number }[];
          km?: number;
          minutes?: number;
        }>("/api/routing", {
          from: selectedOrder.pickupCoords,
          to: selectedOrder.dropoffCoords,
        });
        if (route.coords && route.coords.length > 1) coords = route.coords;
        if (typeof route.km === "number") km = route.km;
        if (typeof route.minutes === "number") minutes = route.minutes;
      } catch {
        // Keep order estimates and straight-line points.
      }

      if (cancelled) return;

      setRouteStats({ km, minutes });
      setPreviewAgent({
        ...base,
        position: selectedOrder.pickupCoords,
        currentRoute: coords,
        currentRouteMeta: {
          startedAt: Date.now(),
          durationMs: 1e12,
          pickupIndex: 0,
        },
        lastDecision: {
          orderId: selectedOrder.id,
          decision: "accept",
          reason: "",
          confidence: 1,
          timestamp: Date.now(),
          pickupLabel: selectedOrder.pickupLabel,
          dropoffLabel: selectedOrder.dropoffLabel,
          payout: selectedOrder.payout,
          estimatedMinutes: selectedOrder.estimatedMinutes,
        },
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedOrder]);

  function selectOrder(order: Order) {
    setSelectedOrder(order);
    setJustSelected(true);
    window.setTimeout(() => setJustSelected(false), 1600);
  }

  const perKm =
    selectedOrder && routeStats && routeStats.km > 0
      ? selectedOrder.payout / routeStats.km
      : null;

  return (
    <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-16 right-[8%] h-64 w-64 rounded-full bg-[var(--gogo-orange)]/10 blur-3xl" />
        <div className="absolute top-1/2 -left-10 h-72 w-72 rounded-full bg-[var(--gogo-red)]/8 blur-3xl" />
      </div>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--gogo-red)] animate-pulse" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--gogo-muted)]">
            Live orders
          </h2>
        </div>
        {liveOrder && liveExpiry ? (
          <OrderPing
            order={liveOrder}
            expiresAt={liveExpiry}
            variant="bar"
            selected={selectedOrder?.id === liveOrder.id}
            onSelect={() => selectOrder(liveOrder)}
          />
        ) : (
          <div className="rounded-[1.4rem] border border-dashed border-[var(--gogo-line)] bg-white/70 px-5 py-4 text-sm font-semibold text-[var(--gogo-muted)]">
            Orders coming in…
          </div>
        )}
      </section>

      <h1 className="text-xl md:text-2xl font-extrabold text-[var(--gogo-ink)] mb-4">
        Best orders for you
      </h1>

      {loading && (
        <div className="flex flex-col gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-36 md:h-32 rounded-[1.65rem] bg-white shadow-[0_8px_24px_rgba(42,26,20,0.06)] animate-pulse"
            />
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-[var(--gogo-red)] font-semibold">{error}</p>
      )}

      {!loading && !error && (
        <div className="flex flex-col gap-4">
          {ranked.map((item) => (
            <OrderCard
              key={item.order.id}
              order={item.order}
              selected={selectedOrder?.id === item.order.id}
              onSelect={() => selectOrder(item.order)}
            />
          ))}
        </div>
      )}

      <section className="mt-8 lg:grid lg:grid-cols-12 lg:gap-6 lg:items-stretch">
        <div className="lg:col-span-4 mb-4 lg:mb-0">
          <div className="flex items-center gap-2 mb-3">
            <Map size={18} className="text-[var(--gogo-red)]" />
            <h2 className="text-base font-bold text-[var(--gogo-ink)]">Your route</h2>
          </div>

          {selectedOrder ? (
            <div
              className={`rounded-[1.65rem] bg-white px-5 py-5 shadow-[0_8px_24px_rgba(42,26,20,0.06)] border border-[var(--gogo-line)] h-full transition-opacity duration-200 ${
                justSelected ? "opacity-100" : "opacity-95"
              }`}
            >
              <p className="text-sm font-bold text-[var(--gogo-red)]">Order selected</p>
              <p className="mt-2 text-lg font-bold text-[var(--gogo-ink)] leading-snug">
                {selectedOrder.pickupLabel}
              </p>
              <p className="mt-1 text-sm text-[var(--gogo-muted)]">{selectedOrder.dropoffLabel}</p>
              <p className="mt-4 font-extrabold text-3xl tabular-nums text-[var(--gogo-red)]">
                ${selectedOrder.payout.toFixed(2)}
              </p>
              {perKm != null && routeStats && (
                <p className="text-sm text-[var(--gogo-muted)] mt-2">
                  ${perKm.toFixed(2)}/km · {routeStats.km.toFixed(1)} km route
                </p>
              )}
              <p className="text-sm text-[var(--gogo-muted)] mt-1">
                ~{selectedOrder.estimatedMinutes} min
              </p>
            </div>
          ) : (
            <div className="rounded-[1.65rem] bg-white border border-dashed border-[var(--gogo-line)] px-6 py-10 text-center shadow-[0_6px_18px_rgba(42,26,20,0.04)] h-full flex items-center justify-center">
              <p className="text-sm font-semibold text-[var(--gogo-muted)]">
                Select an order to preview the route.
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-8">
          {previewAgent && selectedOrder ? (
            <div className="rounded-[1.65rem] overflow-hidden shadow-[0_10px_28px_rgba(42,26,20,0.1)] bg-white p-1.5 h-full">
              <ShiftMap
                key={selectedOrder.id}
                agentState={previewAgent}
                activeSurgeZones={[]}
                activeClosures={[]}
                agentColor="#E23D28"
                mapId={`gogo-route-${selectedOrder.id}`}
                previewMode
                className="w-full h-72 lg:h-[520px] rounded-[1.25rem] overflow-hidden"
              />
            </div>
          ) : selectedOrder ? (
            <div className="rounded-[1.65rem] bg-white border border-[var(--gogo-line)] px-6 py-14 text-center shadow-[0_6px_18px_rgba(42,26,20,0.04)] lg:h-[520px] flex items-center justify-center">
              <p className="text-sm font-semibold text-[var(--gogo-muted)]">Loading route…</p>
            </div>
          ) : (
            <div className="rounded-[1.65rem] bg-white/80 border border-dashed border-[var(--gogo-line)] px-6 py-14 text-center shadow-[0_6px_18px_rgba(42,26,20,0.04)] lg:h-[520px] flex items-center justify-center">
              <p className="text-sm font-semibold text-[var(--gogo-muted)]">
                Your map will appear here.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
