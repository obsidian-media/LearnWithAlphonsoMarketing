"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type FeatureItem = { title: string; description: string; icon: ReactNode };

type FeatureGridProps = { items: FeatureItem[]; headingLevel?: "h2" | "h3" };

export function FeatureGrid({ items, headingLevel = "h3" }: FeatureGridProps) {
  const CardHeading = headingLevel;
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {/* y-only, same reasoning as ContentSection: card text must never rest at
          partial opacity. */}
      {items.map((item) => (
        <motion.li
          key={item.title}
          variants={{ hidden: { y: 12 }, show: { y: 0 } }}
          className="rounded-3xl border border-ink/8 bg-white p-6"
        >
          <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-coral to-amber text-white">
            {item.icon}
          </div>
          <CardHeading className="mt-4 font-display text-lg font-semibold text-ink">
            {item.title}
          </CardHeading>
          <p className="mt-1 text-sm text-ink-soft">{item.description}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
