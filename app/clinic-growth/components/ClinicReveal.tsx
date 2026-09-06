"use client";

import { useEffect, useRef } from "react";

/**
 * Self-contained scroll-reveal, isolated to /clinic-growth.
 *
 * The rest of the site uses a page-level `RevealManager` that toggles
 * `.is-visible` on any `[data-reveal]` element. We don't have that
 * component's source, so rather than guess at an import, this renders
 * its own IntersectionObserver against the exact same CSS contract
 * already defined in globals.css (`.reveal` / `.reveal.is-visible`),
 * so the motion is visually identical without a hidden dependency.
 */
type RevealTag = "div" | "section" | "h1" | "h2" | "h3" | "p";

export default function ClinicReveal({
  children,
  className = "",
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: RevealTag;
  [key: `data-${string}`]: string | undefined;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "-40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal ${className}`}
      data-reveal
      {...rest}
    >
      {children}
    </Tag>
  );
}
