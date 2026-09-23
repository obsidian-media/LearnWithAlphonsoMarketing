# Marketing site: content refresh + liveliness pass

**Date:** 2026-09-23
**Status:** Approved

## Why

The site (`docs/superpowers/specs/2026-09-20-marketing-site-design.md`, last
content commit 2026-09-21 02:32) predates most of the Learn with Alphonso
app's `V4` milestone (`CHANGELOG.md` in the `LearnWithAlphonso` repo). Two
concrete facts are now wrong, three shipped features are invisible on the
site, and one persona (Hector) has no visual presence here at all. Separately,
the user asked for the site to feel more alive and welcoming using
Framer Motion, building on the motion system the 2026-09-20 pass already
established.

Source of truth for "what actually shipped": `LearnWithAlphonso/CHANGELOG.md`
(V4 section) and `LearnWithAlphonso/docs/BACKLOG.md` §1.2, which explicitly
flags this site's "coming soon on iOS" copy as inaccurate and names what a
follow-up content pass should cover.

## Scope

### 1. Fact corrections (no new UI)

- `components/home/StatsBand.tsx`: Spanish lesson count 125 → 508 (per
  `LearnWithAlphonso/LESSON_ASSETS.md`, verified 2026-09-22). Total lessons
  1,159 → 1,542. Update the stale code comment alongside the number.
- `app/features/page.tsx` (`CURRICULUM` copy) and `app/about/page.tsx`: same
  508-lesson correction wherever the old figure is restated.
- iOS availability copy: replace generic "Coming soon" with "In TestFlight
  beta" framing in `components/home/Hero.tsx` and `app/download/page.tsx`.
  This is a direct, named fix from `LearnWithAlphonso/docs/BACKLOG.md` §1.2.

### 2. New section: Teams, Challenges & Season Ladder

Not represented anywhere on the site today. Add:

- A `SOCIAL` entry (or short 3-card follow-up set) on `app/features/page.tsx`
  covering: persistent Teams (weekly XP leaderboard), Challenges (weekly solo
  goals + stranger duel matchmaking), and the Season Ladder (weekly
  promotion/demotion divisions). Reuses `FeatureGrid`/`ContentSection` — no
  new layout primitives needed.
- Two new icons in `components/shared/icons.tsx` (Teams, Duel/Swords),
  matching the existing 2.6 stroke-weight convention.
- A new `CompeteMockup` component (sibling to `GamificationMockup`,
  `ConversationMockup`, same `PhoneFrame` shell) depicting a duel
  face-off or season-division card, used as the section's `visual`.
- Copy stays limited to real, shipped mechanics — no invented numbers (e.g.
  no fake "10,000 teams competing" claims).

### 3. Hector's debut

Hector currently exists only as a 699×671 photoreal portrait
(`LearnWithAlphonso/ios/LearnWithAlphonso/Sources/Assets.xcassets/Hector.imageset/Hector.png`),
no transparent cutout, different art style than Alphonso's flat-vector look.
That mismatch is already how the app itself presents him (in-app chat
avatar), so we lean into it rather than trying to force stylistic parity:

- Copy `Hector.png` into `public/mascot/hector-portrait.png`.
- Frame him in a rounded-card portrait treatment (not a floating cutout like
  `MascotFloat`) — a new small presentational component or inline `Image` +
  card wrapper.
- Placement: the Pricing page's "Hector Pro" card (`app/pricing/page.tsx`)
  and the About page's story section (`app/about/page.tsx`), explicitly
  introducing him as the Pro AI tutor persona, distinct from Alphonso.

### 4. TestFlight beta link

Public link: `https://testflight.apple.com/join/awk9cvNQ`.

- Add a secondary `CTAButton` (`variant="secondary"`, `external`) reading
  "Join the TestFlight beta" next to the existing `WaitlistForm` on
  `app/download/page.tsx`. The waitlist stays as the primary path — the
  TestFlight button is additive, not a replacement, so the team keeps email
  capture for everyone who isn't ready to install a beta build.

### 5. Liveliness / Framer Motion pass

Extend the existing motion system (`Hero`'s ambient glow, `MascotFloat`'s
float loop, `FeatureGrid`'s staggered tilt-cards, `ContentSection`'s
scroll-reveal) rather than replacing it, and keep its established
accessibility rule: **never animate text opacity** (y/scale-only, per the
comments in `ContentSection.tsx` and `FeatureGrid.tsx` — a mid-fade or
pre-`whileInView` snapshot reads as a real contrast failure to axe). New
work:

- Hover/tap physicality on the new Teams/Duels cards (reuses `FeatureGrid`'s
  existing hover pattern — no new pattern needed).
- A small motion moment in `CompeteMockup` (e.g. two avatars sliding toward
  each other for a duel face-off).
- Hector's portrait gets its own entrance animation on the Pricing/About
  pages, paired with (not identical to) Alphonso's existing `MascotFloat`
  treatment, so the two read as companion pieces.
- `StatsBand`'s `AnimatedCounter` already counts up on scroll-into-view —
  no change needed there beyond the corrected numbers.

### Out of scope

- Android status copy (no Android app exists; nothing accurate to say yet).
- Fabricated social proof (testimonials, install counts) — explicitly
  flagged as must-not-fabricate in the original 2026-09-21 handoff prompt
  (`LearnWithAlphonso/docs/BACKLOG.md` §1.2) and still true.
- Real push notifications, content-authoring tooling, placement-test
  internals — not user-facing marketing claims.
- Redesigning pages that aren't affected by the above (no layout rework).

## Testing

- Update existing component tests for changed copy/numbers
  (`StatsBand.test.tsx`, `Hero.test.tsx`, `about/page.test.tsx`,
  `features/page.test.tsx`, `download/page.test.tsx`).
- Add a test for the new Teams/Duels feature grid entries and for the new
  Hector portrait component.
- `npm test` (vitest) and `npm run test:e2e` (Playwright, includes the
  axe accessibility sweep in `e2e/site.spec.ts`) both green before done.
