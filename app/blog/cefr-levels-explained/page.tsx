import type { Metadata } from "next";
import { ArticleLayout } from "@/components/shared/ArticleLayout";

export const metadata: Metadata = {
  title: "CEFR levels explained: which one are you?",
  description: "What A1 through C1 actually mean, and how a placement test figures out yours.",
};

export default function Page() {
  return (
    <ArticleLayout
      title="CEFR levels explained: which one are you?"
      description="What A1 through C1 actually mean, and how a placement test figures out yours."
      datePublished="2026-09-27"
    >
      <p>
        The Common European Framework of Reference for Languages (CEFR) is the scale most
        language courses — including this one — use to describe how far along a learner is. It
        runs from A1 to C2, though most everyday courses (this one included) stop building new
        content at C1, since C2 is closer to native-level nuance than a language most learners set
        out to reach.
      </p>
      <h2>The five levels this app teaches</h2>
      <p>
        <strong>A1 (Beginner):</strong> basic phrases, introductions, simple present-tense
        sentences. <strong>A2 (Elementary):</strong> everyday topics — shopping, directions,
        routines. <strong>B1 (Intermediate):</strong> handling most travel and work situations,
        expressing opinions simply. <strong>B2 (Upper Intermediate):</strong> following extended
        conversation and expressing more complex ideas fluently. <strong>C1 (Advanced):</strong>{" "}
        near-fluent, nuanced expression across abstract topics.
      </p>
      <h2>How the placement test picks your starting level</h2>
      <p>
        Rather than start everyone at lesson one, a 15-question adaptive placement test finds your
        level directly — multiple choice, listening, and written translation, the same formats the
        course itself uses, so you&apos;re never placed by a test that measures something the
        course doesn&apos;t. Speaking is deliberately left out of placement: it would require
        microphone access before you&apos;ve even seen the app, and a denial would leave the
        question unanswerable.
      </p>
    </ArticleLayout>
  );
}
