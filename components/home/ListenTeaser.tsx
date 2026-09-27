import { ContentSection } from "../shared/ContentSection";
import { FeatureGrid } from "../shared/FeatureGrid";
import { CTAButton } from "../shared/CTAButton";
import { LISTEN_FEATURES } from "../shared/listenFeatures";

// Compact teaser: same real copy as the Features page's full Listen
// section (components/shared/listenFeatures.tsx), no phone mockup, with a
// link out to the full section. Mirrors CompeteTeaser.tsx's shape exactly.
export function ListenTeaser() {
  return (
    <ContentSection
      eyebrow="Listen"
      title="Learning that fits in your headphones"
      description="Short audio episodes with a mini-player that remembers where you left off — on the web and on iOS."
    >
      <FeatureGrid items={LISTEN_FEATURES} />
      <div className="mt-8">
        <CTAButton href="/features#listen" variant="secondary">
          See how Listen works
        </CTAButton>
      </div>
    </ContentSection>
  );
}
