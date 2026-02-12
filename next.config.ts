import type { NextConfig } from "next";
import path from "path";

const projectRoot = process.cwd();

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
  webpack: (config) => {
    config.resolve = config.resolve ?? {};
    const projectNodeModules = path.join(projectRoot, "node_modules");
    config.resolve.modules = [
      projectNodeModules,
      ...(Array.isArray(config.resolve.modules) ? config.resolve.modules : ["node_modules"]),
    ];
    return config;
  },
};

export default nextConfig;
