# Marketing site: SEO/GEO, conversion, and content-accuracy refresh

**Date:** 2026-09-27
**Status:** Approved (autonomous execution authorized)

## Why

Zero conversions from the marketing site, and three concrete, verified problems
compound that:

1. **No analytics anywhere** — no way to see where visitors drop off, so
   "improve conversion" has been unmeasurable.
2. **The site lives on the raw `learnwithalphonsomarketing.vercel.app`
   subdomain** while the product itself is on `learn.alphonsoecosystem.app` —
   a domain mismatch that reads as unfinished/untrustworthy. Verified via the
   Vercel API that `discover.alphonsoecosystem.app` is **already added and
   verified** on this project (someone provisioned it ahead of time); only the
   code-side URLs need to change, no DNS work required.
3. **Content is stale again**, four days after the last refresh
   (`2026-09-23-content-refresh-and-liveliness-design.md`): lesson counts are
   wrong, a question-format list names a format that doesn't exist in the
   code, and the **Listen (podcast) feature — shipped 2026-09-24, a real
   differentiator — is entirely absent from the site**.

Separately, the account owner wants the site more SEO/GEO-friendly (discovery
via search and AI answer engines) and wants TestFlight promoted as the
primary iOS conversion path over the email waitlist. This work runs against
the Shipaton Devpost deadline (2026-09-30); phases are sequenced so the
highest-confidence, highest-impact work lands first, and Phase 6 (content
marketing) is explicitly an ongoing workstream that starts now rather than
one that finishes by the deadline — SEO content compounds over months, not
days.

## Verified facts (code, not README — the README itself was stale in one place)

- Lesson counts, from `LearnWithAlphonso/README.md`'s content table, cross-checked
  against the fact that the site was last correct at 508 Spanish/125 total: **English
  609, French 575, Spanish 583 → 1,767 total lessons, 8,886 total questions.**
- Question types, verified against `src/data/curriculum.ts`'s `Question` union
  (`"mc" | "listening" | "speak" | "translate" | "fill" | "reorder"`): **6 real
  types** — multiple choice, fill-in-the-blank, sentence reordering, listening
  comprehension, speaking practice, free-form translation. The current site
  copy ("image matching" instead of speak/translate) is wrong.
- Roleplay scenarios, verified against `src/data/scenarios.ts`: exactly **12**
  (coffee, interview, airport, doctor, smalltalk, restaurant, hotel,
  directions, apartment, returns, negotiation, debate). The site's existing
  "12 roleplay scenarios" copy is already correct — no change.
- Hector Pro pricing, verified against `ios/.../PaywallView.swift`: RevenueCat
  has no production offering configured yet (Test Store only, `packages`
  stays empty), so the site's existing "Not purchasable yet" copy is
  **already correct** — no change. (Initially assumed stale; checking the
  Swift source instead of the README avoided introducing a false claim here.)
- `discover.alphonsoecosystem.app`: confirmed via
  `list_project_domains` on the `learnwithalphonsomarketing` Vercel project —
  already present and `verified: true`.

## Scope

### Phase 0 — Domain and fact corrections (foundation, no new UI)

- Switch `metadataBase` (`app/layout.tsx`), `BASE_URL` (`app/sitemap.ts`,
  `app/robots.ts`), and the OG image reference from
  `learnwithalphonsomarketing.vercel.app` to `https://discover.alphonsoecosystem.app`.
  (Manual follow-up, out of this PR's scope: no exposed Vercel API updates a
  redirect on an *existing* project domain — add a redirect from the old
  `vercel.app` domain to the new one in the Vercel dashboard, ~2 minutes, to
  avoid duplicate-content risk. Canonical URLs from `metadataBase` cover the
  same risk in the meantime.)
- `StatsBand.tsx`: 1,542 → 1,767 total lessons; update the stale code comment.
- `features/page.tsx` `CURRICULUM`: "534 English / 500 French / 508 Spanish"
  → "609 English / 575 French / 583 Spanish".
- `features/page.tsx` question-format copy: "5 question formats: Multiple
  choice, fill-in-the-blank, image matching, listening, and sentence
  reordering" → "6 question formats: Multiple choice, fill-in-the-blank,
  sentence reordering, listening comprehension, speaking practice, and
  free-form translation."
- `about/page.tsx`: no lesson-count restatement found there beyond the shared
  facts already covered above — re-check while editing, fix if present.

### Phase 1 — Analytics instrumentation

- Add `@vercel/analytics`'s `<Analytics />` to `app/layout.tsx`.
- Add `track()` calls (from `@vercel/analytics`) on: the TestFlight button
  (download page), the waitlist form's successful submit, and the "Start
  learning free" CTA (Hero, Header, Download, Pricing, home bottom CTA) —
  named events (`testflight_click`, `waitlist_submit`, `start_learning_click`)
  so the funtnel is actually visible going forward.

### Phase 2 — TestFlight-primary conversion restructuring

Scoped narrowly to the iOS funnel — the header/footer "Start learning free"
CTA (web signup) is unchanged; it's the zero-friction default action and
isn't part of the waitlist-vs-TestFlight choice.

- `app/download/page.tsx`: TestFlight `CTAButton` becomes `variant="primary"`
  (currently `secondary-inverted`, which visually undersells it despite being
  first in DOM order). `WaitlistForm` gets a reframing line above it: "Not
  ready to install a beta? Leave your email and we'll let you know at
  launch instead." — still functional, just visually and narratively
  secondary now.
- `components/home/Hero.tsx`: replace the subtle text-badge-link ("🦙 In
  TestFlight beta on iOS") with a real secondary `CTAButton` reading "Join
  the TestFlight beta", next to the existing primary "Start learning free"
  button. This revisits the prior spec's "no third button" call — with
  TestFlight now the stated priority, a second real button earns its place.

### Phase 3 — Represent the Listen (podcast) feature

Not on the site at all today, despite being a real, shipped differentiator
(`LearnWithAlphonso/README.md`, Phase 1a–3, 2026-09-24). No fabricated
episode counts — the feature description stays qualitative, same discipline
as the Compete section's "no invented numbers" rule.

- New `components/shared/ListenMockup.tsx` (sibling to `CompeteMockup`, same
  `PhoneFrame` shell): a folder/episode list transitioning to a mini-player
  with a waveform, matching the existing mockup motion conventions (y/scale
  only, never text opacity).
- Home page: compact `ListenTeaser` section (mirrors `CompeteTeaser`'s
  shape — short copy, links to `/features#listen`), placed between
  `CompeteTeaser` and `ThemesTeaser`.
- Features page: full `ContentSection`/`FeatureGrid` entry (`id="listen"`):
  browsable folder-tree episode library; persistent mini-player that
  survives navigation and resumes across devices on the same account;
  transcripts; offline downloads on iOS.
- One new icon in `components/shared/icons.tsx` (headphones/audio-wave),
  matching the existing 2.6 stroke-weight convention.

### Phase 4 — Trust signals

- `app/download/page.tsx`: mention Sign in with Apple alongside Google as a
  sign-in option where the page currently only implies email/waitlist
  (reduces perceived signup friction — a real, shipped feature).
- `features/page.tsx` `DIFFERENTIATORS`: add a 4th card, "Your account, your
  control" — self-serve account deletion and data export, plus block &
  report on social features. Terse, no legal claims, consistent with the
  section's existing one-sentence-per-card format.

### Phase 5 — Technical SEO / GEO

- `app/layout.tsx`: `Organization` JSON-LD (name, url, logo, sameAs if any
  real social links exist — omit the field entirely if not, never a
  placeholder) + `SoftwareApplication` JSON-LD (name, applicationCategory
  "EducationalApplication", operatingSystem "iOS, Web", real offers only —
  the free tier's $0, nothing about Hector Pro since it isn't purchasable).
- New FAQ section (home page, above the closing CTA) with real Q&As and
  `FAQPage` JSON-LD:
  - Is Learn with Alphonso free?
  - What languages can I learn?
  - Is there an iOS app?
  - How is this different from Duolingo?
  - How does the spaced repetition review work?
  - Can I delete my account and data?
- `public/llms.txt`: plain-text product summary for AI crawlers — what the
  product is, the three courses, core features, pricing, links to
  features/pricing/download. Real facts only, sourced from the same
  verified numbers as the rest of this doc.
- `app/layout.tsx` `twitter` metadata: add explicit `title`, `description`,
  `images` (currently only `card` is set, so Twitter/X has nothing to render
  beyond the card type).

### Phase 6 — Content marketing (starts now, ongoing past 2026-09-30)

- `app/compare/duolingo-alternative/page.tsx`: one honest comparison page —
  factual feature-by-feature framing (bite-size lessons + AI conversation
  practice + SM-2 spaced repetition vs. Duolingo's own public positioning),
  no disparaging or unverifiable claims about Duolingo.
- `app/blog/page.tsx` (index) + two seed articles under `app/blog/[slug]/`,
  using a new shared `ArticleLayout` component (prose column, `Article`
  JSON-LD, reusable for future posts):
  - "How spaced repetition actually works" (ties to the SM-2 system —
    genuine substance available from `LearnWithAlphonso`'s own
    `src/lib/srs.ts` doc comments).
  - "CEFR levels explained: which one are you?" (informational, ties
    directly into the placement test and curriculum structure).
- Keyword-opportunity table (research deliverable, not code) via web search —
  no Ahrefs/Semrush MCP connection exists in this session, so this is
  directional rather than volume-verified. Delivered as part of the PR
  description / follow-up note, not committed to the repo.
- `app/sitemap.ts`: add `/blog`, the two post routes, and
  `/compare/duolingo-alternative`.

### Out of scope

- Fabricated numbers of any kind (episode counts, install counts,
  testimonials) — same rule as the prior spec.
- Redesigning pages/sections untouched by the above.
- Android copy (still no Android app).
- The manual Vercel-dashboard redirect noted in Phase 0 (not blocking, but
  not achievable via the available API either).
- A CMS or MDX pipeline for the blog — two seed articles as plain
  React/TSX pages is enough; revisit tooling if the content volume grows.

## Testing

- Update existing tests for changed copy/numbers: `StatsBand.test.tsx`,
  `features/page.test.tsx`, `download/page.test.tsx`, `about/page.test.tsx`
  (if it needs a fix), `Hero.test.tsx`.
- New tests: `ListenMockup`, the new Features-page Listen section, the FAQ
  component, the new differentiator card, the two blog pages and the
  comparison page (render + metadata smoke tests), analytics `track()` calls
  (mocked, asserting the right event name fires on click/submit).
- `npm test` (vitest) and `npm run test:e2e` (Playwright + axe) both green
  before considering any phase done.
