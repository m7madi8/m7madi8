"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECT_SHOWCASE_META } from "../../data/project-showcase-meta";
import { isComingSoon, projectStatusLabel, type Project } from "../../data/projects";
import ProjectHoverEffect from "../showcase/ProjectHoverEffect";

type FeaturedProjectCardProps = {
  project: Project;
  index?: number;
  lead?: boolean;
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function FeaturedProjectCard({
  project,
  index = 0,
  lead = false,
}: FeaturedProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const comingSoon = isComingSoon(project);
  const meta = PROJECT_SHOWCASE_META[project.slug];
  const category = project.category ?? meta?.category ?? project.context;
  const href = `/work/${project.slug}`;
  const isPoster = project.coverLayout === "poster";
  const delay = reduceMotion ? 0 : index * 0.1;

  return (
    <motion.article
      className={`featured-card featured-card--${project.slug}${
        lead ? " featured-card--lead" : ""
      }${isPoster ? " featured-card--poster" : ""}`}
      initial={reduceMotion ? false : { opacity: 0, y: 56 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -4% 0px" }}
      transition={{ duration: 0.85, ease, delay }}
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
                sizes="(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 28vw"
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
                {projectStatusLabel(project)}
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
