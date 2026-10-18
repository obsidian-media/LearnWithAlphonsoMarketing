// app/claims-guard.test.ts
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";

/**
 * Truth guard. Since 2026-10-18 the site offers the iPhone beta through ONE
 * TestFlight public link (the "Other" group, so the TestFlight counts show
 * which visitors came from this site). The other group links belong to
 * Reddit posts and must never appear here, and nothing may promise Alphonso
 * Pro or a price while the Paid Apps Agreement is not Active. Scans every
 * shipped source file, not one page, because the same claims lived in Hero,
 * FAQ, About, compare pages and llms.txt.
 */
const ROOT = process.cwd();
const SCAN = ["app", "components", "lib", "public/llms.txt"];
const EXT = /\.(tsx?|mdx?|txt)$/;

function files(rel: string): string[] {
  const abs = path.join(ROOT, rel);
  if (statSync(abs).isFile()) return [rel];
  return readdirSync(abs).flatMap((name) => {
    const child = path.join(rel, name);
    if (statSync(path.join(ROOT, child)).isDirectory()) return files(child);
    return EXT.test(name) && !/\.test\.tsx?$/.test(name) ? [child] : [];
  });
}

const SOURCES = SCAN.flatMap(files).map((f) => ({
  file: f,
  text: readFileSync(path.join(ROOT, f), "utf8"),
}));

const BETA_LINK = "https://testflight.apple.com/join/AVAgvB3y";

const BANNED: { label: string; re: RegExp }[] = [
  {
    label: "a TestFlight link other than the approved site group",
    re: /testflight\.apple\.com\/join\/(?!AVAgvB3y\b)/i,
  },
  { label: "a TestFlight link with query tracking", re: /testflight\.apple\.com\/join\/\w+\?/i },
  // Delete the Pro and price entries once the Paid Apps Agreement is Active
  // and the owner approves purchase copy.
  { label: "Pro mentioned (not purchasable yet)", re: /\bPro\b/ },
  { label: "the Alphonso Pro price", re: /\$\s?9\.99/ },
  { label: "a web sign-up link without attribution (use START_LEARNING_URL)", re: /learn\.alphonsoecosystem\.app\/auth(?!\?utm_source=site)/ },
  // Competitor facts are unsourced and go stale: no prices, language counts or tier gating.
  {
    label: "an unsourced competitor price or language count",
    re: /~\s?\$\s?\d|\b\d+\+? languages\b|\(\d+\+ languages\)|Premium Plus|Super subscription/,
  },
  { label: "No sign-up needed", re: /no sign-?up (needed|required)/i },
  { label: "Duolingo comparison claim", re: /different from Duolingo/i },
  // Re-derived from the app's curriculum on 2026-10-18: 609 EN / 611 FR / 610 ES.
  { label: "stale lesson count", re: /\b1,?767\b/ },
  { label: "stale per-language counts", re: /\b(575|583)\b/ },
  { label: "stale English-only title", re: /English that actually sticks/i },
  { label: "Pro tier coming", re: /Pro tier coming/i },
  { label: "Hector coming soon", re: /Hector[^.]{0,120}coming soon|coming soon[^.]{0,120}Hector/i },
  { label: "old product name", re: /Hector Pro/ },
  { label: "stale league tier names", re: /\b(Bronze|Silver|Sapphire|Ruby|Diamond)\b/i },
  { label: "overclaimed question formats", re: /every question type|\b(6|six) (question )?(formats|types)\b|sentence reordering|\breorder/i },
  { label: "stale theme count", re: /\b(three|3) themes\b/i },
  { label: "stale heart regen wording", re: /hearts that regenerate/i },
];

describe("pre-launch claims guard", () => {
  it("scans a non-trivial number of files", () => {
    expect(SOURCES.length).toBeGreaterThan(20);
  });

  it("links the iPhone beta somewhere, and only to the approved group", () => {
    const hits = SOURCES.filter(({ text }) => text.includes(BETA_LINK)).map(({ file }) => file);
    expect(hits.length).toBeGreaterThan(0);
  });

  it.each(BANNED)("no shipped file contains: $label", ({ re }) => {
    const hits = SOURCES.filter(({ text }) => re.test(text)).map(({ file }) => file);
    expect(hits).toEqual([]);
  });
});
