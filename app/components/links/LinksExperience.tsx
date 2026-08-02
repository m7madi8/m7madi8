"use client";

import Link from "next/link";
import BrandMark from "../BrandMark";
import LazyCustomCursor from "../LazyCustomCursor";
import LinksChannels from "./LinksChannels";
import LinksHero from "./LinksHero";
import LinksShowcase, { type ShowcaseItem } from "./LinksShowcase";
import LinksSmoothScroll from "./LinksSmoothScroll";
import "./links.css";

type Props = {
  projects: ShowcaseItem[];
};

export default function LinksExperience({ projects }: Props) {
  return (
    <LinksSmoothScroll>
      <div className="links-page">
        <LazyCustomCursor />

        <header className="links-topbar">
          <BrandMark
            href="/"
            size="md"
            tone="light"
            animate
            className="links-topbar-brand"
            aria-label="m. — Home"
          />
          <Link href="/work" className="links-topbar-link" data-cursor>
            Archive
          </Link>
        </header>

        <main className="links-stack">
          <LinksHero />
          <LinksChannels />
          <LinksShowcase items={projects} />

          <footer className="links-footer">
            <BrandMark
              href={null}
              size="sm"
              tone="light"
              animate={false}
              className="links-footer-mark"
              aria-label="m."
            />
            <a
              href="mailto:eslamhuhu1@gmail.com"
              className="links-footer-cta"
              data-cursor
            >
              Start a project
            </a>
          </footer>
        </main>
      </div>
    </LinksSmoothScroll>
  );
}
