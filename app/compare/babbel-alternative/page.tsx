import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/shared/CTAButton";
import { CompareTable, type CompareRow } from "@/components/shared/CompareTable";

export const metadata: Metadata = {
  title: "A Babbel Alternative With a Real Free Tier",
  description:
    "How Learn with Alphonso compares to Babbel: a subscription-free curriculum, AI conversation practice, and spaced repetition review.",
};

const ROWS: CompareRow[] = [
  ["Free tier beyond the first lesson", "Yes — full curriculum", "No — subscription required"],
  ["AI voice/text conversation practice", "Yes — 12 roleplay scenarios", "Limited"],
  ["Spaced repetition review queue", "Yes — SM-2-style algorithm", "Built into lesson flow"],
  ["CEFR-aligned curriculum", "Yes, A1–C1", "Yes, A1–B2"],
  ["Languages", "English, French, Spanish", "14"],
  ["Price", "Free, Pro tier coming", "~$9–18/month subscription"],
];

export default function BabbelAlternativePage() {
  return (
    <main className="bg-cream px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-semibold text-ink">
          Learn with Alphonso vs. Babbel
        </h1>
        <p className="mt-4 text-ink-soft">
          Babbel&apos;s CEFR-aligned lessons are solid, but the curriculum sits behind a
          subscription after the first lesson of each course. Here&apos;s how the two compare if
          you want the whole thing free.
        </p>
        <CompareTable competitorName="Babbel" rows={ROWS} />
        <div className="mt-10">
          <CTAButton href="https://learn.alphonsoecosystem.app/auth" external trackEvent="start_learning_click">
            Try Learn with Alphonso free
          </CTAButton>
        </div>
        <p className="mt-10 text-sm text-ink-soft">
          Also comparing options? See how Learn with Alphonso stacks up against{" "}
          <Link href="/compare/duolingo-alternative" className="text-coral-deep underline">
            Duolingo
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
