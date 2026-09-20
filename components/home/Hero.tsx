"use client";

import { motion } from "framer-motion";
import { CTAButton } from "../shared/CTAButton";
import { MascotFloat } from "../shared/MascotFloat";

export function Hero() {
  return (
    <section className="overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        {/* y-only: keeps headline text always fully opaque, see ContentSection. */}
        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-deep">
            English &amp; French, one lesson at a time
          </p>
          <h1 className="mt-3 text-balance font-display text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl">
            Learn a language with lessons that actually stick.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Bite-size lessons, AI conversation practice, and streaks that respect your time — with
            Alphonso the llama cheering you on.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CTAButton href="https://learn.alphonsoecosystem.app/auth" external>
              Start learning free
            </CTAButton>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-semibold text-ink-soft">
              🦙 Coming soon on iOS
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-xs"
        >
          {/* Mascot cutout wasn't available this build (see Task 2) — the square
              badge has its own baked-in background, so it's framed in a rounded
              card with a soft gradient glow behind it instead of floating bare. */}
          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-coral/15 to-amber/15 p-6">
            <MascotFloat
              src="/mascot/alphonso-icon.png"
              alt="Alphonso the llama, wearing sunglasses and a blue and gold jacket"
              size={360}
              className="overflow-hidden rounded-[2rem] shadow-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
