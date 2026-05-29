/** Matches basePath logic in next.config.ts (GitHub Pages project sites). */
export function getBasePath(): string {
  const repo = process.env.GITHUB_REPOSITORY;
  const isGitHubPages = repo && !repo.endsWith(".github.io");
  return isGitHubPages ? `/${repo.split("/")[1]}` : "";
}

export function withBasePath(path: string): string {
  const base = getBasePath();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!base) return normalized;
  return `${base}${normalized}`;
}
