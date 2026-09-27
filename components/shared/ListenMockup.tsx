"use client";

import { motion } from "framer-motion";
import { PhoneFrame } from "./PhoneFrame";
import { HeadphonesIcon } from "./icons";

const EPISODES = ["Ordering at a café", "Small talk on the street", "Asking for directions"];

// y/scale-only motion throughout -- the waveform bars animate height via
// scaleY (a decorative, non-text element, so no contrast-during-fade risk),
// and the episode/player text never carries an opacity transition. Same
// ground rules as CompeteMockup.
export function ListenMockup() {
  return (
    <PhoneFrame>
      <div className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
        <HeadphonesIcon className="size-4 text-coral" />
        A2 · Everyday Conversations
      </div>
      <div className="mt-6 space-y-2">
        {EPISODES.map((title, index) => (
          <div
            key={title}
            className={
              index === 0
                ? "flex items-center justify-between rounded-2xl bg-royal px-4 py-3 text-sm text-white"
                : "flex items-center justify-between rounded-2xl border border-ink/8 px-4 py-3 text-sm text-ink-soft"
            }
          >
            <span>{title}</span>
            {index === 0 && <span className="text-xs">4:12</span>}
          </div>
        ))}
      </div>
      <motion.div
        initial={{ y: 12 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 flex items-center gap-3 rounded-2xl bg-royal px-4 py-3 text-white"
      >
        <div className="flex items-end gap-0.5" aria-hidden="true">
          {[6, 12, 8, 16, 10].map((height, index) => (
            <motion.span
              key={height + index}
              className="w-1 rounded-full bg-amber"
              style={{ height }}
              animate={{ scaleY: [1, 1.6, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: index * 0.12, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Ordering at a café</p>
          <p className="text-xs text-white/70">1:48 / 4:12 · resumes on any device</p>
        </div>
      </motion.div>
    </PhoneFrame>
  );
}
