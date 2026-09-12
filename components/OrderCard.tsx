"use client";

import { ChevronRight, Clock, MapPin, Store, Utensils } from "lucide-react";
import type { Order } from "@/lib/types";

interface OrderCardProps {
  order: Order;
  selected: boolean;
  onSelect: () => void;
}

function formatPay(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function OrderCard({ order, selected, onSelect }: OrderCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-[1.65rem] bg-white p-4 sm:p-5
        border transition-all duration-200
        md:flex md:items-center md:gap-8 md:px-6 md:py-5
        ${
          selected
            ? "border-[var(--gogo-red)] shadow-[0_14px_32px_rgba(226,61,40,0.18)] -translate-y-0.5"
            : "border-transparent shadow-[0_8px_24px_rgba(42,26,20,0.08)] hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(42,26,20,0.12)]"
        }
        active:scale-[0.985] active:shadow-[0_4px_14px_rgba(42,26,20,0.1)]`}
    >
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <div className="shrink-0 w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-[var(--gogo-red)] to-[var(--gogo-orange)] text-white flex items-center justify-center shadow-[0_6px_14px_rgba(226,61,40,0.25)]">
          <Utensils className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" strokeWidth={2.2} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-bold text-[var(--gogo-ink)] leading-snug break-words md:text-lg">
            {order.pickupLabel}
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-[var(--gogo-muted)]">
            <Clock size={13} strokeWidth={2.4} />
            ~{order.estimatedMinutes} min
          </p>

          <div className="mt-3 grid grid-cols-[16px_1fr] gap-x-3">
            <div className="flex flex-col items-center pt-0.5">
              <span className="w-2.5 h-2.5 rounded-full border-[2.5px] border-[var(--gogo-orange)] bg-white" />
              <span className="flex-1 w-px border-l-[1.5px] border-dotted border-[var(--gogo-orange)]/70 my-1 min-h-5" />
              <MapPin size={15} className="text-[var(--gogo-red)]" strokeWidth={2.4} />
            </div>
            <div className="flex flex-col justify-between min-h-[3.25rem] py-0.5">
              <p className="text-sm font-semibold text-[var(--gogo-ink)] truncate flex items-center gap-1.5">
                <Store size={13} className="shrink-0 text-[var(--gogo-muted)]" />
                {order.pickupLabel}
              </p>
              <p className="text-sm text-[var(--gogo-muted)] truncate">{order.dropoffLabel}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-0 md:shrink-0 md:w-[200px] md:flex md:flex-col md:items-end md:justify-center md:gap-3 md:border-l md:border-[var(--gogo-line)] md:pl-6">
        <p className="font-extrabold text-[1.55rem] md:text-[2rem] leading-none tabular-nums text-[var(--gogo-red)] whitespace-nowrap">
          {formatPay(order.payout)}
        </p>
        <p className="hidden md:block text-sm text-[var(--gogo-muted)]">
          {order.estimatedKm} km · ~{order.estimatedMinutes} min
        </p>
        <span
          className={`inline-flex items-center gap-0.5 text-sm font-bold transition-colors duration-200 ${
            selected ? "text-[var(--gogo-red)]" : "text-[var(--gogo-orange)]"
          }`}
        >
          {selected ? "Selected" : "Select order"}
          <ChevronRight size={16} strokeWidth={2.6} />
        </span>
      </div>
    </button>
  );
}
