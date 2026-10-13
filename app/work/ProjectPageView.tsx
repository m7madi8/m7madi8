import Image from "next/image";
import Link from "next/link";
import BrandMark from "../components/BrandMark";
import LanguageSwitcher from "../components/LanguageSwitcher";
import CustomCursor from "../components/CustomCursor";
import ProjectGalleryCarousel from "../components/ProjectGalleryCarousel";
import ProjectJsonLd from "../components/ProjectJsonLd";
import RevealManager from "../components/RevealManager";
import ScrollFloat from "../components/ScrollFloat";
import SiteFooter from "../components/SiteFooter";
import type { Locale } from "../../lib/i18n/config";
import { getMessages } from "../../lib/i18n/messages";
import {
  getProjectBySlug,
  getProjects,
  projectStatusLabel,
} from "../../lib/i18n/projects";
import {
  contactHash,
  homePath,
  workIndexPath,
  workProjectPath,
} from "../../lib/i18n/paths";
import { isComingSoon, projects } from "../data/projects";
import { PROJECT_SHOWCASE_META } from "../data/project-showcase-meta";

type ProjectPageViewProps = {
  slug: string;
  locale: Locale;
};

export default function ProjectPageView({ slug, locale }: ProjectPageViewProps) {
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const base = projects[projectIndex];
  const project = getProjectBySlug(slug, locale) ?? base;
  const c = getMessages(locale).case;
  const comingSoon = isComingSoon(project);
  const showcase = PROJECT_SHOWCASE_META[project.slug];
  const category = project.category ?? showcase?.category ?? project.context;
  const stack = project.stack ?? showcase?.stack ?? [];
  const allLocalized = getProjects(locale);
  const prevProject =
    projectIndex > 0 ? allLocalized[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? allLocalized[projectIndex + 1] : null;
  const backArrow = locale === "ar" ? "→" : "←";
  const isAr = locale === "ar";

  return (
    <div
      lang={locale}
      dir={isAr ? "rtl" : "ltr"}
      className={`relative bg-[color:var(--background)] text-[color:var(--foreground)]${
        isAr ? " locale-root" : ""
      }`}
    >
      <ProjectJsonLd project={project} locale={locale} />
      <CustomCursor />
      <RevealManager />
      <main className="relative z-10 mx-auto min-h-screen max-w-5xl px-5 pb-10 pt-8 sm:px-8 sm:pt-10 lg:max-w-6xl lg:px-16 lg:pt-14">
        <header className="reveal flex flex-wrap items-center justify-between gap-4" data-reveal>
          <div className="flex items-center gap-5">
            <BrandMark href={homePath(locale)} size="sm" tone="light" animate={false} />
            <Link
              className="link-arrow text-[color:var(--muted)] hover:text-white"
              href={workIndexPath(locale)}
              data-cursor
            >
              <span aria-hidden>{backArrow}</span>
              {c.allProjects}
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <LanguageSwitcher locale={locale} variant="inline" />
            {comingSoon ? (
              <span className="badge">{projectStatusLabel(project, locale)}</span>
            ) : (
              <span className="badge badge-live">{c.live}</span>
            )}
            {project.url ? (
              <a
                className="project-card-btn project-card-btn--external project-card-btn--inline"
                href={project.url}
                target="_blank"
                rel="noreferrer"
                data-cursor
                dir="ltr"
              >
                {c.visitSite}
                <svg
                  className="project-card-btn-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M5.5 2.5H2.75A1.25 1.25 0 0 0 1.5 3.75v7.5c0 .69.56 1.25 1.25 1.25h7.5c.69 0 1.25-.56 1.25-1.25V8.5M8.5 1.5h4v4M5.5 8.5 12.5 1.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ) : null}
          </div>
        </header>

        {project.image ? (
          <div
            className={`case-hero-image reveal mt-8 sm:mt-10${
              project.coverLayout === "poster" ? " case-hero-image--poster" : ""
            }`}
            data-reveal
          >
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className={
                project.coverLayout === "poster" ? "object-contain" : "object-cover"
              }
              sizes="(max-width: 1280px) 100vw, 1152px"
              priority
              decoding="async"
            />
          </div>
        ) : null}

        {project.figureNote ? (
          <p
            className="reveal mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--muted)]"
            data-reveal
          >
            {project.figureNote}
          </p>
        ) : null}

        {project.gallery && project.gallery.length > 0 ? (
          <div className="mt-8 sm:mt-10">
            <ProjectGalleryCarousel
              items={project.gallery}
              title={project.galleryTitle}
              description={project.galleryDescription}
            />
          </div>
        ) : null}

        <section className="mt-12 space-y-6 lg:mt-16">
          <p className="eyebrow reveal" data-reveal>{category}</p>
          <ScrollFloat
            as="h1"
            className="case-title mt-3"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            {project.title}
          </ScrollFloat>
          <div className="reveal" data-reveal>
            <dl className="case-meta-row">
              <div className="case-meta-item">
                <dt>{c.context}</dt>
                <dd>{project.context}</dd>
              </div>
              {stack.length ? (
                <div className="case-meta-item">
                  <dt>{c.stack}</dt>
                  <dd dir="ltr">{stack.join(", ")}</dd>
                </div>
              ) : null}
              <div className="case-meta-item">
                <dt>{c.status}</dt>
                <dd>
                  {comingSoon ? projectStatusLabel(project, locale) : c.live}
                </dd>
              </div>
            </dl>
            <p className="case-lede mt-8">{project.overview}</p>
          </div>

          {comingSoon ? (
            <div className="reveal surface-card px-6 py-4" data-reveal>
              <p className="eyebrow">{c.status}</p>
              <p className="mt-2 text-sm text-white">
                {project.status === "launching"
                  ? project.result
                  : c.statusDev}
              </p>
            </div>
          ) : null}
        </section>

        <section className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="reveal space-y-8" data-reveal>
            <div>
              <p className="case-section-label">{c.goal}</p>
              <p className="case-section-body mt-3">{project.goal}</p>
            </div>
            <div>
              <p className="case-section-label">
                {comingSoon && project.status !== "launching"
                  ? c.building
                  : c.built}
              </p>
              <p className="case-section-body mt-3">{project.build}</p>
            </div>
            <div>
              <p className="case-section-label">{c.keyWork}</p>
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
            <p className="case-section-label">{c.outcome}</p>
            <p className="case-section-body mt-4 text-white">{project.result}</p>
            <div className="mt-8 space-y-4 border-t border-[color:var(--border)] pt-8">
              <div>
                <p className="eyebrow">{c.summary}</p>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  {project.summary}
                </p>
              </div>
              <Link
                href={contactHash(locale)}
                className="btn-primary mt-4 inline-flex w-full justify-center px-6 py-3"
                data-cursor
              >
                {c.startSimilar}
              </Link>
            </div>
          </div>
        </section>

        <nav
          className="reveal mt-12 grid gap-4 pt-6 sm:grid-cols-2"
          data-reveal
          aria-label={c.navAria}
        >
          {prevProject ? (
            <Link
              href={workProjectPath(prevProject.slug, locale)}
              className="surface-card group p-6 transition hover:border-[color:var(--border)]"
              data-cursor
            >
              <p className="eyebrow">{c.previous}</p>
              <p className="mt-2 font-medium text-white transition group-hover:text-[color:var(--muted)]">
                {prevProject.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={workProjectPath(nextProject.slug, locale)}
              className={`surface-card group p-6 transition hover:border-[color:var(--border)]${
                locale === "en" ? " text-end" : ""
              }`}
              data-cursor
            >
              <p className="eyebrow">{c.next}</p>
              <p className="mt-2 font-medium text-white transition group-hover:text-[color:var(--muted)]">
                {nextProject.title}
              </p>
            </Link>
          ) : null}
        </nav>

        <SiteFooter locale={locale} />
      </main>
    </div>
  );
}
