import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/shared/CTAButton";
import { CompareTable, type CompareRow } from "@/components/shared/CompareTable";

export const metadata: Metadata = {
  title: "A Duolingo Alternative With Real Conversation Practice",
  description:
    "How Learn with Alphonso compares to Duolingo: bite-size lessons, AI conversation practice, and spaced repetition review.",
};

const ROWS: CompareRow[] = [
  ["Bite-size daily lessons", "Yes", "Yes"],
  ["AI voice/text conversation practice", "Yes — 12 roleplay scenarios", "Limited/newer feature"],
  ["Spaced repetition review queue", "Yes — SM-2-style algorithm", "Built into lesson flow"],
  ["Gamification (streaks, leagues, teams)", "Yes", "Yes"],
  ["Languages", "English, French, Spanish", "40+"],
  ["Price", "Free; optional Alphonso Pro ($9.99/month, iOS)", "Free, Super subscription"],
];

export default function DuolingoAlternativePage() {
  return (
    <main className="bg-cream px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-semibold text-ink">
          Learn with Alphonso vs. Duolingo
        </h1>
        <p className="mt-4 text-ink-soft">
          Duolingo covers far more languages. If English, French, or Spanish is what you&apos;re
          after, here&apos;s how the two compare on the mechanics that actually help a language
          stick.
        </p>
        <CompareTable competitorName="Duolingo" rows={ROWS} />
        <div className="mt-10">
          <CTAButton
            href="https://learn.alphonsoecosystem.app/auth"
            external
            trackEvent="start_learning_click"
          >
            Try Learn with Alphonso free
          </CTAButton>
        </div>
        <p className="mt-10 text-sm text-ink-soft">
          Also comparing options? See how Learn with Alphonso stacks up against{" "}
          <Link href="/compare/babbel-alternative" className="text-coral-deep underline">
            Babbel
          </Link>{" "}
          and{" "}
          <Link href="/compare/busuu-alternative" className="text-coral-deep underline">
            Busuu
          </Link>
          , or read the full{" "}
          <Link href="/blog/best-language-learning-apps-2026" className="text-coral-deep underline">
            2026 roundup
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
