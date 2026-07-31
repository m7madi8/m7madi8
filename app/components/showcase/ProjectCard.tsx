"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECT_SHOWCASE_META } from "../../data/project-showcase-meta";
import { isComingSoon, type Project } from "../../data/projects";
import ProjectHoverEffect from "./ProjectHoverEffect";

export type ProjectCardVariant = "featured" | "standard" | "editorial" | "compact";

type ProjectCardProps = {
  project: Project;
  index?: number;
  variant?: ProjectCardVariant;
  /** Editorial rows alternate image side */
  reverse?: boolean;
  className?: string;
};

export default function ProjectCard({
  project,
  index = 0,
  variant = "standard",
  reverse = false,
  className = "",
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const comingSoon = isComingSoon(project);
  const meta = PROJECT_SHOWCASE_META[project.slug];
  const category = project.category ?? meta?.category ?? project.context;
  const stack = project.stack ?? meta?.stack ?? [];
  const caseNumber = String(index + 1).padStart(2, "0");
  const href = `/work/${project.slug}`;

  const sizes =
    variant === "featured"
      ? "(max-width: 1024px) 100vw, 70vw"
      : variant === "editorial"
        ? "(max-width: 1024px) 100vw, 55vw"
        : "(max-width: 1024px) 100vw, 40vw";

  return (
    <motion.article
      id={project.slug}
      className={`showcase-card showcase-card--${variant} ${reverse ? "showcase-card--reverse" : ""} ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.06, 0.24) }}
    >
      <ProjectHoverEffect
        className="showcase-card-hover"
        intensity={variant === "featured" ? 5 : 7}
      >
        <Link href={href} className="showcase-card-media" data-cursor aria-label={`${project.title} case study`}>
          <div className="showcase-card-frame">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                className="showcase-card-img object-cover"
                sizes={sizes}
                loading={variant === "featured" && index === 0 ? "eager" : "lazy"}
                priority={variant === "featured" && index === 0}
                decoding="async"
              />
            ) : (
              <div className="showcase-card-placeholder">
                <span>{project.title}</span>
              </div>
            )}
            <div className="showcase-card-veil" aria-hidden />
            <div className="showcase-card-spot" aria-hidden />
          </div>
        </Link>

        <div className="showcase-card-body">
          <div className="showcase-card-meta">
            <span className="showcase-card-index">{caseNumber}</span>
            <span className="showcase-card-dot" aria-hidden />
            <span className="showcase-card-category">{category}</span>
            {comingSoon ? (
              <span className="showcase-card-status showcase-card-status--soon">In development</span>
            ) : (
              <span className="showcase-card-status showcase-card-status--live">Live</span>
            )}
          </div>

          <h3 className="showcase-card-title">
            <Link href={href} data-cursor>
              {project.title}
            </Link>
          </h3>

          <p className="showcase-card-summary">{project.overview || project.summary}</p>

          {stack.length > 0 ? (
            <ul className="showcase-card-stack" aria-label="Technologies">
              {stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          ) : null}

          <div className="showcase-card-actions">
            <Link href={href} className="showcase-card-cta" data-cursor>
              <span>View project</span>
              <span className="showcase-card-cta-arrow" aria-hidden>
                →
              </span>
            </Link>
            {project.url && !comingSoon ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="showcase-card-external"
                data-cursor
              >
                Visit site
                <span aria-hidden>↗</span>
              </a>
            ) : null}
          </div>
        </div>
      </ProjectHoverEffect>
    </motion.article>
  );
}
