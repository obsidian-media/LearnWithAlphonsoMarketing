import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/shared/CTAButton";
import { CompareTable, type CompareRow } from "@/components/shared/CompareTable";

export const metadata: Metadata = {
  title: "A Busuu Alternative With Free AI Conversation Practice",
  description:
    "How Learn with Alphonso compares to Busuu: free AI conversation practice, spaced repetition review, and a full CEFR curriculum.",
};

const ROWS: CompareRow[] = [
  ["AI voice/text conversation practice", "Free — 12 roleplay scenarios", "Paid tier only"],
  ["Spaced repetition review queue", "Yes — SM-2-style algorithm", "Vocabulary trainer"],
  ["Community-corrected exercises", "No — AI-graded instead", "Yes"],
  ["CEFR-aligned curriculum", "Yes, A1–C1", "Yes"],
  ["Languages", "English, French, Spanish", "14"],
  ["Price", "Free, Pro tier coming", "Free tier + ~$6–8/month Premium"],
];

export default function BusuuAlternativePage() {
  return (
    <main className="bg-cream px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-semibold text-ink">
          Learn with Alphonso vs. Busuu
        </h1>
        <p className="mt-4 text-ink-soft">
          Busuu&apos;s community corrections are a genuinely different approach to feedback. Here&apos;s
          how the two compare if what you want is AI conversation practice without a Premium Plus
          upgrade.
        </p>
        <CompareTable competitorName="Busuu" rows={ROWS} />
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
          <Link href="/compare/babbel-alternative" className="text-coral-deep underline">
            Babbel
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
