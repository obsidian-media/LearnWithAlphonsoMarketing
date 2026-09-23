import { ContentSection } from "../shared/ContentSection";
import { FeatureGrid } from "../shared/FeatureGrid";
import { CTAButton } from "../shared/CTAButton";
import { COMPETE_FEATURES } from "../shared/competeFeatures";

// Compact teaser: same real copy as the Features page's full Compete
// section (components/shared/competeFeatures.tsx), no phone mockup, with a
// link out to the full section for anyone who wants the detail. Mirrors
// HowItWorks.tsx's shape -- a thin ContentSection + FeatureGrid wrapper.
export function CompeteTeaser() {
  return (
    <ContentSection
      eyebrow="Compete"
      title="You're never learning alone"
      description="Team up, duel a stranger, or climb the season ladder — all built on the same XP you're already earning."
    >
      <FeatureGrid items={COMPETE_FEATURES} />
      <div className="mt-8">
        <CTAButton href="/features#compete" variant="secondary">
          See all the ways to compete
        </CTAButton>
      </div>
    </ContentSection>
  );
}
