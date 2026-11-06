// app/facts-guard.test.ts
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { APP_FACTS } from "@/lib/app-facts.generated";

/**
 * No hand-typed app facts. Every count the site states about the app (rooms, units, lessons, scenarios,
 * campaigns, levels, leagues, avatars, question types...) must come from lib/app-facts.generated.ts, which
 * scripts/sync-app.ts builds from the app's own source. A number typed next to one of those nouns anywhere in
 * shipped copy fails here, whether written as digits ("35 rooms") or as a word ("twelve scenarios").
 *
 * Interpolated values are fine: `{APP_FACTS.rooms.length} rooms` has no digit in the source. The few phrases
 * that are about the world rather than the app (the CEFR scale has six levels) are listed in ALLOWED with a
 * reason; an ALLOWED entry that no longer matches anything also fails, so the list cannot rot.
 */
const ROOT = process.cwd();
const SCAN = ["app", "components", "lib"];
const EXT = /\.(tsx?|mdx?|txt)$/;

function files(rel: string): string[] {
  const abs = path.join(ROOT, rel);
  if (statSync(abs).isFile()) return [rel];
  return readdirSync(abs).flatMap((name) => {
    const child = path.join(rel, name);
    if (statSync(path.join(ROOT, child)).isDirectory()) return files(child);
    return EXT.test(name) && !/\.test\.tsx?$/.test(name) && !/\.generated\./.test(name)
      ? [child]
      : [];
  });
}

export const NUMBER =
  "(?:\\d[\\d,.]*\\+?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|hundreds?|thousands?|dozens?)";
export const NOUN =
  "(?:rooms?|units?|lessons?|scenarios?|campaigns?|stories|levels?|leagues?|tiers?|divisions?|avatars?|animals?|question (?:types|formats)|formats?|courses?|languages?|episodes?|voices?|themes?|palettes?|scenes?|questions?)";
/** A number, then at most three words ("35 painted rooms", "12 AI-guided conversation scenarios"), then a fact noun. */
export const FACT_NUMBER = new RegExp(
  `\\b${NUMBER}(?:[\\s-]+[A-Za-z][\\w']*){0,3}?[\\s-]+${NOUN}\\b`,
  "gi",
);
/** A CEFR range typed out ("A1 to C1", "A1-C1") instead of read from APP_FACTS.levels. */
export const LEVEL_RANGE = /\b[ABC][12]\s*(?:to|-|–|through)\s*[ABC][12]\b/g;

const ALLOWED: { file: string; phrase: string; why: string }[] = [
  {
    file: "app/blog/cefr-levels-explained/page.tsx",
    phrase: "A1 to C2",
    why: "the CEFR scale itself, not what the app teaches",
  },
];

const SOURCES = SCAN.flatMap(files).map((f) => ({
  file: f.split(path.sep).join("/"),
  text: readFileSync(path.join(ROOT, f), "utf8"),
}));

export function findHandTypedFacts(text: string): string[] {
  return [...text.matchAll(FACT_NUMBER), ...text.matchAll(LEVEL_RANGE)].map((m) => m[0]);
}

describe("facts guard: no hand-typed app facts", () => {
  it("scans the shipped sources", () => {
    expect(SOURCES.length).toBeGreaterThan(20);
  });

  it("no number is typed next to a fact noun, and no CEFR range is typed out", () => {
    const hits = SOURCES.flatMap(({ file, text }) =>
      findHandTypedFacts(text)
        .filter((phrase) => !ALLOWED.some((a) => a.file === file && a.phrase === phrase))
        .map((phrase) => `${file}: "${phrase}"`),
    );
    expect(hits).toEqual([]);
  });

  it("every ALLOWED entry still matches, so the list cannot go stale", () => {
    for (const a of ALLOWED) {
      const src = SOURCES.find((s) => s.file === a.file);
      expect(src && findHandTypedFacts(src.text).includes(a.phrase), `${a.file}: ${a.phrase}`).toBe(
        true,
      );
    }
  });

  it("catches the shapes it must catch (digits, words, adjectives, ranges) and leaves interpolation alone", () => {
    for (const bad of [
      "35 painted rooms",
      "1,830 lessons",
      "407 units",
      "Twelve AI-guided scenarios",
      "5 CEFR levels",
      "9 story campaigns",
      "16 profile animals",
      "A1 to C1",
      "A1-C1",
    ])
      expect(findHandTypedFacts(bad), bad).not.toEqual([]);
    for (const ok of [
      "{APP_FACTS.rooms.length} painted rooms",
      "{levelRange} levels",
      "a few minutes a day",
    ])
      expect(findHandTypedFacts(ok), ok).toEqual([]);
  });

  it("the facts module is internally consistent", () => {
    const { courses, totals } = APP_FACTS;
    expect(totals.units).toBe(courses.reduce((n, c) => n + c.units, 0));
    expect(totals.lessons).toBe(courses.reduce((n, c) => n + c.lessons, 0));
    expect(totals.courses).toBe(courses.length);
    expect(new Set(APP_FACTS.rooms.map((r) => r.id)).size).toBe(APP_FACTS.rooms.length);
  });

  it("the facts were generated from the pinned app commit", () => {
    const pin = JSON.parse(readFileSync(path.join(ROOT, "design/app-source.json"), "utf8"));
    expect(APP_FACTS.source.sha).toBe(pin.sha);
  });

  it("every room in the room map has its painting on the site", () => {
    for (const r of APP_FACTS.rooms)
      expect(statSync(path.join(ROOT, `public/art/rooms/${r.id}.webp`)).isFile()).toBe(true);
  });
});
