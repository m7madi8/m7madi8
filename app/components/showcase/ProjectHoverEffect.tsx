"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";

type ProjectHoverEffectProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  disabled?: boolean;
};

/**
 * Subtle depth tilt + spotlight tracking for premium project cards.
 */
export default function ProjectHoverEffect({
  children,
  className = "",
  intensity = 8,
  disabled = false,
}: ProjectHoverEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const target = useRef({ rx: 0, ry: 0, x: 50, y: 50 });
  const current = useRef({ rx: 0, ry: 0, x: 50, y: 50 });

  const tick = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    current.current.rx += (target.current.rx - current.current.rx) * 0.12;
    current.current.ry += (target.current.ry - current.current.ry) * 0.12;
    current.current.x += (target.current.x - current.current.x) * 0.12;
    current.current.y += (target.current.y - current.current.y) * 0.12;
    el.style.setProperty("--tilt-x", `${current.current.rx.toFixed(3)}deg`);
    el.style.setProperty("--tilt-y", `${current.current.ry.toFixed(3)}deg`);
    el.style.setProperty("--spot-x", `${current.current.x.toFixed(1)}%`);
    el.style.setProperty("--spot-y", `${current.current.y.toFixed(1)}%`);
    frame.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (disabled) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none)").matches;
    if (reduce || coarse) return;
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [disabled, tick]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    target.current = {
      ry: (px - 0.5) * intensity,
      rx: (0.5 - py) * intensity,
      x: px * 100,
      y: py * 100,
    };
  };

  const onLeave = () => {
    target.current = { rx: 0, ry: 0, x: 50, y: 50 };
  };

  return (
    <div
      ref={ref}
      className={`project-hover ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
