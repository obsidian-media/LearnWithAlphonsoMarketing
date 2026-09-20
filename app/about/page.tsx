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
      <ContentSection eyebrow="Our story" title="Meet Alphonso" level="h1">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <div className="relative mx-auto shrink-0 sm:mx-0">
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-br from-coral/30 to-amber/20 blur-2xl"
            />
            <Image
              src="/mascot/alphonso-cutout.png"
              alt="Alphonso the llama"
              width={180}
              height={300}
              className="h-auto w-[180px]"
            />
          </div>
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
