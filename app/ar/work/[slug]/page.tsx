import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages } from "../../../../lib/i18n/messages";
import { getProjectBySlug } from "../../../../lib/i18n/projects";
import { buildPageMetadata } from "../../../../lib/seo-config";
import { projects } from "../../../data/projects";
import ProjectPageView from "../../../work/ProjectPageView";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "ar");
  if (!project) {
    return {};
  }
  const m = getMessages("ar").meta;

  return buildPageMetadata({
    title: m.projectTitle(project.title),
    description: m.projectDescription(project.summary, project.context),
    path: `/ar/work/${slug}`,
    locale: "ar",
    keywords: [
      project.title,
      project.context,
      project.slug,
      "دراسة حالة",
      "مطور مواقع",
    ],
    ogTitle: m.projectOg(project.title),
    ogType: "article",
  });
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArabicProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  if (!projects.some((p) => p.slug === slug)) {
    notFound();
  }

  return <ProjectPageView slug={slug} locale="ar" />;
}
