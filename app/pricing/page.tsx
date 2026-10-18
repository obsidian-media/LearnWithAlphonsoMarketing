import type { Metadata } from "next";
import { ContentSection } from "@/components/shared/ContentSection";
import { CTAButton } from "@/components/shared/CTAButton";
import { HeartIcon } from "@/components/shared/icons";
import { START_LEARNING_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Learn with Alphonso is free: the full English, French and Spanish curriculum, spaced repetition review, AI conversation practice and gamification.",
};

const FREE_FEATURES = [
  "English, French, and Spanish curriculum, all 5 CEFR levels",
  "Spaced repetition review queue",
  "AI conversation practice (12 scenarios, adaptive to your level)",
  "Streaks, hearts, leagues, and achievements",
];

export default function PricingPage() {
  return (
    <main>
      <ContentSection eyebrow="Pricing" title="Free to learn. Always." level="h1">
        <div className="max-w-xl">
          <div className="rounded-3xl border border-ink/8 bg-white p-8">
            {/* h2, not h3 -- these cards sit directly under this page's h1. */}
            <h2 className="font-display text-2xl font-semibold text-ink">Free</h2>
            <p className="mt-1 text-3xl font-semibold text-ink">$0</p>
            <ul className="mt-6 space-y-3 text-sm text-ink-soft">
              {FREE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <HeartIcon className="mt-0.5 size-4 shrink-0 text-coral" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CTAButton href={START_LEARNING_URL} external trackEvent="start_learning_click">
                Start learning free
              </CTAButton>
            </div>
          </div>
        </div>
      </ContentSection>
    </main>
  );
}
