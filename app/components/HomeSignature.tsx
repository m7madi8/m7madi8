"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HomeSignatureProps = {
  children: ReactNode;
};

export default function HomeSignature({ children }: HomeSignatureProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [".hero-ghost-word", ".hero-copy", ".hero-scroll-mark", ".hero-scene"],
          { clearProps: "all" }
        );
      });

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 0.85,
              invalidateOnRefresh: true,
            },
          });

          tl.to(
            ".hero-ghost-word",
            { scale: 1.42, yPercent: -16, opacity: 0, ease: "none" },
            0
          )
            .to(".hero-copy", { y: -32, opacity: 0.18, ease: "none" }, 0)
            .to(
              ".hero-scroll-mark",
              {
                scaleY: 14,
                opacity: 0,
                transformOrigin: "top center",
                ease: "none",
              },
              0
            )
            .to(".hero-scene", { opacity: 0.12, ease: "none" }, 0);
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="home-signature">
      <div className="home-signature-sticky">{children}</div>
    </div>
  );
}
