"use client";

import BrandMark from "./BrandMark";

export default function ProfileScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-[360px] flex flex-col items-center text-center gap-8">
        <BrandMark size="lg" />

        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--gogo-red)]/20 to-[var(--gogo-orange)]/20 blur-md" />
          <img
            src="/courier-avatar.svg"
            alt="Courier profile"
            className="relative w-36 h-36 rounded-full object-cover shadow-[0_10px_28px_rgba(226,61,40,0.18)] ring-4 ring-white"
          />
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-bold text-[var(--gogo-ink)]">Courier profile</h1>
          <p className="text-sm text-[var(--gogo-muted)]">Ready for the next drop</p>
        </div>

        <button
          type="button"
          onClick={onEnter}
          className="w-full py-3.5 rounded-2xl text-white font-bold text-base
            bg-[var(--gogo-red)] shadow-[0_8px_20px_rgba(226,61,40,0.28)]
            transition-all duration-200
            hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(244,106,31,0.32)] hover:bg-[var(--gogo-orange)]
            active:translate-y-0 active:scale-[0.98] active:shadow-[0_4px_12px_rgba(226,61,40,0.2)]"
        >
          Enter profile
        </button>
      </div>
    </main>
  );
}
