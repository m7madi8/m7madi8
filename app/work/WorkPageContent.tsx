"use client";

import Link from "next/link";
import LazyCustomCursor from "../components/LazyCustomCursor";
import LazyStaggeredMenu from "../components/LazyStaggeredMenu";
import ProjectCaseList from "../components/ProjectCaseList";
import RevealManager from "../components/RevealManager";
import SiteFooter from "../components/SiteFooter";
import { projects, getLiveProjects } from "../data/projects";
import { menuItems, socialItems } from "../../lib/site-nav";

type WorkPageContentProps = {
  logoUrl: string;
};

export default function WorkPageContent({ logoUrl }: WorkPageContentProps) {
  const liveCount = getLiveProjects().length;
  const inDevCount = projects.length - liveCount;

  return (
    <div className="relative overflow-x-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">
      <LazyCustomCursor />
      <RevealManager />
      <LazyStaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        logoUrl={logoUrl}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen
        colors={["#060708", "#1a1c22", "#6b7280"]}
        accentColor="var(--button-border)"
        isFixed
        closeOnClickAway
      />

      <main className="page-with-fixed-nav relative z-10 mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8 lg:px-16">
        <header className="page-hero reveal" data-reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="eyebrow">Portfolio</p>
            <Link
              href="/"
              className="link-arrow text-[color:var(--muted)] hover:text-white"
              data-cursor
            >
              <span aria-hidden>←</span>
              Back to home
            </Link>
          </div>
          <h1 className="page-hero-title mt-6 max-w-3xl font-medium tracking-tight">
            Selected work
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[color:var(--muted)] sm:text-lg">
            Live launches and work in progress — goals, build direction, and
            outcomes from real client projects.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
            <span className="badge badge-live">{liveCount} Live</span>
            <span className="badge">{inDevCount} In Development</span>
            <span className="badge">{projects.length} Total Cases</span>
          </div>
        </header>

        <section className="section-block" aria-label="All projects">
          <ProjectCaseList projects={projects} />
        </section>

        <section className="section-block">
          <div className="cta-banner reveal text-center" data-reveal>
            <div className="cta-banner-inner">
              <p className="eyebrow">Next step</p>
              <h2 className="section-title mx-auto mt-4 max-w-xl font-medium">
                Ready to start your project?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-[color:var(--muted)]">
                Let&apos;s discuss your goals and build something exceptional together.
              </p>
              <Link
                href="/#contact"
                className="btn-primary mt-8 inline-flex px-8 py-4"
                data-cursor
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
