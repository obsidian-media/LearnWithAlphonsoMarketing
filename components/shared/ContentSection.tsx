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
};

export function ContentSection({
  eyebrow,
  title,
  description,
  tone = "cream",
  level = "h2",
  children,
}: ContentSectionProps) {
  return (
    <section className={tone === "royal" ? "bg-royal py-16" : "bg-cream py-16"}>
      <div className="mx-auto max-w-5xl px-6">
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
    </section>
  );
}
