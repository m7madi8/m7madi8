"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEO_PORTRAIT } from "../../lib/seo-config";
import s from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

type AboutProps = {
  liveCount: number;
};

const CHAPTERS = [
  {
    index: "A",
    title: "Both sides of the product.",
    body: "Business websites and custom web applications — plus the operational systems your team relies on behind the scenes.",
  },
  {
    index: "B",
    title: "Built to stay useful.",
    body: "Clear structure, clean UI, dependable infrastructure — nothing decorative without a job.",
  },
  {
    index: "C",
    title: "Close after launch.",
    body: "Ship, measure, refine. I stay reachable when the product is live.",
  },
] as const;

export default function About({ liveCount }: AboutProps) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);
  const railLine = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [activePanel, setActivePanel] = useState(0);

  useLayoutEffect(() => {
    const el = root.current;
    const trackEl = track.current;
    if (!el || !trackEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panels = panelsRef.current.filter(
      (panel): panel is HTMLElement => panel != null
    );

    if (reduce || panels.length === 0) {
      panels.forEach((panel) => {
        panel.style.opacity = "1";
        panel.style.transform = "none";
        panel.classList.add(s.panelActive);
      });
      return;
    }

    const syncActive = (index: number) => {
      if (activeRef.current === index) return;
      activeRef.current = index;
      setActivePanel(index);
      panels.forEach((panel, i) => {
        panel.classList.toggle(s.panelActive, i === index);
      });
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1023px)", () => {
        panels.forEach((panel, i) => {
          gsap.fromTo(
            panel,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 85%",
                once: true,
              },
              delay: i * 0.05,
            }
          );
        });
      });

      mm.add("(min-width: 1024px)", () => {
        syncActive(0);
        panels.forEach((panel, i) => {
          gsap.set(panel, i === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 });
        });

        const step = 1 / panels.length;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trackEl,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.55,
            onUpdate: (self) => {
              const idx = Math.min(
                panels.length - 1,
                Math.floor(self.progress * panels.length)
              );
              syncActive(idx);
            },
          },
        });

        for (let i = 1; i < panels.length; i++) {
          const at = step * i;
          tl.to(
            panels[i - 1],
            { opacity: 0, y: -28, duration: step * 0.4, ease: "power1.inOut" },
            at
          );
          tl.to(
            panels[i],
            { opacity: 1, y: 0, duration: step * 0.4, ease: "power1.inOut" },
            at
          );
        }

        if (photo.current) {
          gsap.fromTo(
            photo.current,
            { yPercent: 5, scale: 1.07 },
            {
              yPercent: -5,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: trackEl,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.65,
              },
            }
          );
        }

        if (railLine.current) {
          gsap.fromTo(
            railLine.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: trackEl,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.45,
              },
            }
          );
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const statLabel = String(liveCount).padStart(2, "0");

  return (
    <section
      ref={root}
      className={s.about}
      id="about"
      aria-labelledby="about-title"
    >
      <header className={s.head}>
        <div className={s.headMeta}>
          <span className={s.index} aria-hidden>02</span>
          <span className={s.label}>About</span>
        </div>
        <p className={s.headName} id="about-title">Mohammad Hroub</p>
      </header>

      <div ref={track} className={s.track}>
        <div className={s.sticky}>
          <figure className={s.visual}>
            <p className={s.visualGhost} aria-hidden>Hroub</p>
            <div className={s.frame}>
              <div ref={photo} className={s.photo}>
                <Image
                  src={SEO_PORTRAIT.webp}
                  alt={SEO_PORTRAIT.alt}
                  fill
                  sizes="(min-width: 1024px) 22rem, 88vw"
                  priority
                  style={{ objectFit: "cover", objectPosition: "50% 12%" }}
                />
              </div>
              <span className={s.plate}>Palestine · Remote worldwide</span>
            </div>
          </figure>

          <div className={s.narrative}>
            <div className={s.rail} aria-hidden>
              <div ref={railLine} className={s.railLine} />
              {CHAPTERS.map((chapter, i) => (
                <span
                  key={chapter.index}
                  className={`${s.railDot} ${
                    activePanel === i ? s.railDotActive : ""
                  }`}
                />
              ))}
            </div>

            <div className={s.panels}>
              {CHAPTERS.map((chapter, i) => (
                <article
                  key={chapter.index}
                  ref={(node) => {
                    if (node) panelsRef.current[i] = node;
                  }}
                  className={`${s.panel} ${
                    activePanel === i ? s.panelActive : ""
                  }`}
                >
                  <span className={s.panelIndex}>{chapter.index}</span>
                  <h3 className={s.panelTitle}>{chapter.title}</h3>
                  <p className={s.panelBody}>{chapter.body}</p>
                  {i === 2 && (
                    <>
                      <p className={s.panelStat}>{statLabel}</p>
                      <p className={s.panelStatLabel}>projects live on the web</p>
                      <a href="#contact" className={s.cta} data-cursor>
                        Start a project
                        <span aria-hidden>→</span>
                      </a>
                    </>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={s.footerLine} aria-hidden />
    </section>
  );
}
