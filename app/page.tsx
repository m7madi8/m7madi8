import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logoMe from "../img/logo-me.png";
import {
  SEO_PERSON,
  buildPageMetadata,
  defaultOgTitle,
  defaultPageTitle,
} from "../lib/seo-config";
import { menuItems, socialItems } from "../lib/site-nav";
import ContactSocialLinks from "./components/ContactSocialLinks";
import Hero from "./components/Hero";
import LazyContactForm from "./components/LazyContactForm";
import LazyCustomCursor from "./components/LazyCustomCursor";
import LazyStaggeredMenu from "./components/LazyStaggeredMenu";
import RevealManager from "./components/RevealManager";
import SectionHeader from "./components/SectionHeader";
import SiteFooter from "./components/SiteFooter";
import { projects, isComingSoon } from "./data/projects";

const FEATURED_SLUGS = ["nanas-biets", "nawal-omar-yoga", "shape-up"] as const;

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

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      copy: "Analyze business goals, audience, and technical requirements to define a clear roadmap.",
    },
    {
      step: "02",
      title: "Architecture",
      copy: "Design scalable system structures, database logic, and a maintainable codebase.",
    },
    {
      step: "03",
      title: "Development",
      copy: "Build clean, performant code with attention to detail and best practices.",
    },
    {
      step: "04",
      title: "Launch",
      copy: "Test thoroughly, optimize for speed, and deploy a reliable digital product.",
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
        logoUrl={logoMe.src}
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
          <div
            className="reveal mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
            data-reveal
          >
            <SectionHeader
              eyebrow="Featured Work"
              title="Projects that speak for themselves."
              description="A selection of live launches — each built with performance, clarity, and craft in mind."
              className="mb-0 max-w-xl"
            />
            <Link
              href="/work"
              className="hero-btn shrink-0 self-start sm:self-auto"
              data-cursor
            >
              View all projects
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="projects-grid">
            {featuredProjects.map((project, index) => {
              const caseNumber =
                projects.findIndex((p) => p.slug === project.slug) + 1;
              const comingSoon = isComingSoon(project);

              return (
                <article
                  key={project.slug}
                  className={`reveal project-card-wrap ${index === 0 ? "project-card-wrap--featured" : "project-card-wrap--standard"}`}
                  data-reveal
                >
                  <div
                    className={`project-card ${index === 0 ? "project-card--featured" : ""}`}
                  >
                    <Link
                      href={`/work/${project.slug}`}
                      className={`project-card-image relative block ${index === 0 ? "project-card-image--featured aspect-[16/10] sm:aspect-[16/9]" : "project-card-image--standard"}`}
                      data-cursor
                      aria-label={`${project.title} preview`}
                    >
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes={
                            index === 0
                              ? "(max-width: 1024px) 100vw, 55vw"
                              : "(max-width: 1024px) 100vw, 28vw"
                          }
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--surface)] text-xs uppercase tracking-widest text-[color:var(--muted)]">
                          {project.title}
                        </div>
                      )}
                    </Link>
                    <div className="project-card-content">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <p className="eyebrow text-[0.7rem] sm:text-[0.8rem]">
                          {String(caseNumber).padStart(2, "0")}
                        </p>
                        {comingSoon ? (
                          <span className="badge">In development</span>
                        ) : (
                          <span className="badge badge-live">Live</span>
                        )}
                      </div>
                      <h3 className="mt-2 text-lg font-medium text-white sm:text-xl">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-xs text-[color:var(--muted)] sm:text-sm">
                        {project.context}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[color:var(--muted)]">
                        {project.summary}
                      </p>
                      <Link
                        href={`/work/${project.slug}`}
                        className="project-card-btn"
                        data-cursor
                      >
                        View project
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
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

        <section className="section-block">
          <SectionHeader
            eyebrow="How I Work"
            title="A process built for clarity."
            description="Every project follows a structured approach — no surprises, no shortcuts."
          />
          <div className="process-grid mt-8 sm:mt-12">
            {processSteps.map((item) => (
              <div key={item.step} className="process-step reveal" data-reveal>
                <span className="process-step-number">{item.step}</span>
                <h3 className="mt-4 text-base font-medium text-white sm:mt-5 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                  {item.copy}
                </p>
              </div>
            ))}
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
