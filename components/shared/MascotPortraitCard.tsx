"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type MascotPortraitCardProps = {
  src: string;
  alt: string;
  name: string;
  tagline: string;
  tone?: "cream" | "royal";
};

// A rounded-card portrait, not a floating cutout like MascotFloat -- the
// source art here (Hector.png, ported from the iOS asset catalog) isn't a
// transparent cutout, so a card frame reads as intentional where a bare
// rectangle floating on the page would not. scale-only entrance (no
// opacity) since the card contains real text (name/tagline) -- see the
// ground rules at the top of this plan.
export function MascotPortraitCard({
  src,
  alt,
  name,
  tagline,
  tone = "cream",
}: MascotPortraitCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.94 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`overflow-hidden rounded-3xl border ${
        tone === "royal" ? "border-white/15 bg-royal-deep" : "border-ink/8 bg-white"
      }`}
    >
      <Image src={src} alt={alt} width={280} height={269} className="h-auto w-full" />
      <div className="p-4">
        <p className={`font-display text-base font-semibold ${tone === "royal" ? "text-white" : "text-ink"}`}>
          {name}
        </p>
        <p className={`mt-0.5 text-xs ${tone === "royal" ? "text-white/70" : "text-ink-soft"}`}>
          {tagline}
        </p>
      </div>
    </motion.div>
  );
}
