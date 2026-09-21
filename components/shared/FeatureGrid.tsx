"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type FeatureItem = { title: string; description: string; icon: ReactNode };

type FeatureGridProps = {
  items: FeatureItem[];
  headingLevel?: "h2" | "h3";
  /** Sections already on a dark (royal) background skip the featured-card
   * treatment below, since a royal-on-royal card wouldn't stand out. */
  tone?: "cream" | "royal";
};

// A slight scatter of rotation per card, alternating direction -- makes the
// grid read as placed/collaged rather than a uniform machine-generated
// template. Straightens out on hover as a small reward for engaging.
const TILTS = ["-1.5deg", "1deg", "-1deg", "1.5deg", "-1.2deg", "1.2deg"];

export function FeatureGrid({ items, headingLevel = "h3", tone = "cream" }: FeatureGridProps) {
  const CardHeading = headingLevel;
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {/* y-only, same reasoning as ContentSection: card text must never rest at
          partial opacity. */}
      {items.map((item, index) => {
        const featured = index === 0 && tone === "cream";
        const tilt = TILTS[index % TILTS.length];
        return (
          <motion.li
            key={item.title}
            variants={{ hidden: { y: 12 }, show: { y: 0 } }}
            initial={{ rotate: tilt }}
            whileHover={{ y: -6, rotate: "0deg" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={
              featured
                ? "rounded-3xl bg-royal p-6 text-white shadow-[0_4px_0_0_rgba(18,37,63,0.25)]"
                : "rounded-3xl border border-ink/8 bg-white p-6 shadow-[0_1px_0_0_rgba(32,26,23,0.04)] transition-shadow hover:shadow-lg"
            }
          >
            <motion.div
              whileHover={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.4 }}
              className={
                featured
                  ? "grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-amber to-coral text-white"
                  : "grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-coral to-amber text-white"
              }
            >
              {item.icon}
            </motion.div>
            <CardHeading
              className={`mt-4 font-display text-lg font-semibold ${featured ? "text-white" : "text-ink"}`}
            >
              {item.title}
            </CardHeading>
            <p className={`mt-1 text-sm ${featured ? "text-white/80" : "text-ink-soft"}`}>
              {item.description}
            </p>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
