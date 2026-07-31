import type { Metadata } from "next";
import LinksExperience from "../components/links/LinksExperience";
import type { ShowcaseItem } from "../components/links/LinksShowcase";
import { projects } from "../data/projects";
import { SEO_PERSON, buildPageMetadata } from "../../lib/seo-config";

const SHOWCASE_SLUGS = [
  "nanas-biets",
  "99cafe",
  "nawal-omar-yoga",
  "interior-landscape-elegance",
  "od-architects",
  "bashar-hroub",
] as const;

const TECH_BY_SLUG: Record<string, string> = {
  "nanas-biets": "Next.js · Commerce UX",
  "99cafe": "React · Brand System",
  "nawal-omar-yoga": "Next.js · Bilingual",
  "interior-landscape-elegance": "Next.js · Editorial",
  "od-architects": "Next.js · Studio Site",
  "bashar-hroub": "React · Vite · Motion",
};

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: SEO_PERSON.nameEn,
    description:
      "Mohammad Hroub digital identity — portfolio, selected work, Instagram, WhatsApp, and email. Creative developer building premium digital experiences.",
    path: "/links",
    keywords: [
      "Mohammad Hroub links",
      "contact Mohammad Hroub",
      "hire creative developer",
      "portfolio links",
    ],
    ogTitle: SEO_PERSON.nameEn,
  }),
  title: { absolute: SEO_PERSON.nameEn },
};

export default function LinksPage() {
  const showcase: ShowcaseItem[] = [];

  for (const slug of SHOWCASE_SLUGS) {
    const project = projects.find((p) => p.slug === slug);
    if (!project?.image) continue;
    showcase.push({
      slug: project.slug,
      title: project.title,
      context: project.context,
      summary: project.summary,
      image: project.image,
      tech: TECH_BY_SLUG[slug] ?? "Web · Product",
      href: project.url ?? `/work/${project.slug}`,
      external: Boolean(project.url),
    });
  }

  return <LinksExperience projects={showcase} />;
}
