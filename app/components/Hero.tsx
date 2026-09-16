"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.setAttribute("data-ready", "true");
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.set(root, { attr: { "data-ready": "true" } })
        .from(
          ".hero-brand-line",
          {
            clipPath: "inset(0 100% 0 0)",
            duration: 0.85,
            stagger: 0.14,
            ease: "expo.out",
          }
        )
        .from(
          [".hero-headline-mono", ".hero-headline-serif"],
          { opacity: 0, y: 8, duration: 0.5, stagger: 0.08 },
          "-=0.35"
        )
        .from(".hero-lede", { opacity: 0, y: 10, duration: 0.55 }, "-=0.25")
        .from(".hero-actions", { opacity: 0, y: 10, duration: 0.55 }, "-=0.35")
        .from(".hero-ghost-word", { opacity: 0, duration: 1.1 }, "-=0.7")
        .from(
          ".hero-scroll-mark",
          { opacity: 0, y: 8, duration: 0.45 },
          "-=0.85"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="hero-cinematic relative flex min-h-[100dvh] flex-col"
      aria-label="Introduction"
    >
      <div className="hero-scene" aria-hidden>
        <div className="hero-grid" />
      </div>

      <div className="hero-main relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 sm:px-8 lg:px-16">
        <div className="hero-copy w-full max-w-3xl">
          <h1 className="hero-brand hero-brand--serif">
            <span className="hero-brand-line">Mohammad</span>
            <span className="hero-brand-line">Hroub</span>
          </h1>

          <p className="hero-headline">
            <span className="hero-headline-mono">silent code /</span>{" "}
            <span className="hero-headline-serif">massive impact.</span>
          </p>

          <p className="hero-lede">
            I build the websites businesses show customers, and the systems they
            run on behind the scenes — from the first line of code to the
            dashboard your team opens every morning.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="hero-btn" data-cursor>
              Start a Project
            </a>
            <Link href="/work" className="hero-btn hero-btn--ghost" data-cursor>
              View My Work
            </Link>
          </div>
        </div>

        <div className="hero-field">
          <p className="hero-ghost" aria-hidden>
            <span className="hero-ghost-word">Hroub</span>
          </p>
          <a href="#work" className="hero-scroll-mark" data-cursor>
            <span className="hero-scroll-line" aria-hidden />
            <span className="hero-scroll-label">Scroll</span>
          </a>
        </div>
      </div>
    </section>
  );
}
