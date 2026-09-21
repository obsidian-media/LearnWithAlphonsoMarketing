"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SectionHeading } from "./SectionHeading";

type ContentSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "cream" | "royal";
  level?: "h1" | "h2";
  children?: ReactNode;
  /** An illustrated device mockup shown alongside the section's text/cards
   * instead of below them -- the site was otherwise wall-to-wall text with
   * no visual representation of the actual product. */
  visual?: ReactNode;
};

export function ContentSection({
  eyebrow,
  title,
  description,
  tone = "cream",
  level = "h2",
  children,
  visual,
}: ContentSectionProps) {
  return (
    <section
      className={tone === "royal" ? "bg-royal py-24" : "bg-cream py-16"}
      style={
        // A flat-rectangle color block reads as the most generic possible
        // section divider. A slight diagonal cut on both edges (only where
        // there's an actual color change to show it off, i.e. royal-on-cream)
        // gives every dark section its own shape instead of a straight bar.
        tone === "royal"
          ? { clipPath: "polygon(0 0, 100% 4%, 100% 100%, 0 96%)" }
          : undefined
      }
    >
      <div className={`mx-auto px-6 ${visual ? "max-w-6xl" : "max-w-5xl"}`}>
        <div className={visual ? "grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center" : undefined}>
          <div>
            {/* y-only: text must never rest at partial opacity — an axe/assistive-tech
                snapshot mid-fade (or before whileInView has fired at all) reads as a
                real contrast failure, since the effective color blends into the
                background. See e2e/site.spec.ts's accessibility sweep. */}
            <motion.div
              initial={{ y: 16 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionHeading eyebrow={eyebrow} title={title} description={description} tone={tone} level={level} />
            </motion.div>
            {children && <div className="mt-10">{children}</div>}
          </div>
          {visual && (
            // scale-only, no opacity: the mockup contains real text, and
            // an opacity fade risks the exact contrast issue documented
            // above on SectionHeading's own animation.
            <motion.div
              initial={{ scale: 0.94 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto w-full max-w-[300px] lg:mx-0 lg:justify-self-center"
            >
              {visual}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
