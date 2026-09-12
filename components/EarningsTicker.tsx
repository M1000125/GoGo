"use client";

import { useEffect, useRef, useState } from "react";

interface EarningsTickerProps {
  value: number;
  className?: string;
}

export default function EarningsTicker({ value, className = "" }: EarningsTickerProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const animRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return;

    const duration = 600;

    if (animRef.current) cancelAnimationFrame(animRef.current);
    startRef.current = null;

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setDisplayValue(Math.round(from + (to - from) * eased));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        fromRef.current = to;
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [value]);

  return (
    <span className={className}>
      ${displayValue.toLocaleString()} MXN
    </span>
  );
}
