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
import HomeCta from "./components/HomeCta";
import HomeSignature from "./components/HomeSignature";
import LazyContactForm from "./components/LazyContactForm";
import LazyCustomCursor from "./components/LazyCustomCursor";
import LazyStaggeredMenu from "./components/LazyStaggeredMenu";
import RevealManager from "./components/RevealManager";
import ScrollFloat from "./components/ScrollFloat";
import SectionHeader from "./components/SectionHeader";
import SiteFooter from "./components/SiteFooter";
import { getLiveProjects, projects } from "./data/projects";

/** Curated homepage selection — full archive lives on /work */
const FEATURED_SLUGS = [
  "omino",
  "nanas-biets",
  "od-architects",
  "99cafe",
  "nawal-omar-yoga",
] as const;

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: defaultPageTitle,
    description: SEO_PERSON.description,
    path: "/",
    keywords: [
      "Silent Code Massive Impact",
      "hire full-stack developer",
      "operational systems developer",
      "business dashboard developer",
      "استئجار مطور ويب",
      "أنظمة تشغيل رقمية للأعمال",
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
      copy: "Structure, stack, and the decisions — screens, data, workflows — that won’t rot in six months.",
    },
    {
      step: "03",
      title: "Build with restraint",
      copy: "Clean UI, reliable systems, nothing decorative without a job.",
    },
    {
      step: "04",
      title: "Ship & stay close",
      copy: "Launch, measure, refine — still reachable after go-live.",
    },
  ];

  const liveCount = getLiveProjects().length;

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
        colors={["#060708", "#111318", "#1a1c22"]}
        accentColor="var(--button-border)"
        isFixed={true}
        closeOnClickAway
        changeMenuColorOnOpen={false}
      />

      <HomeSignature>
        <Hero />
      </HomeSignature>

      <main className="relative z-10 mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-16">
        <section id="work" className="section-block" aria-label="Featured projects">
          <SectionHeader
            index="01"
            eyebrow="Featured Work"
            title="Different problems. One standard."
            description="Five projects, two kinds of problems — the experience customers see, and the systems running behind it."
            className="mb-8 sm:mb-10"
          />

          <FeaturedProjects projects={featuredProjects} />
        </section>

        <HomeCta liveCount={liveCount} />

        <section id="method" className="section-block" aria-label="Method">
          <div className="method-layout">
            <div className="method-aside">
              <div className="section-eyebrow-row reveal" data-reveal>
                <span className="section-index" aria-hidden>
                  02
                </span>
                <p className="method-kicker">Method</p>
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
                How the work happens.
              </ScrollFloat>
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
            index="03"
            eyebrow="Contact"
            title="Have a business that needs better digital infrastructure?"
            description="I take on a limited number of projects to keep quality high — websites, operational systems, or both. Let's talk about yours."
          />

          <div className="contact-layout">
            <div className="contact-aside">
              <a
                className="contact-action reveal"
                data-reveal
                href={`mailto:${SEO_PERSON.email}`}
                data-cursor
              >
                <span className="contact-action-index">01</span>
                <span className="contact-action-copy">
                  <span className="contact-action-label">Email</span>
                  <span className="contact-action-value">{SEO_PERSON.email}</span>
                </span>
                <span className="contact-action-go">Write</span>
              </a>
              <div className="contact-action contact-action--static reveal" data-reveal>
                <span className="contact-action-index">02</span>
                <span className="contact-action-copy">
                  <span className="contact-action-label">Location</span>
                  <span className="contact-action-value">Remote — Worldwide</span>
                </span>
                <span className="contact-action-go">Open</span>
              </div>
              <ContactSocialLinks />
            </div>

            <div className="reveal" data-reveal>
              <LazyContactForm />
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
