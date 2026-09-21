import type { Metadata } from "next";
import { ContentSection } from "@/components/shared/ContentSection";
import { FeatureGrid } from "@/components/shared/FeatureGrid";
import { LessonMockup } from "@/components/shared/LessonMockup";
import { ConversationMockup } from "@/components/shared/ConversationMockup";
import { GamificationMockup } from "@/components/shared/GamificationMockup";
import {
  BookIcon,
  MicIcon,
  FlameIcon,
  TrophyIcon,
  UsersIcon,
  PaletteIcon,
  HeartIcon,
} from "@/components/shared/icons";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Everything inside Learn with Alphonso: curriculum, AI conversation, spaced repetition, and gamification.",
};

const CURRICULUM = [
  {
    title: "5 CEFR levels",
    description: "A1 through C1, so you always know where you stand.",
    icon: <BookIcon className="size-5" />,
  },
  {
    title: "Two full courses",
    description:
      "534 English lessons and 500 French lessons — near-parity, not a thin afterthought.",
    icon: <BookIcon className="size-5" />,
  },
  {
    title: "5 question formats",
    description:
      "Multiple choice, fill-in-the-blank, image matching, listening, and sentence reordering.",
    icon: <PaletteIcon className="size-5" />,
  },
  {
    title: "Adaptive placement",
    description: "A 15-question test starts you at the right level, not lesson one.",
    icon: <TrophyIcon className="size-5" />,
  },
];

const PRACTICE = [
  {
    title: "AI conversation practice",
    description:
      "12 roleplay scenarios by voice or text, with clarity feedback on your spoken answers and difficulty that adapts to your CEFR level.",
    icon: <MicIcon className="size-5" />,
  },
  {
    title: "Spaced repetition review",
    description:
      "An SM-2-style queue resurfaces exactly what you got wrong, on a schedule built to make it stick.",
    icon: <BookIcon className="size-5" />,
  },
  {
    title: "In-lesson reinforcement",
    description:
      "Miss a question and a quick extra practice question on the same concept shows up right there — not just later in review.",
    icon: <HeartIcon className="size-5" />,
  },
  {
    title: "Weakness tracking",
    description:
      "See exactly what you're still working on versus what you've mastered, tracked automatically from lessons and conversations.",
    icon: <TrophyIcon className="size-5" />,
  },
];

const SOCIAL = [
  {
    title: "Gamification",
    description: "XP, streaks, streak freezes, and hearts that regenerate as you play.",
    icon: <FlameIcon className="size-5" />,
  },
  {
    title: "Leagues",
    description: "Bronze through Diamond, with global, friends, and country leaderboards.",
    icon: <TrophyIcon className="size-5" />,
  },
  {
    title: "Friends",
    description: "Invite friends, see their progress, and cheer each other on.",
    icon: <UsersIcon className="size-5" />,
  },
  {
    title: "Themes",
    description: "Meadow, Studio Ink, or Manuscript — pick the look that fits you.",
    icon: <PaletteIcon className="size-5" />,
  },
];

const DIFFERENTIATORS = [
  {
    title: "Bite-size, not marathon",
    description: "5-minute reps designed to fit into an actual day, not a study session.",
  },
  {
    title: "Real conversation, not just flashcards",
    description: "Voice or text roleplay with a language partner that adapts to you.",
  },
  {
    title: "It knows what you're stuck on",
    description: "Weakness tracking feeds review automatically — you don't have to notice it yourself.",
  },
];

export default function FeaturesPage() {
  return (
    <main>
      <ContentSection
        eyebrow="Curriculum"
        title="A real CEFR-leveled curriculum, not a gimmick"
        level="h1"
        visual={<LessonMockup />}
      >
        {/* Cards are h2 here, not the FeatureGrid default h3 -- this section's
            own title is h1, so its direct children must be h2 to avoid
            skipping a level (axe's heading-order rule). */}
        <FeatureGrid items={CURRICULUM} headingLevel="h2" />
      </ContentSection>
      <ContentSection
        eyebrow="Practice"
        title="AI conversation practice and spaced repetition"
        tone="royal"
        visual={<ConversationMockup />}
      >
        <FeatureGrid items={PRACTICE} tone="royal" />
      </ContentSection>
      <ContentSection
        eyebrow="Stay motivated"
        title="Gamification that respects your time"
        visual={<GamificationMockup />}
      >
        <FeatureGrid items={SOCIAL} />
      </ContentSection>
      <ContentSection eyebrow="Why Alphonso" title="Not another flashcard app">
        <div className="grid gap-8 sm:grid-cols-3">
          {DIFFERENTIATORS.map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{item.description}</p>
            </div>
          ))}
        </div>
      </ContentSection>
    </main>
  );
}
