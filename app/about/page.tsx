import type { Metadata } from "next";
import Image from "next/image";
import { ContentSection } from "@/components/shared/ContentSection";
import { FeatureGrid, type FeatureItem } from "@/components/shared/FeatureGrid";
import { ConversationMockup } from "@/components/shared/ConversationMockup";
import { FlameIcon, MicIcon, TrophyIcon, BookIcon } from "@/components/shared/icons";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Alphonso and Learn with Alphonso.",
};

// Real, shipped specifics, same facts used elsewhere on the site (pricing
// page, stats band) -- not restated as marketing fluff.
const VALUES: FeatureItem[] = [
  {
    icon: <FlameIcon className="size-6" />,
    title: "Small, honest reps",
    description:
      "Short daily lessons beat marathon cram sessions. Spaced repetition brings words back right before you'd forget them, not on a fixed schedule.",
  },
  {
    icon: <MicIcon className="size-6" />,
    title: "Real conversations, not flashcards",
    description:
      "Twelve AI-guided scenarios adapt to your CEFR level, from ordering coffee to handling a job interview.",
  },
  {
    icon: <TrophyIcon className="size-6" />,
    title: "Game mechanics that respect your time",
    description:
      "Streaks, hearts, and leagues built to keep you consistent — not to manipulate you into opening the app.",
  },
  {
    icon: <BookIcon className="size-6" />,
    title: "Three languages, five levels",
    description: "English, French, and Spanish, each spanning all five CEFR levels from A1 to C1.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <ContentSection eyebrow="Our story" title="Meet Alphonso" level="h1">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <div className="relative mx-auto shrink-0 sm:mx-0">
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-br from-coral/30 to-amber/20 blur-2xl"
            />
            <Image
              src="/mascot/alphonso-cutout.png"
              alt="Alphonso the llama"
              width={180}
              height={300}
              className="h-auto w-[180px]"
            />
          </div>
          <p className="max-w-xl text-ink-soft">
            Alphonso is a confident, sunglasses-wearing llama who believes a language sticks best
            in small, honest reps — not marathon cram sessions. Learn with Alphonso is built by{" "}
            <strong className="text-ink">Obsidian Media</strong> around that idea: bite-size
            lessons, real spaced repetition, and gamification that respects your time instead of
            manipulating it.
          </p>
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="What we believe"
        title="Built on a few rules we don't break"
        visual={<ConversationMockup />}
      >
        <FeatureGrid items={VALUES} />
      </ContentSection>
    </main>
  );
}
