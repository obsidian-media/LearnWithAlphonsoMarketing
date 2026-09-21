"use client";

import { motion } from "framer-motion";

type AnimatedCounterProps = { value: number; unit?: string; tone?: "ink" | "white" };

// Previously counted up from 0 over 1.1s on scroll-into-view. Dropped that:
// a fullPage screenshot (and, by the same logic, a real visitor scrolling at
// normal speed) kept catching it still at "0" -- a count-up animation
// shouldn't have a state where the number is wrong. This always renders the
// real value; the y-only entrance (same safe pattern as every other
// text-carrying element on the site -- see ContentSection) still gives it
// some life without ever being incorrect mid-transition.
export function AnimatedCounter({ value, unit, tone = "ink" }: AnimatedCounterProps) {
  return (
    <motion.span
      initial={{ y: 12 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-baseline gap-2 font-display text-4xl font-semibold sm:text-5xl ${tone === "white" ? "text-white" : "text-ink"}`}
    >
      <span>{value.toLocaleString()}</span>
      {unit && (
        <span
          className={`text-base font-sans font-semibold ${tone === "white" ? "text-white/80" : "text-ink-soft"}`}
        >
          {unit}
        </span>
      )}
    </motion.span>
  );
}
