import type { NextConfig } from "next";

const repo = process.env.GITHUB_REPOSITORY;
const isGitHubPages =
  repo && !repo.endsWith(".github.io");
const basePath = isGitHubPages ? `/${repo.split("/")[1]}` : "";
const assetPrefix = basePath ? `${basePath}/` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: assetPrefix || undefined,
  // Static export cannot use the Image Optimization API — source assets are WebP.
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
  },
  poweredByHeader: false,
  compress: true,
  devIndicators: false,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  experimental: {
    optimizePackageImports: ["gsap", "three", "firebase"],
  },
};

export default nextConfig;
