"use client";

import type { Project } from "../../data/projects";
import ProjectCard from "./ProjectCard";

type ProjectShowcaseProps = {
  projects: Project[];
  /** Absolute case numbers from the full portfolio list */
  caseNumbers?: number[];
};

/**
 * Homepage featured work — asymmetric editorial rhythm, not a repeated grid.
 */
export default function ProjectShowcase({
  projects,
  caseNumbers,
}: ProjectShowcaseProps) {
  if (projects.length === 0) return null;

  const [featured, ...rest] = projects;

  return (
    <div className="project-showcase">
      <ProjectCard
        project={featured}
        index={(caseNumbers?.[0] ?? 1) - 1}
        variant="featured"
      />

      {rest.length > 0 ? (
        <div className="project-showcase-rail">
          {rest.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={(caseNumbers?.[i + 1] ?? i + 2) - 1}
              variant="standard"
            />
          ))}
        </div>
      ) : null}

      <div className="project-showcase-footer">
        <p className="project-showcase-footer-copy">
          Each build is treated as a crafted digital product — not a template.
        </p>
      </div>
    </div>
  );
}
