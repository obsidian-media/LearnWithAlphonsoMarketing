import type { Metadata } from "next";
import { ContentSection } from "@/components/shared/ContentSection";
import { CTAButton } from "@/components/shared/CTAButton";
import { WaitlistForm } from "@/components/download/WaitlistForm";

export const metadata: Metadata = {
  title: "Download",
  description: "Start learning on the web today, or join the waitlist for iOS.",
};

export default function DownloadPage() {
  return (
    <main>
      <ContentSection eyebrow="Get started" title="Learn on the web today">
        <p className="max-w-xl text-ink-soft">
          The web app works on any device, right now, free — no download needed.
        </p>
        <div className="mt-6">
          <CTAButton href="https://learn.alphonsoecosystem.app/auth" external>
            Start learning free
          </CTAButton>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Coming soon" title="Get notified when iOS launches" tone="royal">
        <div className="max-w-md">
          <WaitlistForm />
        </div>
      </ContentSection>
    </main>
  );
}
