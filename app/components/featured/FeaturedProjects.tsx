"use client";

import Link from "next/link";
import type { Project } from "../../data/projects";
import FeaturedProjectCard from "./FeaturedProjectCard";

type FeaturedProjectsProps = {
  projects: Project[];
};

/**
 * Homepage curated showcase — five tiles, narrower frames so covers fill.
 * Full portfolio lives on /work.
 */
export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const items = projects.slice(0, 5);
  if (items.length === 0) return null;

  return (
    <div className="featured-projects">
      <div className="featured-projects-stage">
        {items.map((project, index) => (
          <FeaturedProjectCard
            key={project.slug}
            project={project}
            index={index}
            lead={index === 0}
          />
        ))}
      </div>

      <div className="featured-projects-footer">
        <p className="featured-projects-note">
          A curated selection of recent work — customer-facing sites, and the
          systems running behind some of them.
        </p>
        <Link href="/work" className="hero-btn featured-projects-all" data-cursor>
          View all projects
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
