import type { Project } from "../../app/data/projects";
import { projects } from "../../app/data/projects";
import type { Locale } from "./config";
import { PROJECT_OVERLAYS_AR } from "./project-overlays-ar";

export function localizeProject(project: Project, locale: Locale): Project {
  if (locale === "en") return project;
  const overlay = PROJECT_OVERLAYS_AR[project.slug];
  if (!overlay) return project;

  return {
    ...project,
    context: overlay.context,
    summary: overlay.summary,
    goal: overlay.goal,
    build: overlay.build,
    work: overlay.work,
    result: overlay.result,
    overview: overlay.overview,
    category: overlay.category ?? project.category,
    galleryTitle: overlay.galleryTitle ?? project.galleryTitle,
    galleryDescription:
      overlay.galleryDescription ?? project.galleryDescription,
    figureNote: overlay.figureNote ?? project.figureNote,
  };
}

export function getProjects(locale: Locale): Project[] {
  return projects.map((p) => localizeProject(p, locale));
}

export function getProjectBySlug(
  slug: string,
  locale: Locale
): Project | undefined {
  const base = projects.find((p) => p.slug === slug);
  return base ? localizeProject(base, locale) : undefined;
}

export function projectStatusLabel(
  project: Project,
  locale: Locale
): string {
  if (locale === "ar") {
    if (project.status === "launching") return "قريباً";
    if (project.status === "coming-soon") return "قيد التطوير";
    return "مباشر";
  }
  if (project.status === "launching") return "Launching";
  if (project.status === "coming-soon") return "In development";
  return "Live";
}
