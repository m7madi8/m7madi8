"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BrandMark from "../components/BrandMark";
import LazyCustomCursor from "../components/LazyCustomCursor";
import RevealManager from "../components/RevealManager";
import SiteFooter from "../components/SiteFooter";
import {
  agreementContent,
  type AgreementSection,
} from "./agreement-data";
import "./agreement.css";

function SectionBlock({
  section,
  index,
}: {
  section: AgreementSection;
  index: number;
}) {
  const mark = String(index + 1).padStart(2, "0");

  return (
    <section id={section.id} className="agreement-section reveal" data-reveal>
      <div className="agreement-section-head">
        <span className="agreement-section-index" aria-hidden>
          {mark}
        </span>
        <h2 className="agreement-section-title">{section.title}</h2>
      </div>

      <div className="agreement-section-body">
        {section.body ? <p className="agreement-prose">{section.body}</p> : null}

        {section.items ? (
          <div className="agreement-parties">
            {section.items.map((item) => (
              <div key={item.label} className="agreement-party">
                <p className="agreement-party-label">{item.label}</p>
                <p className="agreement-party-text">{item.text}</p>
              </div>
            ))}
          </div>
        ) : null}

        {section.list ? (
          <ul className="agreement-list">
            {section.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        {section.steps ? (
          <ol className="agreement-phases">
            {section.steps.map((step, i) => (
              <li key={step.title} className="agreement-phase">
                <span className="agreement-phase-num" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="agreement-phase-title">{step.title}</h3>
                  <p className="agreement-phase-desc">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : null}

        {section.bodyAfter ? (
          <p className="agreement-prose">{section.bodyAfter}</p>
        ) : null}

        {section.highlight ? (
          <div className="agreement-callout">
            <p>{section.highlight}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Toc({
  sections,
  label,
  activeId,
  className,
}: {
  sections: AgreementSection[];
  label: string;
  activeId: string;
  className?: string;
}) {
  return (
    <nav className={className} aria-label={label}>
      <p className="agreement-toc-label">{label}</p>
      <ol className="agreement-toc-list">
        {sections.map((section, i) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="agreement-toc-link"
              data-active={activeId === section.id ? "true" : undefined}
              data-cursor
            >
              <span className="agreement-toc-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{section.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function AgreementContent() {
  const [lang, setLang] = useState<"ar" | "en">("en");
  const [activeId, setActiveId] = useState("intro");
  const t = agreementContent[lang];
  const isRtl = lang === "ar";

  useEffect(() => {
    const nodes = t.sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [t.sections]);

  return (
    <div
      className={`agreement-page${isRtl ? " agreement-page--rtl" : ""}`}
      dir={isRtl ? "rtl" : "ltr"}
      lang={lang}
    >
      <LazyCustomCursor />
      <RevealManager />

      <div className="agreement-watermark" aria-hidden dir="ltr">
        <BrandMark
          href={null}
          size="display"
          tone="light"
          animate={false}
          aria-label="m."
        />
      </div>

      <div className="agreement-shell">
        <header className="agreement-topbar" dir="ltr">
          <BrandMark href="/" size="md" tone="light" animate={false} />
          <p className="agreement-topbar-meta" aria-hidden>
            <span>{t.meta.document}</span>
            <span aria-hidden>·</span>
            <span>{t.meta.version}</span>
            <span aria-hidden>·</span>
            <span>{t.lastUpdated}</span>
          </p>
          <div className="agreement-topbar-actions">
            <button
              type="button"
              className={`agreement-chip${lang === "en" ? " agreement-chip--active" : ""}`}
              onClick={() => setLang("en")}
              data-cursor
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <button
              type="button"
              className={`agreement-chip${lang === "ar" ? " agreement-chip--active" : ""}`}
              onClick={() => setLang("ar")}
              data-cursor
              aria-pressed={lang === "ar"}
            >
              AR
            </button>
          </div>
        </header>

        <main>
          <header
            className="agreement-hero reveal"
            data-reveal
            dir={isRtl ? "rtl" : "ltr"}
            lang={lang}
          >
            <p className="agreement-hero-kicker">{t.meta.effective}</p>
            <h1 className="agreement-hero-title">{t.title}</h1>
            <p className="agreement-hero-lede">{t.lede}</p>
            <p className="agreement-hero-sub">{t.subtitle}</p>
            <div className="agreement-hero-cta">
              <Link
                href="/#contact"
                className="agreement-cta-primary"
                data-cursor
              >
                {t.contact}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                  className={isRtl ? "agreement-cta-icon--rtl" : undefined}
                >
                  <path
                    d="M2.5 7h9M8 3.5 11.5 7 8 10.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link href="/" className="agreement-cta-ghost" data-cursor>
                {t.back}
              </Link>
            </div>
          </header>

          <div className="agreement-layout" dir={isRtl ? "rtl" : "ltr"} lang={lang}>
            <Toc
              className="agreement-toc"
              sections={t.sections}
              label={t.contentsLabel}
              activeId={activeId}
            />

            <div className="agreement-doc">
              <Toc
                className="agreement-toc-mobile"
                sections={t.sections}
                label={t.contentsLabel}
                activeId={activeId}
              />

              <article>
                {t.sections.map((section, index) => (
                  <SectionBlock
                    key={`${lang}-${section.id}`}
                    section={section}
                    index={index}
                  />
                ))}
              </article>

              <div className="agreement-closing reveal" data-reveal>
                <p className="agreement-closing-note">
                  {lang === "en"
                    ? "Questions before kickoff? Reach out — better to align early than revise mid-build."
                    : "أسئلة قبل البدء؟ تواصل مبكرًا — الاتفاق الواضح أفضل من التعديل أثناء التنفيذ."}
                </p>
                <Link
                  href="/#contact"
                  className="agreement-cta-primary"
                  data-cursor
                >
                  {t.contact}
                </Link>
              </div>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
