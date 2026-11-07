import { APP_FACTS } from "./app-facts.generated";

/**
 * Wording built from the app's facts. Pages use these instead of typing a count, a level range or a course
 * list (app/facts-guard.test.ts fails on a typed one).
 */
const fmt = new Intl.NumberFormat("en-US");
export const formatCount = (n: number) => fmt.format(n);

const firstLevel = APP_FACTS.levels[0];
const lastLevel = APP_FACTS.levels[APP_FACTS.levels.length - 1];
/** First to last level, e.g. for "from {LEVEL_RANGE}". */
export const LEVEL_RANGE = `${firstLevel} to ${lastLevel}`;

/** "English, French and Spanish" / "English, French or Spanish" */
export function courseList(joiner: "and" | "or" = "and"): string {
  const names = APP_FACTS.courses.map((c) => c.label);
  return names.length < 2
    ? names.join("")
    : `${names.slice(0, -1).join(", ")} ${joiner} ${names.at(-1)}`;
}

/** The course's own name in its language ("Français"), from Intl rather than a typed list. */
export function nativeName(courseId: string): string {
  const name = new Intl.DisplayNames([courseId], { type: "language" }).of(courseId) ?? courseId;
  return name.charAt(0).toLocaleUpperCase(courseId) + name.slice(1);
}

/** Notes the site adds to a course line. Facts the app has no field for; not counts. */
export const COURSE_NOTE: Partial<Record<string, string>> = { en: "American" };

export const UNITS_TOTAL = formatCount(APP_FACTS.totals.units);
export const LESSONS_TOTAL = formatCount(APP_FACTS.totals.lessons);
export const ROOMS_TOTAL = formatCount(APP_FACTS.rooms.length);
export const SCENARIOS_TOTAL = formatCount(APP_FACTS.practice.scenarios);
export const CAMPAIGNS_TOTAL = formatCount(APP_FACTS.practice.campaigns);

/** "Sprout to Summit" */
export const LEAGUE_RANGE = `${APP_FACTS.leagues[0]!.label} to ${APP_FACTS.leagues[APP_FACTS.leagues.length - 1]!.label}`;

export function roomName(id: string): string {
  const room = APP_FACTS.rooms.find((r) => r.id === id);
  if (!room) throw new Error(`room "${id}" is not in the app's room map`);
  return room.name;
}

export { APP_FACTS };
