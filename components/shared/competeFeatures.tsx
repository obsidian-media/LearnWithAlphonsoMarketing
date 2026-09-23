import type { FeatureItem } from "./FeatureGrid";
import { TeamsIcon, SwordsIcon, TrophyIcon } from "./icons";

// Shared between the home page's compact CompeteTeaser and the Features
// page's full Compete section -- same three real, shipped mechanics
// (LearnWithAlphonso CHANGELOG.md, V4 #7 "Deeper gamification"), just shown
// at two different sizes via FeatureGrid, so one source of truth avoids the
// copy drifting apart between the two places it appears.
export const COMPETE_FEATURES: FeatureItem[] = [
  {
    title: "Teams",
    description:
      "Join a persistent team, stack your weekly XP together, and chase the top of the team leaderboard.",
    icon: <TeamsIcon className="size-5" />,
  },
  {
    title: "Duels & weekly challenges",
    description:
      "Clear six weekly goals solo, or call out a stranger for a live duel — first to the XP target wins.",
    icon: <SwordsIcon className="size-5" />,
  },
  {
    title: "Season ladder",
    description:
      "Five weekly divisions, Bronze to Diamond cohorts. Finish at the top and you're promoted; the bottom and you're demoted.",
    icon: <TrophyIcon className="size-5" />,
  },
];
