"use client";

import Image from "next/image";
import Link from "next/link";
import mhMark from "../../../img/mh-mark.webp";
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
          <Link href="/" className="links-topbar-brand" data-cursor aria-label="Home">
            <Image
              src={mhMark}
              alt="Mohammad Hroub"
              width={40}
              height={40}
              className="links-topbar-logo"
              priority
              unoptimized
            />
          </Link>
          <Link href="/work" className="links-topbar-link" data-cursor>
            Archive
          </Link>
        </header>

        <main className="links-stack">
          <LinksHero />
          <LinksChannels />
          <LinksShowcase items={projects} />

          <footer className="links-footer">
            <p className="links-footer-mark">Mohammad Hroub</p>
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
