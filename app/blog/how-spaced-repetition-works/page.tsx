import type { Metadata } from "next";
import { ArticleLayout } from "@/components/shared/ArticleLayout";

export const metadata: Metadata = {
  title: "How spaced repetition actually works",
  description: "The algorithm behind why review timing matters more than review frequency.",
};

export default function Page() {
  return (
    <ArticleLayout
      title="How spaced repetition actually works"
      description="The algorithm behind why review timing matters more than review frequency."
      datePublished="2026-09-27"
    >
      <p>
        Cramming a word ten times in one sitting feels productive, but it barely changes how long
        you&apos;ll remember it. Spaced repetition works differently: it shows you a word again
        right before you&apos;re about to forget it, not on a fixed daily schedule. Each correct
        recall pushes the next review further out; each mistake pulls it back in.
      </p>
      <h2>Why timing beats frequency</h2>
      <p>
        Memory research calls this the spacing effect — recalling something just as it&apos;s
        fading strengthens it far more than recalling it while it&apos;s still fresh. A fixed
        schedule (say, review every word daily) wastes time on things you already know cold, and
        under-reviews the handful of items that are actually at risk.
      </p>
      <h2>How Learn with Alphonso schedules reviews</h2>
      <p>
        The app uses an SM-2-style algorithm with two deliberate differences from the textbook
        version: a wrong answer halves your progress on that item instead of resetting it to
        zero, so one slip doesn&apos;t erase weeks of earned spacing. And a correct answer on an
        item you were overdue to review gets a small bonus to its next interval, rewarding the
        fact that you still remembered it well past when you were expected to forget it.
      </p>
      <p>
        In practice, that means the review queue you see on the Learn tab is never busywork —
        every item in it is there because the algorithm has calculated you&apos;re at real risk of
        forgetting it right now.
      </p>
    </ArticleLayout>
  );
}
