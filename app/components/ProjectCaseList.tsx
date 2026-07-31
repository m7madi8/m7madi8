"use client";

import { ProjectGrid } from "./showcase";
import type { Project } from "../data/projects";

type ProjectCaseListProps = {
  projects: Project[];
};

export default function ProjectCaseList({ projects }: ProjectCaseListProps) {
  return <ProjectGrid projects={projects} />;
}
