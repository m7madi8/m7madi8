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
  images: { unoptimized: true },
  devIndicators: false,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

export default nextConfig;
