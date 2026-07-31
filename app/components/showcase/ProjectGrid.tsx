"use client";

import type { Project } from "../../data/projects";
import ProjectCard from "./ProjectCard";

type ProjectGridProps = {
  projects: Project[];
};

/**
 * Full portfolio — editorial alternating rows + compact rhythm for the rest.
 * Avoids a flat repeated card grid.
 */
export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) return null;

  const lead = projects.slice(0, 4);
  const rest = projects.slice(4);

  return (
    <div className="project-grid-editorial">
      <div className="project-grid-lead">
        {lead.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            variant="editorial"
            reverse={index % 2 === 1}
          />
        ))}
      </div>

      {rest.length > 0 ? (
        <div className="project-grid-secondary">
          <div className="project-grid-secondary-label">
            <span className="eyebrow">More work</span>
            <div className="project-grid-secondary-rule" aria-hidden />
          </div>
          <div className="project-grid-secondary-list">
            {rest.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={lead.length + index}
                variant="compact"
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
