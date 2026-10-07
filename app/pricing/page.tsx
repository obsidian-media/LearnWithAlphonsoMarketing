import type { Metadata } from "next";
import { ContentSection } from "@/components/shared/ContentSection";
import { CTAButton } from "@/components/shared/CTAButton";
import { HeartIcon, MicIcon, BookIcon, TrophyIcon } from "@/components/shared/icons";
import { MascotPortraitCard } from "@/components/shared/MascotPortraitCard";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Learn with Alphonso is free. Alphonso Pro adds Hector, a personal AI voice tutor, as an optional monthly subscription in the iOS app.",
};

const FREE_FEATURES = [
  "English, French, and Spanish curriculum, all 5 CEFR levels",
  "Spaced repetition review queue",
  "AI conversation practice (12 scenarios, adaptive to your level)",
  "Streaks, hearts, leagues, and achievements",
];

// Shipped behaviour only: see LearnWithAlphonso PaywallView copy.
const HECTOR_FEATURES = [
  { icon: MicIcon, text: "Voice conversations with Hector, a personal AI tutor" },
  { icon: BookIcon, text: "Remembers your level and the mistakes you make most between sessions" },
  { icon: TrophyIcon, text: "Everything in Free stays free" },
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
              <CTAButton
                href="https://learn.alphonsoecosystem.app/auth"
                external
                trackEvent="start_learning_click"
              >
                Start learning free
              </CTAButton>
            </div>
          </div>

          <div className="relative rounded-3xl border border-ink/8 bg-royal p-8 text-white">
            <span className="absolute right-6 top-6 rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wide text-royal-deep">
              In the iOS app
            </span>
            <div className="mb-6 w-40">
              <MascotPortraitCard
                src="/mascot/hector-portrait.png"
                alt="Hector, the AI tutor in Alphonso Pro, wearing AR goggles in a grand library"
                name="Hector"
                tagline="Your Pro AI tutor"
                tone="royal"
              />
            </div>
            <h2 className="font-display text-2xl font-semibold">Alphonso Pro</h2>
            <p className="mt-1 text-3xl font-semibold">$9.99/month</p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              {HECTOR_FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2">
                  <Icon className="mt-0.5 size-4 shrink-0 text-amber" />
                  {text}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/60">2-week free trial for new subscribers.</p>
            <p className="mt-1 text-xs text-white/60">
              Subscribe in the iOS app. Billed through your Apple Account; renews monthly until you
              cancel. Local prices are shown in the App Store.
            </p>
          </div>
        </div>
      </ContentSection>
    </main>
  );
}
