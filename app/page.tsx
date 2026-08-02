import type { Metadata } from "next";
import {
  SEO_PERSON,
  buildPageMetadata,
  defaultOgTitle,
  defaultPageTitle,
} from "../lib/seo-config";
import { menuItems, socialItems } from "../lib/site-nav";
import ContactSocialLinks from "./components/ContactSocialLinks";
import { FeaturedProjects } from "./components/featured";
import Hero from "./components/Hero";
import LazyContactForm from "./components/LazyContactForm";
import LazyCustomCursor from "./components/LazyCustomCursor";
import LazyStaggeredMenu from "./components/LazyStaggeredMenu";
import RevealManager from "./components/RevealManager";
import SectionHeader from "./components/SectionHeader";
import SiteFooter from "./components/SiteFooter";
import { projects } from "./data/projects";

/** Curated homepage selection — full archive lives on /work */
const FEATURED_SLUGS = [
  "nanas-biets",
  "od-architects",
  "interior-landscape-elegance",
  "99cafe",
] as const;

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: defaultPageTitle,
    description: SEO_PERSON.description,
    path: "/",
    keywords: [
      "Silent Code Massive Impact",
      "hire full-stack developer",
      "استئجار مطور ويب",
      "مواقع احترافية",
      "مطور Next.js",
    ],
    ogTitle: defaultOgTitle,
  }),
  title: { absolute: defaultPageTitle },
};

export default function Home() {
  const featuredProjects = FEATURED_SLUGS.map(
    (slug) => projects.find((p) => p.slug === slug)!
  );

  const methodSteps = [
    {
      step: "01",
      title: "Listen first",
      copy: "Goals, constraints, and what “done” actually means.",
    },
    {
      step: "02",
      title: "Shape the system",
      copy: "Structure, stack, and decisions that won’t rot in six months.",
    },
    {
      step: "03",
      title: "Build with restraint",
      copy: "Clean UI, fast code, nothing decorative without a job.",
    },
    {
      step: "04",
      title: "Ship & stay close",
      copy: "Launch, measure, refine — still reachable after go-live.",
    },
  ];

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
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen
        colors={["#060708", "#1a1c22", "#6b7280"]}
        accentColor="var(--button-border)"
        isFixed={true}
        closeOnClickAway
      />

      <Hero />

      <main className="relative z-10 mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-16">
        <section id="work" className="section-block" aria-label="Featured projects">
          <div className="reveal mb-8 sm:mb-10" data-reveal>
            <SectionHeader
              eyebrow="Featured Work"
              title="Selected projects. Elevated craft."
              description="Four pieces that define the standard — clarity, performance, and a premium digital presence."
              className="mb-0 max-w-2xl"
            />
          </div>

          <FeaturedProjects projects={featuredProjects} />
        </section>

        <section className="section-block">
          <div className="cta-banner reveal text-center" data-reveal>
            <div className="cta-banner-inner">
              <p className="eyebrow">Ready to start?</p>
              <h2 className="section-title mx-auto mt-3 max-w-2xl font-medium sm:mt-4">
                Let&apos;s build your next big thing.
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-[color:var(--muted)] sm:mt-4 sm:text-base">
                From idea to launch — clear process, high quality, and results you
                can measure.
              </p>
              <a
                href="#contact"
                className="btn-primary mt-6 inline-flex w-full max-w-xs justify-center px-8 py-3.5 sm:mt-8 sm:w-auto sm:py-4"
                data-cursor
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>

        <section className="section-block" aria-label="Method">
          <div className="method-layout">
            <div className="method-aside reveal" data-reveal>
              <p className="method-kicker">Method</p>
              <h2 className="method-heading">How the work happens.</h2>
            </div>

            <ol className="method-list">
              {methodSteps.map((item) => (
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
            eyebrow="Contact"
            title="Available for new projects."
            description="I take on a limited number of projects to keep quality high. Let's talk about yours."
          />

          <div className="contact-grid mt-8 sm:mt-12">
            <div className="space-y-3 sm:space-y-4">
              <div className="contact-info-item reveal" data-reveal>
                <div className="contact-info-icon" aria-hidden>
                  ✉
                </div>
                <div className="min-w-0">
                  <p className="eyebrow">Email</p>
                  <p className="mt-1 truncate text-sm text-white">
                    {SEO_PERSON.email}
                  </p>
                </div>
              </div>
              <div className="contact-info-item reveal" data-reveal>
                <div className="contact-info-icon" aria-hidden>
                  ◎
                </div>
                <div>
                  <p className="eyebrow">Location</p>
                  <p className="mt-1 text-sm text-white">Remote — Worldwide</p>
                </div>
              </div>
              <ContactSocialLinks />
            </div>

            <div className="reveal surface-card p-5 sm:p-8" data-reveal>
              <LazyContactForm />
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
