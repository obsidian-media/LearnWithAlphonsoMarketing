import type { Metadata } from "next";
import Image from "next/image";
import { ContentSection } from "@/components/shared/ContentSection";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Alphonso and Learn with Alphonso.",
};

export default function AboutPage() {
  return (
    <main>
      <ContentSection eyebrow="Our story" title="Meet Alphonso">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <Image
            src="/mascot/alphonso-icon.png"
            alt="Alphonso the llama"
            width={160}
            height={160}
            className="rounded-3xl"
          />
          <p className="max-w-xl text-ink-soft">
            Alphonso is a confident, sunglasses-wearing llama who believes a language sticks best
            in small, honest reps — not marathon cram sessions. Learn with Alphonso is built by{" "}
            <strong className="text-ink">Obsidian Media</strong> around that idea: bite-size
            lessons, real spaced repetition, and gamification that respects your time instead of
            manipulating it.
          </p>
        </div>
      </ContentSection>
    </main>
  );
}
