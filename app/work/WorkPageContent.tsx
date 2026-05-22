"use client";

import Link from "next/link";
import LazyCustomCursor from "../components/LazyCustomCursor";
import LazyStaggeredMenu from "../components/LazyStaggeredMenu";
import ProjectCaseList from "../components/ProjectCaseList";
import RevealManager from "../components/RevealManager";
import { projects } from "../data/projects";
import { menuItems, socialItems } from "../../lib/site-nav";

type WorkPageContentProps = {
  logoUrl: string;
};

export default function WorkPageContent({ logoUrl }: WorkPageContentProps) {
  return (
    <div className="overflow-x-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">
      <LazyCustomCursor />
      <RevealManager />
      <LazyStaggeredMenu
        position="right"
        items={[...menuItems]}
        socialItems={[...socialItems]}
        displaySocials
        displayItemNumbering
        logoUrl={logoUrl}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen
        colors={["#08090a", "#1f2126", "#6b7280"]}
        accentColor="var(--button-border)"
        isFixed
        closeOnClickAway
      />

      <main className="page-with-fixed-nav relative mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8 lg:max-w-7xl lg:px-10">
        <header
          className="reveal border-b border-[color:var(--border)] pb-6 sm:pb-8"
          data-reveal
        >
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="eyebrow">Portfolio</p>
            <Link
              href="/"
              className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:text-white"
              data-cursor
            >
              ← Back to home
            </Link>
          </div>
          <h1 className="section-title mt-4 max-w-2xl font-medium tracking-tight">
            Selected work
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-[color:var(--muted)]">
            Live launches and work in progress — goals, build direction, and
            outcomes. Several projects are in active development and publishing
            soon.
          </p>
        </header>

        <section className="mt-8 sm:mt-10" aria-label="All projects">
          <ProjectCaseList projects={projects} />
        </section>

        <section
          className="reveal mt-12 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-10 text-center sm:mt-14"
          data-reveal
        >
          <p className="text-[color:var(--muted)]">Ready to start your project?</p>
          <Link
            href="/#contact"
            className="btn-primary mt-5 inline-block px-8 py-3.5"
            data-cursor
          >
            Get in touch
          </Link>
        </section>
      </main>
    </div>
  );
}
