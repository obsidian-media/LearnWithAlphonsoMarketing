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

Not represented anywhere on the site today. Two placements, not one — the
original design conversation covered both and the first draft of this spec
silently dropped the home-page half:

- **Home page** (`app/page.tsx`): a compact `CompeteTeaser` section between
  `StatsBand` and `ThemesTeaser` — three short cards (Teams / Challenges &
  Duels / Season Ladder), no mockup, links out to `/features#compete` for
  detail. Keeps the homepage scannable rather than duplicating the full grid.
- **Features page** (`app/features/page.tsx`): a full `SOCIAL`-style 3-item
  `FeatureGrid` entry (`id="compete"`) covering: persistent Teams (weekly XP
  leaderboard), Challenges (weekly solo goals + stranger duel matchmaking),
  and the Season Ladder (weekly promotion/demotion divisions).
- Two new icons in `components/shared/icons.tsx` — a Teams icon and a
  Duel/Swords icon — matching the existing 2.6 stroke-weight convention.
  **Teams must be visually distinct from the existing `UsersIcon`** (already
  used for the "Friends" feature elsewhere on this same page): a
  multi-person-under-one-roof/banner shape, not another two-circle pair, so
  the two social features don't read as the same icon reused.
- A new `CompeteMockup` component (sibling to `GamificationMockup`,
  `ConversationMockup`, same `PhoneFrame` shell) depicting a duel face-off,
  used as the Features-page section's `visual`.
- Copy stays limited to real, shipped mechanics — no invented numbers (e.g.
  no fake "10,000 teams competing" claims).

### 3. Hector's debut

Hector currently exists only as a 699×671 photoreal portrait
(`LearnWithAlphonso/ios/LearnWithAlphonso/Sources/Assets.xcassets/Hector.imageset/Hector.png`),
no transparent cutout, different art style than Alphonso's flat-vector look.
That mismatch is already how the app itself presents him (in-app chat
avatar), so we lean into it rather than trying to force stylistic parity:

- Copy `Hector.png` into `public/mascot/hector-portrait.png`.
- New shared component `components/shared/MascotPortraitCard.tsx` — a
  rounded-card portrait treatment (not a floating cutout like `MascotFloat`;
  used twice below, so a single component beats duplicated inline markup).
- **Pricing page** (`app/pricing/page.tsx`): inside the existing "Hector Pro"
  card, replacing empty space above the feature list.
- **About page** (`app/about/page.tsx`): NOT merged into the existing "Meet
  Alphonso" flex row (that layout is sized for one mascot + one prose block
  and Hector's different art style would clash inside it). Instead, a
  second, separate `ContentSection` block directly beneath it — "Meet
  Hector" — mirroring the first block's structure (portrait + prose) but
  its own framing: the Pro AI tutor, distinct from Alphonso the free host.

### 4. TestFlight beta link

Public link: `https://testflight.apple.com/join/awk9cvNQ`.

- Add a secondary `CTAButton` (`variant="secondary"`, `external`) reading
  "Join the TestFlight beta" next to the existing `WaitlistForm` on
  `app/download/page.tsx`. The waitlist stays as the primary path — the
  TestFlight button is additive, not a replacement, so the team keeps email
  capture for everyone who isn't ready to install a beta build.
- No new CTA on the Hero — a third button there is clutter. Instead its
  existing "🦙 Coming soon on iOS" badge (currently a plain `<span>`,
  non-interactive) becomes a `Link` to `/download`, so the TestFlight/
  waitlist choice is one click away from the first screen without adding
  visual weight to it.

### 5. Liveliness / Framer Motion pass

Extend the existing motion system (`Hero`'s ambient glow, `MascotFloat`'s
float loop, `FeatureGrid`'s staggered tilt-cards, `ContentSection`'s
scroll-reveal) rather than replacing it, and keep its established
accessibility rule: **never animate text opacity** (y/scale-only, per the
comments in `ContentSection.tsx` and `FeatureGrid.tsx` — a mid-fade or
pre-`whileInView` snapshot reads as a real contrast failure to axe). New
work:

- Hover/tap physicality on the new Teams/Duels cards, both the home
  `CompeteTeaser` and the Features-page grid (reuses `FeatureGrid`'s
  existing hover pattern — no new pattern needed).
- A small motion moment in `CompeteMockup`: two avatars sliding toward each
  other for a duel face-off, holding on a "VS" beat.
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
