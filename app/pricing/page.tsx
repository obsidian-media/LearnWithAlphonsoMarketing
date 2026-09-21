import type { Metadata } from "next";
import { ContentSection } from "@/components/shared/ContentSection";
import { CTAButton } from "@/components/shared/CTAButton";
import { HeartIcon, MicIcon } from "@/components/shared/icons";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Learn with Alphonso is free. Hector, a second AI tutor mode, is coming soon.",
};

const FREE_FEATURES = [
  "Full English and French curriculum, all 5 CEFR levels",
  "Spaced repetition review queue",
  "AI conversation practice (12 scenarios, adaptive to your level)",
  "Streaks, hearts, leagues, and achievements",
];

export default function PricingPage() {
  return (
    <main>
      <ContentSection eyebrow="Pricing" title="Free to learn. Always." level="h1">
        <div className="grid gap-6 lg:grid-cols-2">
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
              <CTAButton href="https://learn.alphonsoecosystem.app/auth" external>
                Start learning free
              </CTAButton>
            </div>
          </div>

          <div className="relative rounded-3xl border border-ink/8 bg-royal p-8 text-white">
            <span className="absolute right-6 top-6 rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wide text-royal-deep">
              Coming soon
            </span>
            <h2 className="font-display text-2xl font-semibold">Hector Pro</h2>
            <p className="mt-1 text-3xl font-semibold">$9.99/mo</p>
            <p className="mt-6 flex items-start gap-2 text-sm text-white/80">
              <MicIcon className="mt-0.5 size-4 shrink-0 text-amber" />
              A second AI conversation mode, Hector, for even more speaking practice. Not
              purchasable yet — we&apos;ll announce it here first.
            </p>
          </div>
        </div>
      </ContentSection>
    </main>
  );
}
