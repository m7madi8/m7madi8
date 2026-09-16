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

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
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
  }, [children]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const scroller =
      scrollContainerRef?.current ? scrollContainerRef.current : window;
    const charElements = el.querySelectorAll(".char");
    if (charElements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        charElements,
        {
          willChange: "opacity, transform",
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: "50% 0%",
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
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
  ]);

  return (
    <Tag ref={containerRef as never} className={`scroll-float ${className}`.trim()}>
      <span className={`scroll-float-text ${textClassName}`.trim()}>
        {splitText}
      </span>
    </Tag>
  );
}
