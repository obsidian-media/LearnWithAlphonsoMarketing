import type { MetadataRoute } from "next";

const BASE_URL = "https://discover.alphonsoecosystem.app";
const ROUTES = [
  "",
  "/features",
  "/pricing",
  "/download",
  "/about",
  "/blog",
  "/blog/how-spaced-repetition-works",
  "/blog/cefr-levels-explained",
  "/compare/duolingo-alternative",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
