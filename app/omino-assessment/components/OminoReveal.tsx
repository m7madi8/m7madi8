"use client";

import { useEffect, useRef } from "react";

type RevealTag = "div" | "section" | "h1" | "h2" | "h3" | "p";

/**
 * Self-contained scroll-reveal, isolated to /omino-assessment.
 * Reuses the same `.reveal` / `.is-visible` CSS contract already defined
 * in globals.css, so motion looks consistent with the rest of the site
 * without depending on the page-level RevealManager (source not available).
 */
export default function OminoReveal({
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