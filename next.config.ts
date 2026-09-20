import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(import.meta.dirname),
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
