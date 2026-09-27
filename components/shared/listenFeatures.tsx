import type { FeatureItem } from "./FeatureGrid";
import { HeadphonesIcon, BookIcon, DownloadIcon } from "./icons";

// Shared between the home page's compact ListenTeaser and the Features
// page's full Listen section -- same real, shipped mechanics
// (LearnWithAlphonso README, "Listen" Phase 1a-3), just shown at two
// different sizes via FeatureGrid, so copy can't drift between the two
// places it appears.
export const LISTEN_FEATURES: FeatureItem[] = [
  {
    title: "A real episode library",
    description:
      "Browse short audio episodes by folder, from real recordings and Deepgram-narrated scripts, with transcripts included.",
    icon: <HeadphonesIcon className="size-5" />,
  },
  {
    title: "A mini-player that remembers",
    description:
      "Keep listening with the screen locked, and resume exactly where you left off — even switching from web to iOS.",
    icon: <BookIcon className="size-5" />,
  },
  {
    title: "Download for offline",
    description:
      "On iOS, save episodes to listen without a connection — nothing is ever deleted without you asking.",
    icon: <DownloadIcon className="size-5" />,
  },
];
