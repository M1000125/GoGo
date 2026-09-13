"use client";

import { useEffect, useState } from "react";
import type { Order } from "@/lib/types";

interface OrderPingProps {
  order: Order;
  expiresAt: number;
  createdAt?: number;
  carriedSlots?: number;
  capacity?: number;
}

export default function OrderPing({
  order,
  expiresAt,
  createdAt,
  carriedSlots = 0,
  capacity = 4,
}: OrderPingProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  // Total window derived purely from props — the progress bar scales across
  // the full speed-scaled expiry (2s–15s) instead of snapping at each tick.
  const totalSeconds =
    createdAt && expiresAt > createdAt
      ? (expiresAt - createdAt) / 1000
      : Math.max(1, capacity * 3.75);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 250);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const urgency = timeLeft <= 5 ? "border-red-500/60 bg-red-950/40" : "border-amber-500/40 bg-amber-950/30";

  return (
    <div
      className={`border rounded-xl p-4 animate-pulse-once transition-colors ${urgency}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
          📦 New Order Ping
        </span>
        {carriedSlots > 0 && (
          <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full">
            stackable · {carriedSlots}/{capacity} slots carried
          </span>
        )}
        <span
          className={`text-sm font-bold tabular-nums ${
            timeLeft <= 5 ? "text-red-400" : "text-amber-300"
          }`}
        >
          {timeLeft}s
        </span>
      </div>

      <div className="space-y-1 text-sm">
        <div className="flex gap-2">
          <span className="text-green-400">▲</span>
          <span className="text-white/80">{order.pickupLabel}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-red-400">▼</span>
          <span className="text-white/80">{order.dropoffLabel}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span
          className={`text-xl font-bold ${order.isSurge ? "text-amber-300" : "text-white"}`}
        >
          ${order.payout} MXN
          {order.isSurge && (
            <span className="ml-1 text-xs font-semibold text-amber-400">⚡ SURGE</span>
          )}
        </span>
        <span className="text-white/50 text-xs">
          {order.estimatedKm} km · {order.estimatedMinutes} min
        </span>
      </div>

      <div className="mt-2 flex items-center gap-3 text-xs text-white/40">
        <span>🍱 {order.orderSizeMxn} MXN order</span>
        <span>· {order.slots} slot{order.slots > 1 ? "s" : ""}</span>
        <span>· 💵 tip ~${order.tip} MXN</span>
      </div>

      <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-250"
          style={{ width: `${(timeLeft / totalSeconds) * 100}%` }}
        />
      </div>
    </div>
  );
}
