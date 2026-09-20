"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

type AnimatedCounterProps = { value: number; unit?: string; tone?: "ink" | "white" };

export function AnimatedCounter({ value, unit, tone = "ink" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className={`inline-flex items-baseline gap-2 font-display text-4xl font-semibold sm:text-5xl ${tone === "white" ? "text-white" : "text-ink"}`}
    >
      {/* Decorative count-up — screen readers get the real value below instead of waiting on it. */}
      <span aria-hidden="true">{display.toLocaleString()}</span>
      <span className="sr-only">{value.toLocaleString()}</span>
      {unit && (
        <span
          className={`text-base font-sans font-semibold ${tone === "white" ? "text-white/80" : "text-ink-soft"}`}
        >
          {unit}
        </span>
      )}
    </span>
  );
}
