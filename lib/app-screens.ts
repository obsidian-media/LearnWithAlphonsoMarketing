// Real app screenshots and the demo video. The owner supplies these files; until an
// entry is added the home page shows nothing in their place (no placeholder boxes,
// no mockups passed off as the app).
//
// To publish one: drop the file in public/screens/, then add an entry below.
// Shot list (phone frame, light mode, demo account, no personal data):
//   1. Level test result   2. A lesson mid-question   3. Review card (saved word)
//   4. Hector conversation 5. League or streak
// Video: ~20 s, captions on, no voiceover. public/screens/demo.mp4 plus a poster image.

export type AppScreen = {
  /** Path under public/, e.g. "/screens/level-test.png". */
  src: string;
  width: number;
  height: number;
  /** Describes what the screenshot actually shows, for screen readers. */
  alt: string;
  caption: string;
};

export type DemoVideo = {
  src: string;
  poster: string;
  /** WebVTT captions file, e.g. "/screens/demo.vtt". */
  captions: string;
  caption: string;
};

export const APP_SCREENS: AppScreen[] = [];

export const DEMO_VIDEO: DemoVideo | null = null;
