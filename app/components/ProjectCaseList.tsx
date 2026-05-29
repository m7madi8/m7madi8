import Image from "next/image";
import Link from "next/link";
import { isComingSoon, type Project } from "../data/projects";

type ProjectCaseListProps = {
  projects: Project[];
};

export default function ProjectCaseList({ projects }: ProjectCaseListProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8">
      {projects.map((project, index) => {
        const comingSoon = isComingSoon(project);

        return (
          <article
            key={project.slug}
            id={project.slug}
            className="reveal scroll-mt-32 surface-card flex h-full min-w-0 flex-col overflow-hidden"
            data-reveal
          >
            <Link
              href={`/work/${project.slug}`}
              className="block"
              data-cursor
            >
              <div className="project-card-image relative aspect-[16/10]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--surface-elevated)] px-4 text-center text-xs uppercase tracking-widest text-[color:var(--muted)]">
                    {project.title}
                  </div>
                )}
              </div>
            </Link>

            <div className="flex flex-1 flex-col p-4 sm:p-6 lg:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <p className="eyebrow text-[0.7rem] sm:text-[0.8rem]">
                  Case {String(index + 1).padStart(2, "0")}
                </p>
                {comingSoon ? (
                  <span className="badge">In development</span>
                ) : (
                  <span className="badge badge-live">Live</span>
                )}
              </div>

              <h2 className="mt-2.5 text-lg font-medium text-white sm:mt-3 sm:text-xl lg:text-2xl">
                <Link
                  href={`/work/${project.slug}`}
                  className="transition hover:text-[color:var(--muted)]"
                  data-cursor
                >
                  {project.title}
                </Link>
              </h2>

              <p className="mt-1 text-xs text-[color:var(--muted)] sm:text-sm">
                {project.context}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                {project.summary}
              </p>

              <div className="mt-5 grid gap-4 border-t border-[color:var(--border)] pt-5">
                <div>
                  <p className="eyebrow text-[0.7rem]">Goal</p>
                  <p className="mt-1.5 line-clamp-2 text-sm text-white">
                    {project.goal}
                  </p>
                </div>
                <div>
                  <p className="eyebrow text-[0.7rem]">Result</p>
                  <p className="mt-1.5 line-clamp-2 text-sm text-white">
                    {project.result}
                  </p>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link
                  href={`/work/${project.slug}`}
                  className="link-arrow"
                  data-cursor
                >
                  View case study
                  <span aria-hidden>→</span>
                </Link>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[color:var(--muted)] transition hover:text-white"
                    data-cursor
                  >
                    Visit site ↗
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
