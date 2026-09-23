"use client";

import { motion } from "framer-motion";
import { PhoneFrame } from "./PhoneFrame";
import { SwordsIcon } from "./icons";

// x/scale-only motion throughout -- no opacity on any element here, since
// every one of them carries real text (names, XP, "VS"). See the ground
// rules at the top of this plan / the same pattern in ContentSection and
// AnimatedCounter.
export function CompeteMockup() {
  return (
    <PhoneFrame>
      <div className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
        <SwordsIcon className="size-4 text-coral" />
        Open duel · Gold division
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <motion.div
          initial={{ x: -24 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-2"
        >
          <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-royal to-royal-deep text-sm font-bold text-white">
            You
          </span>
          <span className="text-xs font-semibold text-ink-soft">1,980 XP</span>
        </motion.div>
        <motion.span
          initial={{ scale: 0.6 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-lg font-bold text-coral-deep"
        >
          VS
        </motion.span>
        <motion.div
          initial={{ x: 24 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-2"
        >
          <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-amber to-coral text-sm font-bold text-white">
            Theo
          </span>
          <span className="text-xs font-semibold text-ink-soft">1,865 XP</span>
        </motion.div>
      </div>
      <p className="mt-6 text-center text-xs text-ink-soft">6 days left this week</p>
    </PhoneFrame>
  );
}
