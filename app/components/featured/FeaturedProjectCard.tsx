"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECT_SHOWCASE_META } from "../../data/project-showcase-meta";
import { isComingSoon, type Project } from "../../data/projects";
import ProjectHoverEffect from "../showcase/ProjectHoverEffect";

type FeaturedProjectCardProps = {
  project: Project;
  index?: number;
  /** Slightly stronger typography for the first tile */
  lead?: boolean;
};

export default function FeaturedProjectCard({
  project,
  index = 0,
  lead = false,
}: FeaturedProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const comingSoon = isComingSoon(project);
  const meta = PROJECT_SHOWCASE_META[project.slug];
  const category = project.category ?? meta?.category ?? project.context;
  const stack = (project.stack ?? meta?.stack ?? []).slice(0, 3);
  const href = `/work/${project.slug}`;

  return (
    <motion.article
      className={`featured-card${lead ? " featured-card--lead" : ""}`}
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: reduceMotion ? 0 : index * 0.08,
      }}
    >
      <ProjectHoverEffect className="featured-card-shell" intensity={5}>
        <Link
          href={href}
          className="featured-card-media"
          data-cursor
          aria-label={`View ${project.title}`}
        >
          <div className="featured-card-frame">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                className="featured-card-img object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px"
                priority={index < 2}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
              />
            ) : (
              <div className="featured-card-placeholder">
                <span>{project.title}</span>
              </div>
            )}
            <div className="featured-card-veil" aria-hidden />
            <div className="featured-card-spot" aria-hidden />
          </div>
        </Link>

        <div className="featured-card-body">
          <div className="featured-card-meta">
            <span className="featured-card-category">{category}</span>
            {comingSoon ? (
              <span className="featured-card-status featured-card-status--soon">
                In development
              </span>
            ) : (
              <span className="featured-card-status featured-card-status--live">
                Live
              </span>
            )}
          </div>

          <h3 className="featured-card-title">
            <Link href={href} data-cursor>
              {project.title}
            </Link>
          </h3>

          <p className="featured-card-copy">
            {project.overview || project.summary}
          </p>

          {stack.length > 0 ? (
            <ul className="featured-card-stack" aria-label="Stack">
              {stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          ) : null}

          <Link href={href} className="featured-card-cta" data-cursor>
            <span>View project</span>
            <span className="featured-card-cta-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </ProjectHoverEffect>
    </motion.article>
  );
}
