import { ContentSection } from "../shared/ContentSection";
import { FeatureGrid } from "../shared/FeatureGrid";
import { BookIcon, MicIcon, FlameIcon, TrophyIcon } from "../shared/icons";

const STEPS = [
  {
    title: "Take the placement test",
    description: "15 adaptive questions place you at the right CEFR level from day one.",
    icon: <TrophyIcon className="size-5" />,
  },
  {
    title: "Learn in bite-size lessons",
    description: "5-minute reps in English, French, or the newly-launched Spanish course, A1 through C1.",
    icon: <BookIcon className="size-5" />,
  },
  {
    title: "Review with spaced repetition",
    description: "Missed items resurface on a schedule tuned to help them actually stick.",
    icon: <MicIcon className="size-5" />,
  },
  {
    title: "Keep your streak alive",
    description: "Hearts, streak freezes, and weekly leagues make consistency feel good.",
    icon: <FlameIcon className="size-5" />,
  },
];

export function HowItWorks() {
  return (
    <ContentSection eyebrow="How it works" title="From placement test to fluency, step by step">
      <FeatureGrid items={STEPS} />
    </ContentSection>
  );
}
