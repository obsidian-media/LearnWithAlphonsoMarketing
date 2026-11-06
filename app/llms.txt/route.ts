import {
  APP_FACTS,
  CAMPAIGNS_TOTAL,
  COURSE_NOTE,
  LEAGUE_RANGE,
  LEVEL_RANGE,
  ROOMS_TOTAL,
  SCENARIOS_TOTAL,
  courseList,
  formatCount,
} from "@/lib/facts";
import { IPHONE_BETA_URL } from "@/lib/links";
import { PRO } from "@/lib/pro-copy";

// A summary for AI crawlers, built from the same app facts as the pages, so it cannot drift from the app.
export const dynamic = "force-static";

const SITE = "https://discover.alphonsoecosystem.app";

export function GET() {
  const perCourse = APP_FACTS.courses
    .map(
      (c) =>
        `${c.label}${COURSE_NOTE[c.id] ? ` (${COURSE_NOTE[c.id]})` : ""}: ${formatCount(c.units)} units, ${formatCount(c.lessons)} lessons`,
    )
    .join("\n- ");
  const body = `# Learn With Alphonso

A language-learning app for ${courseList()}: short lessons in painted rooms, spoken practice with Alphonso the
llama, a spaced repetition review, listening episodes and leagues. Built by Obsidian Media.

## Courses
- ${perCourse}
- ${formatCount(APP_FACTS.totals.lessons)} lessons and ${formatCount(APP_FACTS.totals.questions)} questions in total, levels ${LEVEL_RANGE}
- ${ROOMS_TOTAL} painted rooms, a room for every unit topic
- A free adaptive placement test of up to ${formatCount(APP_FACTS.placement.maxQuestions)} questions

## Practice
- ${SCENARIOS_TOTAL} scenarios and ${CAMPAIGNS_TOTAL} story campaigns with Alphonso, by voice or text; AI features need the learner's consent
- Spaced repetition review of missed words
- Weekly leagues from ${LEAGUE_RANGE}, teams and duels

## Platforms
- Web app: free, works in any browser: https://learn.alphonsoecosystem.app
- iPhone: free public beta through TestFlight: ${IPHONE_BETA_URL}
- Android: planned

## Pricing
- Free: every course, the placement test, the review, Practice with Alphonso, listening and leagues
- ${PRO.name}: Hector, an AI voice tutor that remembers you.${PRO.status ? ` ${PRO.status}.` : ""} Prices come from the store, inside the app.

## Links
- Features: ${SITE}/features
- Pricing: ${SITE}/pricing
- Download: ${SITE}/download
- About: ${SITE}/about
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
