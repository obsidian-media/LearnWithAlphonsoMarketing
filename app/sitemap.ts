import type { MetadataRoute } from "next";

const BASE_URL = "https://discover.alphonsoecosystem.app";
const ROUTES = [
  "",
  "/features",
  "/pricing",
  "/download",
  "/about",
  "/placement-test",
  "/blog",
  "/blog/how-spaced-repetition-works",
  "/blog/cefr-levels-explained",
  "/blog/best-language-learning-apps-2026",
  "/blog/best-way-to-learn-spanish-online",
  "/blog/ai-conversation-practice-vs-multiple-choice",
  "/compare/duolingo-alternative",
  "/compare/babbel-alternative",
  "/compare/busuu-alternative",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
