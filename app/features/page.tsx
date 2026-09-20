import type { Metadata } from "next";
import { ContentSection } from "@/components/shared/ContentSection";
import { FeatureGrid } from "@/components/shared/FeatureGrid";
import {
  BookIcon,
  MicIcon,
  FlameIcon,
  TrophyIcon,
  UsersIcon,
  PaletteIcon,
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
    title: "Two courses",
    description: "534 English lessons and 125 French lessons, both real, complete courses.",
    icon: <BookIcon className="size-5" />,
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
    description: "Voice-enabled roleplay across 6 real-world scenarios.",
    icon: <MicIcon className="size-5" />,
  },
  {
    title: "Spaced repetition review",
    description:
      "An SM-2-style queue resurfaces exactly what you got wrong, on a schedule built to make it stick.",
    icon: <BookIcon className="size-5" />,
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

export default function FeaturesPage() {
  return (
    <main>
      <ContentSection eyebrow="Curriculum" title="A real CEFR-leveled curriculum, not a gimmick" level="h1">
        {/* Cards are h2 here, not the FeatureGrid default h3 -- this section's
            own title is h1, so its direct children must be h2 to avoid
            skipping a level (axe's heading-order rule). */}
        <FeatureGrid items={CURRICULUM} headingLevel="h2" />
      </ContentSection>
      <ContentSection eyebrow="Practice" title="AI conversation practice and spaced repetition" tone="royal">
        <FeatureGrid items={PRACTICE} />
      </ContentSection>
      <ContentSection eyebrow="Stay motivated" title="Gamification that respects your time">
        <FeatureGrid items={SOCIAL} />
      </ContentSection>
    </main>
  );
}
