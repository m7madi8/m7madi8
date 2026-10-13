import type { Locale } from "../../lib/i18n/config";
import { getMessages } from "../../lib/i18n/messages";
import { getProjects } from "../../lib/i18n/projects";
import { SEO_PERSON } from "../../lib/seo-config";
import About from "../components/About";
import ContactSocialLinks from "../components/ContactSocialLinks";
import { FeaturedProjects } from "../components/featured";
import Hero from "../components/Hero";
import HomeCta from "../components/HomeCta";
import HomeEntitySummary from "../components/HomeEntitySummary";
import HomeSignature from "../components/HomeSignature";
import LazyContactForm from "../components/LazyContactForm";
import PortfolioChrome from "../components/PortfolioChrome";
import ScrollFloat from "../components/ScrollFloat";
import SectionHeader from "../components/SectionHeader";
import SiteFooter from "../components/SiteFooter";
import { getLiveProjects, projects } from "../data/projects";

const FEATURED_SLUGS = [
  "omino",
  "nanas-biets",
  "od-architects",
  "99cafe",
  "nawal-omar-yoga",
] as const;

type HomePageViewProps = {
  locale: Locale;
};

export default function HomePageView({ locale }: HomePageViewProps) {
  const m = getMessages(locale);
  const featuredProjects = FEATURED_SLUGS.map((slug) => {
    const base = projects.find((p) => p.slug === slug)!;
    return getProjects(locale).find((p) => p.slug === slug) ?? base;
  });

  const liveCount = getLiveProjects().length;

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

      <HomeSignature>
        <Hero locale={locale} />
      </HomeSignature>

      <main
        className="relative z-10 mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-16"
        id="main-content"
      >
        <HomeEntitySummary locale={locale} />
        <section
          id="work"
          className="section-block"
          aria-label={m.home.workSection.aria}
        >
          <SectionHeader
            index={m.home.workSection.index}
            eyebrow={m.home.workSection.eyebrow}
            title={m.home.workSection.title}
            description={m.home.workSection.description}
            className="mb-8 sm:mb-10"
          />

          <FeaturedProjects projects={featuredProjects} locale={locale} />
        </section>

        <About liveCount={liveCount} locale={locale} />

        <HomeCta liveCount={liveCount} locale={locale} />

        <section
          id="method"
          className="section-block"
          aria-label={m.home.method.aria}
        >
          <div className="method-layout">
            <div className="method-aside">
              <div className="section-eyebrow-row reveal" data-reveal>
                <span className="section-index" aria-hidden>
                  {m.home.method.index}
                </span>
                <p className="method-kicker">{m.home.method.kicker}</p>
              </div>
              <ScrollFloat
                as="h2"
                className="method-heading"
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.03}
              >
                {m.home.method.heading}
              </ScrollFloat>
            </div>

            <ol className="method-list">
              {m.home.method.steps.map((item) => (
                <li key={item.step} className="method-row reveal" data-reveal>
                  <span className="method-index" aria-hidden>
                    {item.step}
                  </span>
                  <div className="method-body">
                    <h3 className="method-title">{item.title}</h3>
                    <p className="method-copy">{item.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" className="section-block">
          <SectionHeader
            index={m.home.contact.index}
            eyebrow={m.home.contact.eyebrow}
            title={m.home.contact.title}
            description={m.home.contact.description}
          />

          <div className="contact-layout">
            <div className="contact-aside">
              <a
                className="contact-action reveal"
                data-reveal
                href={`mailto:${SEO_PERSON.email}`}
                data-cursor
                dir="ltr"
              >
                <span className="contact-action-index">01</span>
                <span className="contact-action-copy">
                  <span className="contact-action-label">
                    {m.home.contact.emailLabel}
                  </span>
                  <span className="contact-action-value">{SEO_PERSON.email}</span>
                </span>
                <span className="contact-action-go">
                  {m.home.contact.emailAction}
                </span>
              </a>
              <div
                className="contact-action contact-action--static reveal"
                data-reveal
              >
                <span className="contact-action-index">02</span>
                <span className="contact-action-copy">
                  <span className="contact-action-label">
                    {m.home.contact.locationLabel}
                  </span>
                  <span className="contact-action-value">
                    {m.home.contact.locationValue}
                  </span>
                </span>
                <span className="contact-action-go">
                  {m.home.contact.locationAction}
                </span>
              </div>
              <ContactSocialLinks />
            </div>

            <div className="reveal" data-reveal>
              <LazyContactForm locale={locale} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
