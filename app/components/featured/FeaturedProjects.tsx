"use client";

import Link from "next/link";
import type { Locale } from "../../../lib/i18n/config";
import { getMessages } from "../../../lib/i18n/messages";
import { workIndexPath } from "../../../lib/i18n/paths";
import type { Project } from "../../data/projects";
import FeaturedProjectCard from "./FeaturedProjectCard";

type FeaturedProjectsProps = {
  projects: Project[];
  locale?: Locale;
};

/**
 * Homepage curated showcase — five tiles, narrower frames so covers fill.
 * Full portfolio lives on /work.
 */
export default function FeaturedProjects({
  projects,
  locale = "en",
}: FeaturedProjectsProps) {
  const items = projects.slice(0, 5);
  const f = getMessages(locale).featured;
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
            locale={locale}
          />
        ))}
      </div>

      <div className="featured-projects-footer">
        <p className="featured-projects-note">{f.note}</p>
        <Link
          href={workIndexPath(locale)}
          className="hero-btn featured-projects-all"
          data-cursor
        >
          {f.viewAll}
          <span aria-hidden>{locale === "ar" ? "←" : "→"}</span>
        </Link>
      </div>
    </div>
  );
}
