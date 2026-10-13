"use client";

import {
  useLayoutEffect,
  useMemo,
  useRef,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollFloat.css";

gsap.registerPlugin(ScrollTrigger);

const ARABIC_RE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

type ScrollFloatProps = {
  children: ReactNode;
  as?: ElementType;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
};

function containsArabic(text: string): boolean {
  return ARABIC_RE.test(text);
}

export default function ScrollFloat({
  children,
  as: Tag = "h2",
  scrollContainerRef,
  className = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLElement>(null);
  const text = typeof children === "string" ? children : "";
  const useWordAnimation = text.length > 0 && containsArabic(text);

  const splitText = useMemo(() => {
    if (!text) return children;

    if (useWordAnimation) {
      const parts = text.split(/(\s+)/);
      return parts.map((part, partIndex) => {
        if (/^\s+$/.test(part)) {
          return (
            <span className="scroll-float-space" key={`s-${partIndex}`}>
              {"\u00A0"}
            </span>
          );
        }
        return (
          <span className="scroll-float-word scroll-float-word--ar" key={`w-${partIndex}`}>
            {part}
          </span>
        );
      });
    }

    const parts = text.split(/(\s+)/);
    return parts.map((part, partIndex) => {
      if (/^\s+$/.test(part)) {
        return (
          <span className="scroll-float-space" key={`s-${partIndex}`}>
            {"\u00A0"}
          </span>
        );
      }

      return (
        <span className="scroll-float-word" key={`w-${partIndex}`}>
          {part.split("").map((char, charIndex) => (
            <span className="char" key={`${partIndex}-${charIndex}`}>
              {char}
            </span>
          ))}
        </span>
      );
    });
  }, [children, text, useWordAnimation]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const scroller =
      scrollContainerRef?.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll(".char");
    const wordElements = el.querySelectorAll(".scroll-float-word--ar");
    const targets =
      wordElements.length > 0 ? wordElements : charElements;
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, yPercent: useWordAnimation ? 40 : 120 },
        {
          opacity: 1,
          yPercent: 0,
          ease,
          duration: animationDuration,
          stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
    useWordAnimation,
  ]);

  if (typeof children !== "string") {
    return (
      <Tag ref={containerRef as never} className={`scroll-float ${className}`.trim()}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag ref={containerRef as never} className={`scroll-float ${className}`.trim()}>
      <span className={`scroll-float-text ${textClassName}`.trim()}>
        {splitText}
      </span>
    </Tag>
  );
}
