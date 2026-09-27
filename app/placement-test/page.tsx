import type { Metadata } from "next";
import { ContentSection } from "@/components/shared/ContentSection";
import { FeatureGrid, type FeatureItem } from "@/components/shared/FeatureGrid";
import { CTAButton } from "@/components/shared/CTAButton";
import { LessonMockup } from "@/components/shared/LessonMockup";
import { BookIcon, MicIcon, PaletteIcon } from "@/components/shared/icons";

export const metadata: Metadata = {
  title: "Free CEFR Placement Test",
  description:
    "A free 15-question adaptive test finds your CEFR level (A1-C1) in English, French, or Spanish -- no guessing which lesson to start on.",
};

const FORMATS: FeatureItem[] = [
  {
    title: "Multiple choice",
    description: "Tests recognition of vocabulary and grammar at each level.",
    icon: <BookIcon className="size-5" />,
  },
  {
    title: "Listening comprehension",
    description: "Understanding spoken language, not just reading it.",
    icon: <MicIcon className="size-5" />,
  },
  {
    title: "Written translation",
    description: "Producing the language yourself, not just recognizing an answer.",
    icon: <PaletteIcon className="size-5" />,
  },
];

export default function PlacementTestPage() {
  return (
    <main>
      <ContentSection
        eyebrow="Placement test"
        title="Find your CEFR level in 15 questions"
        level="h1"
        visual={<LessonMockup />}
      >
        <p className="max-w-xl text-ink-soft">
          Starting everyone at lesson one wastes time for anyone who already knows some of the
          language. A free 15-question adaptive test finds your real CEFR level instead — A1
          through C1 — in English, French, or Spanish.
        </p>
        <div className="mt-6">
          <CTAButton
            href="https://learn.alphonsoecosystem.app/auth"
            external
            trackEvent="start_learning_click"
          >
            Take the placement test free
          </CTAButton>
        </div>
      </ContentSection>

      <ContentSection eyebrow="How it works" title="The same formats the course itself uses" tone="royal">
        <FeatureGrid items={FORMATS} tone="royal" />
      </ContentSection>

      <ContentSection eyebrow="Why not speaking?" title="One format is deliberately left out">
        <p className="max-w-xl text-ink-soft">
          Speaking questions are part of the English course itself, but not the placement test.
          Asking for microphone access before you&apos;ve even seen the app risks a question you
          can never answer — a denial would leave it blank. The three formats above are enough to
          place you accurately without that risk.
        </p>
      </ContentSection>
    </main>
  );
}
