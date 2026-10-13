import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages } from "../../../lib/i18n/messages";
import { buildPageMetadata } from "../../../lib/seo-config";
import { projects } from "../../data/projects";
import ProjectPageView from "../ProjectPageView";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return {};
  }
  const m = getMessages("en").meta;

  return buildPageMetadata({
    title: m.projectTitle(project.title),
    description: m.projectDescription(project.summary, project.context),
    path: `/work/${slug}`,
    locale: "en",
    keywords: [project.title, project.context, project.slug, "case study", "دراسة حالة"],
    ogTitle: m.projectOg(project.title),
    ogType: "article",
  });
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  if (!projects.some((p) => p.slug === slug)) {
    notFound();
  }

  return <ProjectPageView slug={slug} locale="en" />;
}
