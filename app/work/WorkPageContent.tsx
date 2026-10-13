"use client";

import Link from "next/link";
import type { Locale } from "../../lib/i18n/config";
import { getMessages } from "../../lib/i18n/messages";
import { getProjects } from "../../lib/i18n/projects";
import { contactHash, homePath } from "../../lib/i18n/paths";
import PortfolioChrome from "../components/PortfolioChrome";
import ProjectCaseList from "../components/ProjectCaseList";
import ScrollFloat from "../components/ScrollFloat";
import SiteFooter from "../components/SiteFooter";
import { projects, getLiveProjects } from "../data/projects";

type WorkPageContentProps = {
  locale: Locale;
};

export default function WorkPageContent({ locale }: WorkPageContentProps) {
  const m = getMessages(locale).work;
  const localizedProjects = getProjects(locale);
  const liveCount = getLiveProjects().length;
  const launchingCount = projects.filter((p) => p.status === "launching").length;
  const inDevCount = projects.filter((p) => p.status === "coming-soon").length;
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
      <PortfolioChrome locale={locale} />

      <main className="page-with-fixed-nav relative z-10 mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8 lg:px-16">
        <header className="page-hero">
          <div className="reveal flex flex-wrap items-center justify-between gap-4" data-reveal>
            <p className="eyebrow">{m.eyebrow}</p>
            <Link
              href={homePath(locale)}
              className="link-arrow text-[color:var(--muted)] hover:text-white"
              data-cursor
            >
              <span aria-hidden>{backArrow}</span>
              {m.backHome}
            </Link>
          </div>
          <ScrollFloat
            as="h1"
            className="page-hero-title mt-6 max-w-3xl"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            {m.title}
          </ScrollFloat>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[color:var(--muted)] sm:text-lg">
            {m.lede}
          </p>

          <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
            <span className="badge badge-live">
              {liveCount} {m.live}
            </span>
            {launchingCount > 0 ? (
              <span className="badge">
                {launchingCount} {m.launching}
              </span>
            ) : null}
            <span className="badge">
              {inDevCount} {m.inDev}
            </span>
            <span className="badge">
              {projects.length} {m.total}
            </span>
          </div>
        </header>

        <section className="section-block" aria-label={m.aria}>
          <ProjectCaseList projects={localizedProjects} locale={locale} />
        </section>

        <section className="section-block">
          <div className="cta-banner reveal text-center" data-reveal>
            <div className="cta-banner-inner">
              <p className="eyebrow">{m.nextStep}</p>
              <ScrollFloat
                as="h2"
                className="section-title mx-auto mt-4 max-w-xl"
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.03}
              >
                {m.readyTitle}
              </ScrollFloat>
              <p className="mx-auto mt-3 max-w-md text-sm text-[color:var(--muted)]">
                {m.readyCopy}
              </p>
              <Link
                href={contactHash(locale)}
                className="btn-primary mt-8 inline-flex px-8 py-4"
                data-cursor
              >
                {m.getInTouch}
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter locale={locale} />
      </main>
    </div>
  );
}
