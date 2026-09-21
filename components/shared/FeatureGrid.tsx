"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type FeatureItem = { title: string; description: string; icon: ReactNode };

type FeatureGridProps = {
  items: FeatureItem[];
  headingLevel?: "h2" | "h3";
  tone?: "cream" | "royal";
};

// A slight scatter of rotation per card, alternating direction -- makes the
// grid read as placed/collaged rather than a uniform machine-generated
// template. Straightens out on hover as a small reward for engaging.
const TILTS = ["-1.5deg", "1deg", "-1deg", "1.5deg", "-1.2deg", "1.2deg"];

export function FeatureGrid({ items, headingLevel = "h3", tone = "cream" }: FeatureGridProps) {
  const CardHeading = headingLevel;
  // Every card the same size in a uniform 3-equal-column row is one of the
  // most recognizable "generic AI landing page" tells. Instead: the first
  // card spans the full row as a wide intro banner, the rest pair up
  // two-per-row -- and if that leaves one item stranded alone at the end, it
  // widens to a full row too rather than sitting next to an empty cell.
  // Works cleanly whatever the item count (2, 3, or 4) actually is.
  const remainingCount = items.length - 1;
  const trailingOrphanIndex = remainingCount % 2 === 1 ? items.length - 1 : -1;

  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
    >
      {/* y-only, same reasoning as ContentSection: card text must never rest at
          partial opacity. */}
      {items.map((item, index) => {
        const featured = index === 0;
        const spansFullRow = featured || index === trailingOrphanIndex;
        const tilt = TILTS[index % TILTS.length];
        // Featured treatment differs by tone rather than being skipped on
        // royal sections: a navy-filled card would vanish against a navy
        // page background, but a white card with an amber ring reads just
        // as clearly as the "featured" one there. Previously royal-tone
        // sections (which happen to include AI conversation practice, the
        // app's strongest differentiator) got no featured card at all --
        // the section that most deserved visual weight had the least.
        const featuredStyle =
          tone === "royal"
            ? "rounded-3xl bg-white p-6 shadow-[0_4px_0_0_rgba(255,178,56,0.35)] ring-2 ring-amber sm:flex sm:items-center sm:gap-6"
            : "rounded-3xl bg-royal p-6 text-white shadow-[0_4px_0_0_rgba(18,37,63,0.25)] sm:flex sm:items-center sm:gap-6";
        return (
          <motion.li
            key={item.title}
            variants={{ hidden: { y: 12 }, show: { y: 0 } }}
            initial={{ rotate: tilt }}
            whileHover={{ y: -6, rotate: "0deg" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`${spansFullRow ? "sm:col-span-2" : ""} ${
              featured
                ? featuredStyle
                : "rounded-3xl border border-ink/8 bg-white p-6 shadow-[0_1px_0_0_rgba(32,26,23,0.04)] transition-shadow hover:shadow-lg"
            }`}
          >
            <motion.div
              whileHover={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.4 }}
              className={
                featured
                  ? "grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber to-coral text-white"
                  : "grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-coral to-amber text-white"
              }
            >
              {item.icon}
            </motion.div>
            <div className={featured ? "mt-4 sm:mt-0" : undefined}>
              <CardHeading
                className={`font-display text-lg font-semibold ${featured ? "" : "mt-4"} ${
                  featured && tone === "cream" ? "text-white" : "text-ink"
                }`}
              >
                {item.title}
              </CardHeading>
              <p
                className={`mt-1 text-sm ${featured && tone === "cream" ? "text-white/80" : "text-ink-soft"}`}
              >
                {item.description}
              </p>
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
