import type { MetadataRoute } from "next";

const BASE_URL = "https://learnwithalphonsomarketing.vercel.app";
const ROUTES = ["", "/features", "/pricing", "/download", "/about"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
