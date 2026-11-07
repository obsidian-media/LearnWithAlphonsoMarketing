import { APP_FACTS } from "./app-facts.generated";

/**
 * Every image the site uses, in one place.
 * - rooms, alphonso.webp, hector.webp: synced from the app by scripts/sync-app.ts (public/art/).
 * - poses: owner-approved renders from the design kit (the app animates its own; it has no pose files).
 * - screens: the web app's lesson flow from visual round 6, captured with a QA account.
 */
export function roomArt(id: string): string {
  if (!APP_FACTS.rooms.some((r) => r.id === id))
    throw new Error(`room "${id}" is not in the app's room map`);
  return `/art/rooms/${id}.webp`;
}

export const ART = {
  alphonso: "/art/alphonso.webp",
  hector: "/art/hector.webp",
  pose: {
    happy: "/art/poses/al-happy.webp",
    talk: "/art/poses/al-talk.webp",
    wow: "/art/poses/al-wow.webp",
    hmm: "/art/poses/al-hmm.webp",
    hectorHappy: "/art/poses/he-happy.webp",
  },
} as const;

/** Lesson screenshots, with what each shows for screen readers. */
export const SCREENS = {
  listening: { src: "/screens/lesson-listening.webp", alt: "A listening question in a lesson" },
  question: {
    src: "/screens/lesson-question.webp",
    alt: "Alphonso asks a multiple-choice question in his room",
  },
  right: { src: "/screens/lesson-right.webp", alt: "The panel shown after a right answer" },
  start: { src: "/screens/lesson-start.webp", alt: "The start of a lesson in the web app" },
} as const;

/** Poses cycled through the room marquee, so Alphonso stands in every room the way he does in the app. */
export const MARQUEE_POSES = [ART.pose.happy, ART.pose.talk, ART.pose.wow, ART.pose.hmm] as const;
