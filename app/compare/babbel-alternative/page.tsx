import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/shared/CTAButton";
import { CompareTable, type CompareRow } from "@/components/shared/CompareTable";
import { START_LEARNING_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "A Babbel Alternative With a Real Free Tier",
  description:
    "How Learn with Alphonso compares to Babbel: a subscription-free curriculum, AI conversation practice, and spaced repetition review.",
};

const ROWS: CompareRow[] = [
  ["Free to use", "Yes, the full curriculum", "Check Babbel's site"],
  ["AI voice/text conversation practice", "Yes — 12 roleplay scenarios", "Check Babbel's site"],
  ["Spaced repetition review queue", "Yes — SM-2-style algorithm", "Check Babbel's site"],
  ["CEFR-aligned curriculum", "Yes, A1–C1", "Check Babbel's site"],
  ["Languages", "English, French, Spanish", "Check Babbel's site"],
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
          subscription after the first lesson of each course. Here&apos;s how the two compare if you
          want the whole thing free.
        </p>
        <CompareTable competitorName="Babbel" rows={ROWS} />
        <p className="mt-4 text-sm text-ink-soft">
          Competitor details are not verified here and change often. Check Babbel's site for its current
          features and pricing.
        </p>
        <div className="mt-10">
          <CTAButton
            href={START_LEARNING_URL}
            external
            trackEvent="start_learning_click"
          >
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
