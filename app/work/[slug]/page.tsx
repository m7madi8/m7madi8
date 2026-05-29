import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CustomCursor from "../../components/CustomCursor";
import ProjectJsonLd from "../../components/ProjectJsonLd";
import RevealManager from "../../components/RevealManager";
import SiteFooter from "../../components/SiteFooter";
import { isComingSoon, projects } from "../../data/projects";
import { SEO_PERSON, buildPageMetadata } from "../../../lib/seo-config";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return {};
  }
  const title = `${project.title} — ${SEO_PERSON.nameEn} | ${SEO_PERSON.nameAr}`;
  const description = `${project.summary} ${project.context}. Built by ${SEO_PERSON.nameEn}, ${SEO_PERSON.jobTitle}. ${SEO_PERSON.nameAr} — ${SEO_PERSON.jobTitleAr}.`;

  return buildPageMetadata({
    title,
    description,
    path: `/work/${slug}`,
    keywords: [project.title, project.context, project.slug, "case study", "دراسة حالة"],
    ogTitle: `${project.title} | ${SEO_PERSON.nameEn}`,
    ogType: "article",
  });
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const comingSoon = isComingSoon(project);
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <div className="relative bg-[color:var(--background)] text-[color:var(--foreground)]">
      <ProjectJsonLd project={project} />
      <CustomCursor />
      <RevealManager />

      <main className="relative z-10 mx-auto min-h-screen max-w-5xl px-5 pb-10 pt-8 sm:px-8 sm:pt-10 lg:max-w-6xl lg:px-16 lg:pt-14">
        {/* Top nav */}
        <header className="reveal flex flex-wrap items-center justify-between gap-4" data-reveal>
          <Link
            className="link-arrow text-[color:var(--muted)] hover:text-white"
            href="/work"
            data-cursor
          >
            <span aria-hidden>←</span>
            All projects
          </Link>
          <div className="flex items-center gap-4">
            {comingSoon ? (
              <span className="badge">In development</span>
            ) : (
              <span className="badge badge-live">Live</span>
            )}
            {project.url ? (
              <a
                className="link-arrow"
                href={project.url}
                target="_blank"
                rel="noreferrer"
                data-cursor
              >
                Visit site
                <span aria-hidden>↗</span>
              </a>
            ) : null}
          </div>
        </header>

        {/* Hero image */}
        {project.image ? (
          <div className="case-hero-image reveal mt-8 sm:mt-10" data-reveal>
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1152px"
              priority
            />
          </div>
        ) : null}

        {/* Title block */}
        <section className="mt-12 space-y-6 lg:mt-16">
          <div className="reveal" data-reveal>
            <p className="eyebrow">{project.context}</p>
            <h1 className="page-hero-title mt-3 font-medium tracking-tight">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--muted)]">
              {project.overview}
            </p>
          </div>

          {comingSoon ? (
            <div
              className="reveal surface-card px-6 py-4"
              data-reveal
            >
              <p className="eyebrow">Status</p>
              <p className="mt-2 text-sm text-white">
                In active development — publishing soon.
              </p>
            </div>
          ) : null}
        </section>

        {/* Details grid */}
        <section className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="reveal space-y-8" data-reveal>
            <div>
              <p className="eyebrow">Goal</p>
              <p className="mt-3 text-base leading-relaxed text-white">
                {project.goal}
              </p>
            </div>
            <div>
              <p className="eyebrow">
                {comingSoon ? "What's being built" : "What was built"}
              </p>
              <p className="mt-3 text-base leading-relaxed text-[color:var(--muted)]">
                {project.build}
              </p>
            </div>
            <div>
              <p className="eyebrow">Key work</p>
              <ul className="mt-4 space-y-3">
                {project.work.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-[color:var(--muted)]"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--muted)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal surface-card-elevated p-8" data-reveal>
            <p className="eyebrow">Outcome</p>
            <p className="mt-4 text-lg leading-relaxed text-white">
              {project.result}
            </p>
            <div className="mt-8 space-y-4 border-t border-[color:var(--border)] pt-8">
              <div>
                <p className="eyebrow">Summary</p>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  {project.summary}
                </p>
              </div>
              <Link
                href="/#contact"
                className="btn-primary mt-4 inline-flex w-full justify-center px-6 py-3"
                data-cursor
              >
                Start a similar project
              </Link>
            </div>
          </div>
        </section>

        {/* Prev / Next navigation */}
        <nav
          className="reveal mt-12 grid gap-4 pt-6 sm:grid-cols-2"
          data-reveal
          aria-label="Project navigation"
        >
          {prevProject ? (
            <Link
              href={`/work/${prevProject.slug}`}
              className="surface-card group p-6 transition hover:border-[color:var(--border)]"
              data-cursor
            >
              <p className="eyebrow">Previous</p>
              <p className="mt-2 font-medium text-white transition group-hover:text-[color:var(--muted)]">
                {prevProject.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/work/${nextProject.slug}`}
              className="surface-card group p-6 text-right transition hover:border-[color:var(--border)]"
              data-cursor
            >
              <p className="eyebrow">Next</p>
              <p className="mt-2 font-medium text-white transition group-hover:text-[color:var(--muted)]">
                {nextProject.title}
              </p>
            </Link>
          ) : null}
        </nav>

        <SiteFooter />
      </main>
    </div>
  );
}
