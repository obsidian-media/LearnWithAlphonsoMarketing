"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SectionHeading } from "./SectionHeading";

type ContentSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "cream" | "royal";
  children?: ReactNode;
};

export function ContentSection({ eyebrow, title, description, tone = "cream", children }: ContentSectionProps) {
  return (
    <section className={tone === "royal" ? "bg-royal py-20" : "bg-cream py-20"}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading eyebrow={eyebrow} title={title} description={description} tone={tone} />
        </motion.div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
