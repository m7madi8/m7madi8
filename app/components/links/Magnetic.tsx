"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export default function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const tick = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    current.current.x += (target.current.x - current.current.x) * 0.16;
    current.current.y += (target.current.y - current.current.y) * 0.16;
    el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
    frame.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [tick]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    target.current = { x: dx * strength, y: dy * strength };
  };

  const onLeave = () => {
    target.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={ref}
      className={`links-magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
