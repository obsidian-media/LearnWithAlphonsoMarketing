import type { Metadata } from "next";
import { ContentSection } from "@/components/shared/ContentSection";
import { CTAButton } from "@/components/shared/CTAButton";
import { HeartIcon, MicIcon, BookIcon, TrophyIcon } from "@/components/shared/icons";
import { MascotPortraitCard } from "@/components/shared/MascotPortraitCard";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Learn with Alphonso is free. Hector, a second AI tutor mode, is coming soon.",
};

const FREE_FEATURES = [
  "English, French, and Spanish curriculum, all 5 CEFR levels",
  "Spaced repetition review queue",
  "AI conversation practice (12 scenarios, adaptive to your level)",
  "Streaks, hearts, leagues, and achievements",
];

// Real, shipped specifics (confirmed in the app's own CHANGELOG), not
// invented -- Hector's persona-memory feature is genuinely built even
// though the tier itself isn't purchasable yet.
const HECTOR_FEATURES = [
  { icon: MicIcon, text: "A dedicated second AI conversation mode, with its own voice backend" },
  { icon: BookIcon, text: "Remembers your CEFR level and what you're working on between sessions" },
  { icon: TrophyIcon, text: "Priority access the moment it's purchasable" },
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
            <div className="mb-6 w-40">
              <MascotPortraitCard
                src="/mascot/hector-portrait.png"
                alt="Hector, the Pro AI tutor, wearing AR goggles in a grand library"
                name="Hector"
                tagline="Your Pro AI tutor"
                tone="royal"
              />
            </div>
            <h2 className="font-display text-2xl font-semibold">Hector Pro</h2>
            <p className="mt-1 text-3xl font-semibold">$9.99/mo</p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              {HECTOR_FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2">
                  <Icon className="mt-0.5 size-4 shrink-0 text-amber" />
                  {text}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/60">
              Not purchasable yet — we&apos;ll announce it here first.
            </p>
          </div>
        </div>
      </ContentSection>
    </main>
  );
}
