"use client";

import type { Project } from "../../data/projects";
import ProjectCard from "./ProjectCard";

type ProjectGridProps = {
  projects: Project[];
};

function isPortraitCover(project: Project) {
  if (project.coverLayout === "poster") return true;
  if (!project.image) return false;
  return project.image.height > project.image.width * 1.08;
}

function isLeadProject(project: Project) {
  return project.slug === "omino";
}

function rowTone(left: Project, right?: Project) {
  if (!right) return "archive-row archive-row--solo";
  const lp = isPortraitCover(left);
  const rp = isPortraitCover(right);
  if (lp && !rp) return "archive-row archive-row--pl";
  if (!lp && rp) return "archive-row archive-row--lp";
  return "archive-row archive-row--even";
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) return null;

  const lead = projects.find(isLeadProject);
  const rest = projects.filter((project) => !isLeadProject(project));

  const rows: Project[][] = [];
  for (let i = 0; i < rest.length; i += 2) {
    rows.push(rest.slice(i, i + 2));
  }

  return (
    <div className="project-archive">
      {lead ? (
        <div className="archive-row archive-row--lead">
          <ProjectCard
            project={lead}
            index={projects.findIndex((p) => p.slug === lead.slug)}
            variant="featured"
            className="showcase-card--poster showcase-card--lead"
          />
        </div>
      ) : null}

      {rows.map((row) => (
        <div key={row.map((p) => p.slug).join("-")} className={rowTone(row[0], row[1])}>
          {row.map((project) => {
            const index = projects.findIndex((p) => p.slug === project.slug);
            const solo = row.length === 1;
            return (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                variant={solo ? "editorial" : "standard"}
                className={isPortraitCover(project) ? "showcase-card--poster" : ""}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
