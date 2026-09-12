"use client";

import { useEffect, useState } from "react";
import type { Order } from "@/lib/types";

interface OrderPingProps {
  order: Order;
  expiresAt: number;
  carriedCount?: number;
  capacity?: number;
  variant?: "panel" | "bar";
  selected?: boolean;
  onSelect?: () => void;
}

export default function OrderPing({
  order,
  expiresAt,
  carriedCount = 0,
  capacity = 4,
  variant = "panel",
  selected = false,
  onSelect,
}: OrderPingProps) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 250);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const shell =
    timeLeft <= 5
      ? "border-red-200 bg-red-50"
      : "border-orange-200 bg-orange-50";

  if (variant === "bar") {
    const className = `w-full text-left border rounded-[1.4rem] px-4 py-3 md:px-5 animate-pulse-once
      transition-all duration-200 cursor-pointer
      ${
        selected
          ? "border-[var(--gogo-red)] bg-orange-50 shadow-[0_14px_32px_rgba(226,61,40,0.18)] -translate-y-0.5"
          : `${shell} shadow-[0_8px_24px_rgba(42,26,20,0.06)] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(226,61,40,0.14)]`
      }
      active:scale-[0.995]`;

    const body = (
      <>
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <span className="text-xs font-semibold text-[var(--gogo-orange)] uppercase tracking-wider shrink-0">
            {selected ? "Selected" : "Incoming"}
          </span>
          <div className="min-w-0 flex-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="font-semibold text-[var(--gogo-ink)] truncate">
              {order.pickupLabel}
            </span>
            <span className="text-[var(--gogo-muted)] truncate">{order.dropoffLabel}</span>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
            <span
              className={`text-lg font-bold tabular-nums ${order.isSurge ? "text-[var(--gogo-orange)]" : "text-[var(--gogo-ink)]"}`}
            >
              ${order.payout}
              {order.isSurge && (
                <span className="ml-1 text-xs font-semibold text-[var(--gogo-orange)]">SURGE</span>
              )}
            </span>
            <span
              className={`text-sm font-bold tabular-nums ${
                timeLeft <= 5 ? "text-[var(--gogo-red)]" : "text-[var(--gogo-orange)]"
              }`}
            >
              {timeLeft}s
            </span>
          </div>
        </div>
        <div className="mt-2 h-1 bg-white rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--gogo-orange)] rounded-full transition-all duration-250"
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          />
        </div>
      </>
    );

    if (onSelect) {
      return (
        <button type="button" onClick={onSelect} className={className}>
          {body}
        </button>
      );
    }

    return <div className={className}>{body}</div>;
  }

  return (
    <div
      className={`border rounded-[1.4rem] p-4 animate-pulse-once transition-colors shadow-[0_8px_24px_rgba(42,26,20,0.06)] ${shell}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-[var(--gogo-orange)] uppercase tracking-wider">
          New order ping
        </span>
        {carriedCount > 0 && (
          <span className="text-[10px] bg-white text-[var(--gogo-muted)] px-2 py-0.5 rounded-full">
            stackable · {carriedCount}/{capacity} carried
          </span>
        )}
        <span
          className={`text-sm font-bold tabular-nums ${
            timeLeft <= 5 ? "text-[var(--gogo-red)]" : "text-[var(--gogo-orange)]"
          }`}
        >
          {timeLeft}s
        </span>
      </div>

      <div className="space-y-1 text-sm">
        <div className="flex gap-2">
          <span className="text-[var(--gogo-orange)]">▲</span>
          <span className="text-[var(--gogo-ink)]">{order.pickupLabel}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[var(--gogo-red)]">▼</span>
          <span className="text-[var(--gogo-ink)]">{order.dropoffLabel}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span
          className={`text-xl font-bold ${order.isSurge ? "text-[var(--gogo-orange)]" : "text-[var(--gogo-ink)]"}`}
        >
          ${order.payout} MXN
          {order.isSurge && (
            <span className="ml-1 text-xs font-semibold text-[var(--gogo-orange)]">SURGE</span>
          )}
        </span>
        <span className="text-[var(--gogo-muted)] text-xs">
          {order.estimatedKm} km · {order.estimatedMinutes} min
        </span>
      </div>

      <div className="mt-2 h-1 bg-white rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--gogo-orange)] rounded-full transition-all duration-250"
          style={{ width: `${(timeLeft / 15) * 100}%` }}
        />
      </div>
    </div>
  );
}
