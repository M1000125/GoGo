"use client";

import type { ShiftEvent } from "@/lib/types";

interface EventAlertProps {
  events: ShiftEvent[];
}

const EVENT_COLORS: Record<string, string> = {
  surge: "text-[var(--gogo-orange)] border-orange-200 bg-orange-50",
  closure: "text-[var(--gogo-red)] border-red-200 bg-red-50",
  order: "text-[var(--gogo-ink)] border-[var(--gogo-line)] bg-white",
};

export default function EventAlert({ events }: EventAlertProps) {
  const significant = events.filter((e) => e.type !== "order").slice(0, 3);

  if (significant.length === 0) return null;

  return (
    <div className="space-y-2">
      {significant.map((event, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium ${EVENT_COLORS[event.type]}`}
        >
          <span>{event.label}</span>
        </div>
      ))}
    </div>
  );
}
