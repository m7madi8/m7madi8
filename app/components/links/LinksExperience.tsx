"use client";

import Link from "next/link";
import type { Locale } from "../../../lib/i18n/config";
import { getMessages } from "../../../lib/i18n/messages";
import { homePath, workIndexPath } from "../../../lib/i18n/paths";
import LanguageSwitcher from "../LanguageSwitcher";
import BrandMark from "../BrandMark";
import LazyCustomCursor from "../LazyCustomCursor";
import LinksChannels from "./LinksChannels";
import LinksHero from "./LinksHero";
import LinksShowcase, { type ShowcaseItem } from "./LinksShowcase";
import LinksSmoothScroll from "./LinksSmoothScroll";
import "./links.css";

type Props = {
  projects: ShowcaseItem[];
  locale?: Locale;
};

export default function LinksExperience({
  projects,
  locale = "en",
}: Props) {
  const l = getMessages(locale).links;
  const rtlClass = locale === "ar" ? " locale-root" : "";

  return (
    <LinksSmoothScroll>
      <div className={`links-page${rtlClass}`} dir={locale === "ar" ? "rtl" : "ltr"}>
        <LazyCustomCursor />

        <header className="links-topbar">
          <BrandMark
            href={homePath(locale)}
            size="md"
            tone="light"
            animate
            className="links-topbar-brand"
            aria-label={l.homeAria}
          />
          <div className="links-topbar-actions">
            <LanguageSwitcher locale={locale} variant="inline" />
            <Link href={workIndexPath(locale)} className="links-topbar-link" data-cursor>
              {l.archive}
            </Link>
          </div>
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
              {l.startProject}
            </a>
          </footer>
        </main>
      </div>
    </LinksSmoothScroll>
  );
}
