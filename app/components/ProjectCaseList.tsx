import Image from "next/image";
import Link from "next/link";
import { isComingSoon, type Project } from "../data/projects";

type ProjectCaseListProps = {
  projects: Project[];
};

export default function ProjectCaseList({ projects }: ProjectCaseListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-8">
      {projects.map((project, index) => (
        <article
          key={project.slug}
          id={project.slug}
          className="reveal scroll-mt-32 flex h-full flex-col gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6 lg:p-6"
          data-reveal
        >
          <div className="space-y-3">
            <p className="eyebrow">
              Case {String(index + 1).padStart(2, "0")}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-medium text-white lg:text-2xl">
                <Link
                  href={`/work/${project.slug}`}
                  className="transition hover:text-[color:var(--muted)]"
                  data-cursor
                >
                  {project.title}
                </Link>
              </h2>
              {isComingSoon(project) ? (
                <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface-elevated)] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  In development
                </span>
              ) : null}
            </div>
            <p className="text-sm leading-relaxed text-[color:var(--muted)]">
              {project.summary}
            </p>
            <p className="text-xs text-[color:var(--muted)]">{project.context}</p>
          </div>

          <div className="perspective-3d">
            <Link
              href={`/work/${project.slug}`}
              className="card-3d block overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-elevated)]"
              data-cursor
            >
              <div className="image-3d-wrap relative aspect-[16/10]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 50vw, 33vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[color:var(--muted)] text-xs uppercase tracking-widest">
                    {project.title}
                  </div>
                )}
              </div>
            </Link>
          </div>

          <div className="mt-auto space-y-3 text-sm">
            <div>
              <p className="eyebrow">Goal</p>
              <p className="mt-1 line-clamp-3 text-white">{project.goal}</p>
            </div>
            <div>
              <p className="eyebrow">Result</p>
              <p className="mt-1 line-clamp-2 text-white">{project.result}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--accent)] transition hover:opacity-80"
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
                  className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--muted)] transition hover:text-white"
                  data-cursor
                >
                  Visit site
                  <span aria-hidden>→</span>
                </a>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
