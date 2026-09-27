import type { Metadata } from "next";
import { CTAButton } from "@/components/shared/CTAButton";

export const metadata: Metadata = {
  title: "A Duolingo Alternative With Real Conversation Practice",
  description:
    "How Learn with Alphonso compares to Duolingo: bite-size lessons, AI conversation practice, and spaced repetition review.",
};

const ROWS: [string, string, string][] = [
  ["Bite-size daily lessons", "Yes", "Yes"],
  ["AI voice/text conversation practice", "Yes — 12 roleplay scenarios", "Limited/newer feature"],
  ["Spaced repetition review queue", "Yes — SM-2-style algorithm", "Built into lesson flow"],
  ["Gamification (streaks, leagues, teams)", "Yes", "Yes"],
  ["Languages", "English, French, Spanish", "40+"],
  ["Price", "Free, Pro tier coming", "Free, Super subscription"],
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
        <div className="mt-10 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-xs font-bold uppercase tracking-wide text-ink-soft">
                <th className="py-3 pr-4">Feature</th>
                <th className="py-3 pr-4">Learn with Alphonso</th>
                <th className="py-3">Duolingo</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([feature, ours, theirs]) => (
                <tr key={feature} className="border-b border-ink/8">
                  <td className="py-3 pr-4 font-semibold text-ink">{feature}</td>
                  <td className="py-3 pr-4 text-ink-soft">{ours}</td>
                  <td className="py-3 text-ink-soft">{theirs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10">
          <CTAButton
            href="https://learn.alphonsoecosystem.app/auth"
            external
            trackEvent="start_learning_click"
          >
            Try Learn with Alphonso free
          </CTAButton>
        </div>
      </div>
    </main>
  );
}
