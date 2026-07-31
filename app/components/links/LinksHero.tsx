"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LinksHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.setAttribute("data-ready", "true");
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => root.setAttribute("data-ready", "true"),
      });

      tl.fromTo(
        ".links-hero-eyebrow",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        0.1
      )
        .fromTo(
          ".links-hero-line",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.85, stagger: 0.08 },
          0.16
        )
        .fromTo(
          ".links-hero-lede",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.4
        )
        .fromTo(
          ".links-hero-meta span",
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.05 },
          0.55
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={rootRef} className="links-hero" aria-label="Identity">
      <p className="links-hero-eyebrow">Mohammad Hroub · Creative Developer</p>

      <h1 className="links-hero-title">
        <span className="links-hero-clip">
          <span className="links-hero-line">Silent code.</span>
        </span>
        <span className="links-hero-clip">
          <span className="links-hero-line links-hero-line--accent">
            Massive impact.
          </span>
        </span>
      </h1>

      <p className="links-hero-lede">
        Premium digital products — from first concept to polished launch.
      </p>

      <div className="links-hero-meta">
        <span>Full-Stack</span>
        <span className="links-hero-dot" aria-hidden />
        <span>Next.js · React</span>
        <span className="links-hero-dot" aria-hidden />
        <span>Remote</span>
      </div>
    </header>
  );
}
