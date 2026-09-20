"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type FeatureItem = { title: string; description: string; icon: ReactNode };

export function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item) => (
        <motion.li
          key={item.title}
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          className="rounded-3xl border border-ink/8 bg-white p-6"
        >
          <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-coral to-amber text-white">
            {item.icon}
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold text-ink">{item.title}</h3>
          <p className="mt-1 text-sm text-ink-soft">{item.description}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
