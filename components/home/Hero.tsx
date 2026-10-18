"use client";

import { motion } from "framer-motion";
import { CTAButton } from "../shared/CTAButton";
import { MascotFloat } from "../shared/MascotFloat";
import { IPHONE_BETA_URL, START_LEARNING_URL } from "@/lib/links";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        {/* y-only: keeps headline text always fully opaque, see ContentSection. */}
        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-deep">
            English, French &amp; Spanish, free
          </p>
          <h1 className="mt-3 text-balance font-display text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl">
            Learn English, French or Spanish in a few minutes a day
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            1,800+ short lessons, a level test that finds your starting point (A1 to C1), and a
            daily review that brings back the words you&apos;re about to forget. Free.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CTAButton href={START_LEARNING_URL} external trackEvent="start_learning_click">
              Start learning free
            </CTAButton>
            <CTAButton
              href={IPHONE_BETA_URL}
              variant="secondary"
              external
              trackEvent="join_iphone_beta_click"
            >
              Join the iPhone beta
            </CTAButton>
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            Free account with email or Google. iPhone beta via TestFlight. Android coming later.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex w-full max-w-sm items-center justify-center"
        >
          {/* Decorative glow only (no text) -- safe to animate opacity/scale
              freely, unlike text-carrying elements elsewhere on the site. */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-br from-coral/35 via-amber/25 to-transparent blur-3xl"
            animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-tl from-royal/15 to-transparent blur-2xl"
            animate={{ scale: [1.08, 1, 1.08] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <MascotFloat
            src="/mascot/alphonso-cutout.png"
            alt="Alphonso the llama, wearing sunglasses and a blue and gold jacket"
            size={420}
          />
        </motion.div>
      </div>
    </section>
  );
}
