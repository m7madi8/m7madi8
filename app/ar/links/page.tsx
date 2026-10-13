import type { Metadata } from "next";
import LinksExperience from "../../components/links/LinksExperience";
import type { ShowcaseItem } from "../../components/links/LinksShowcase";
import { projects } from "../../data/projects";
import { getMessages } from "../../../lib/i18n/messages";
import { workProjectPath } from "../../../lib/i18n/paths";
import { buildPageMetadata } from "../../../lib/seo-config";

const SHOWCASE_SLUGS = [
  "omino",
  "nanas-biets",
  "99cafe",
  "nawal-omar-yoga",
  "interior-landscape-elegance",
  "od-architects",
] as const;

const TECH_BY_SLUG: Record<string, string> = {
  omino: "Product · Intelligence",
  "nanas-biets": "Next.js · Commerce UX",
  "99cafe": "React · Brand System",
  "nawal-omar-yoga": "Next.js · Bilingual",
  "interior-landscape-elegance": "Next.js · Editorial",
  "od-architects": "Next.js · Studio Site",
};

const m = getMessages("ar").meta;

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: m.linksTitle,
    description: m.linksDescription,
    path: "/ar/links",
    locale: "ar",
    keywords: [
      "روابط محمد حروب",
      "تواصل مطور ويب",
      "معرض أعمال",
    ],
    ogTitle: m.linksOg,
  }),
  title: { absolute: m.linksTitle },
};

export default function ArabicLinksPage() {
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
      href: project.url ?? workProjectPath(project.slug, "ar"),
      external: Boolean(project.url),
      coverLayout: project.coverLayout,
    });
  }

  return <LinksExperience projects={showcase} locale="ar" />;
}
