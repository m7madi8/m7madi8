"use client";

import type { Locale } from "../../lib/i18n/config";
import { ProjectGrid } from "./showcase";
import type { Project } from "../data/projects";

type ProjectCaseListProps = {
  projects: Project[];
  locale?: Locale;
};

export default function ProjectCaseList({
  projects,
  locale = "en",
}: ProjectCaseListProps) {
  return <ProjectGrid projects={projects} locale={locale} />;
}
