"use client";

import type { ShiftEvent } from "@/lib/types";

interface EventAlertProps {
  events: ShiftEvent[];
}

const EVENT_ICONS: Record<string, string> = {
  surge: "⚡",
  closure: "🚧",
  order: "📦",
};

const EVENT_COLORS: Record<string, string> = {
  surge: "text-amber-300 border-amber-500/30 bg-amber-950/40",
  closure: "text-red-300 border-red-500/30 bg-red-950/40",
  order: "text-white/70 border-white/10 bg-white/5",
};

export default function EventAlert({ events }: EventAlertProps) {
  const significant = events.filter((e) => e.type !== "order").slice(0, 3);

  if (significant.length === 0) return null;

  return (
    <div className="space-y-2">
      {significant.map((event, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium ${EVENT_COLORS[event.type]}`}
        >
          <span>{EVENT_ICONS[event.type]}</span>
          <span>{event.label}</span>
        </div>
      ))}
    </div>
  );
}
