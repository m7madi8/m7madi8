"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, [data-cursor]";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (event: MouseEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
    };

    const setActive = () => cursor.classList.add("is-active");
    const clearActive = () => cursor.classList.remove("is-active");

    const bindInteractive = () => {
      const nodes = document.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTOR);
      nodes.forEach((node) => {
        node.addEventListener("mouseenter", setActive);
        node.addEventListener("mouseleave", clearActive);
        node.addEventListener("focus", setActive);
        node.addEventListener("blur", clearActive);
      });
      return () => {
        nodes.forEach((node) => {
          node.removeEventListener("mouseenter", setActive);
          node.removeEventListener("mouseleave", clearActive);
          node.removeEventListener("focus", setActive);
          node.removeEventListener("blur", clearActive);
        });
      };
    };

    const cleanupInteractive = bindInteractive();

    window.addEventListener("mousemove", onMove);

    let frame = 0;
    const animate = () => {
      position.current.x += (target.current.x - position.current.x) * 0.15;
      position.current.y += (target.current.y - position.current.y) * 0.15;
      cursor.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cleanupInteractive();
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={cursorRef} className="cursor-dot" aria-hidden="true" />;
}
