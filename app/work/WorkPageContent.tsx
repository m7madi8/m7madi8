"use client";

import Link from "next/link";
import LazyCustomCursor from "../components/LazyCustomCursor";
import LazyStaggeredMenu from "../components/LazyStaggeredMenu";
import ProjectCaseList from "../components/ProjectCaseList";
import RevealManager from "../components/RevealManager";
import ScrollFloat from "../components/ScrollFloat";
import SiteFooter from "../components/SiteFooter";
import { projects, getLiveProjects } from "../data/projects";
import { menuItems, socialItems } from "../../lib/site-nav";

export default function WorkPageContent() {
  const liveCount = getLiveProjects().length;
  const launchingCount = projects.filter((p) => p.status === "launching").length;
  const inDevCount = projects.filter((p) => p.status === "coming-soon").length;

  return (
    <div className="relative bg-[color:var(--background)] text-[color:var(--foreground)]">
      <LazyCustomCursor />
      <RevealManager />
      <LazyStaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        menuButtonColor="#ffffff"
        openMenuButtonColor="#ffffff"
        changeMenuColorOnOpen={false}
        colors={["#060708", "#111318", "#1a1c22"]}
        accentColor="var(--button-border)"
        isFixed
        closeOnClickAway
      />

      <main className="page-with-fixed-nav relative z-10 mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8 lg:px-16">
        <header className="page-hero">
          <div className="reveal flex flex-wrap items-center justify-between gap-4" data-reveal>
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
          <ScrollFloat
            as="h1"
            className="page-hero-title mt-6 max-w-3xl"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Selected work
          </ScrollFloat>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[color:var(--muted)] sm:text-lg">
            A curated archive of digital products — each one designed, engineered,
            and refined with the same standard of craft.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
            <span className="badge badge-live">{liveCount} Live</span>
            {launchingCount > 0 ? (
              <span className="badge">{launchingCount} Launching</span>
            ) : null}
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
              <ScrollFloat
                as="h2"
                className="section-title mx-auto mt-4 max-w-xl"
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.03}
              >
                Ready to start your project?
              </ScrollFloat>
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
