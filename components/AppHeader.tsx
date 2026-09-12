"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import BrandMark from "./BrandMark";

interface AppHeaderProps {
  view: "feed" | "compare";
  onOpenComparison: () => void;
  onOpenFeed: () => void;
}

export default function AppHeader({
  view,
  onOpenComparison,
  onOpenFeed,
}: AppHeaderProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[var(--gogo-line)]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-end gap-2.5 min-w-0">
          <BrandMark size="sm" />
          {view === "feed" && (
            <span className="pb-0.5 text-xs font-semibold text-[var(--gogo-muted)] truncate">
              Best orders for you
            </span>
          )}
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            aria-label="More options"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--gogo-ink)]
              transition-colors duration-150 hover:bg-[var(--gogo-wash)] active:scale-95"
          >
            <MoreVertical size={22} strokeWidth={2.2} />
          </button>

          {open && (
            <div
              className="absolute right-0 mt-1 w-48 rounded-2xl bg-white py-1.5
                shadow-[0_12px_32px_rgba(42,26,20,0.14)] border border-[var(--gogo-line)] animate-fade-in"
            >
              {view === "feed" ? (
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-sm font-semibold text-[var(--gogo-ink)]
                    hover:bg-[var(--gogo-wash)] transition-colors duration-150"
                  onClick={() => {
                    setOpen(false);
                    onOpenComparison();
                  }}
                >
                  Model Comparison
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-sm font-semibold text-[var(--gogo-ink)]
                    hover:bg-[var(--gogo-wash)] transition-colors duration-150"
                  onClick={() => {
                    setOpen(false);
                    onOpenFeed();
                  }}
                >
                  Best orders
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
