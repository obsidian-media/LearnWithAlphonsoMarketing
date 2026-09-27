import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides on language learning, spaced repetition, and the CEFR scale.",
};

const POSTS = [
  {
    slug: "best-language-learning-apps-2026",
    title: "Best language learning apps in 2026: how to actually choose",
    description:
      "Duolingo, Babbel, Busuu, or an AI conversation app — a practical way to pick based on what actually helps a language stick.",
  },
  {
    slug: "best-way-to-learn-spanish-online",
    title: "The best way to learn Spanish online in 2026",
    description:
      "Why Latin American Spanish, real listening practice, and AI conversation matter more than another vocabulary list.",
  },
  {
    slug: "ai-conversation-practice-vs-multiple-choice",
    title: "AI conversation practice: why talking beats multiple choice",
    description:
      "Recognizing the right answer in a list and producing language yourself are different skills.",
  },
  {
    slug: "how-spaced-repetition-works",
    title: "How spaced repetition actually works",
    description: "The algorithm behind why review timing matters more than review frequency.",
  },
  {
    slug: "cefr-levels-explained",
    title: "CEFR levels explained: which one are you?",
    description: "What A1 through C1 actually mean, and how a placement test figures out yours.",
  },
];

export default function BlogIndexPage() {
  return (
    <main className="bg-cream px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl font-semibold text-ink">Blog</h1>
        <ul className="mt-10 space-y-8">
          {POSTS.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="font-display text-2xl font-semibold text-ink hover:text-coral"
              >
                {post.title}
              </Link>
              <p className="mt-1 text-sm text-ink-soft">{post.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
