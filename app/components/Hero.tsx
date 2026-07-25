"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const frame = requestAnimationFrame(() => {
      root.setAttribute("data-ready", "true");
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      ref={rootRef}
      className="hero-cinematic relative flex min-h-[100dvh] min-h-screen flex-col"
      aria-label="Introduction"
    >
      <div className="hero-scene" aria-hidden>
        <div className="hero-grid" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-24 pt-28 sm:px-8 sm:pb-28 sm:pt-32 lg:px-16 lg:pb-32">
        <div className="hero-copy w-full max-w-2xl">
          <p className="hero-role">Full-Stack Web Developer</p>

          <h1 className="hero-brand">Mohammad Hroub</h1>

          <p className="hero-headline">
            Silent Code.{" "}
            <span className="hero-line--muted">Massive Impact.</span>
          </p>

          <p className="hero-lede">
            I engineer modern, high-performance web systems — from concept to
            launch — built to scale and designed to impress.
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
      </div>
    </section>
  );
}
