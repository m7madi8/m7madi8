"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type LiquidEtherDefault from "./LiquidEther";

const staticBgClass =
  "absolute inset-0 min-h-screen bg-[radial-gradient(ellipse_120%_80%_at_50%_100%,#1a1d24_0%,#08090a_45%,#08090a_100%)]";

const LiquidEther = dynamic(() => import("./LiquidEther"), {
  ssr: false,
  loading: () => <div className={staticBgClass} aria-hidden />,
});

export type HeroBackgroundProps = React.ComponentProps<typeof LiquidEtherDefault>;

/**
 * يؤجل تحميل Three.js حتى بعد أول رسمة (idle) لتحسين TBT و LCP في Lighthouse.
 * يعرض خلفية ثابتة عند prefers-reduced-motion.
 */
export default function HeroBackground(props: HeroBackgroundProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [loadWebgl, setLoadWebgl] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mqReduce.matches) {
      setReducedMotion(true);
      return;
    }

    const mqMobile = window.matchMedia("(max-width: 768px)");
    setIsMobile(mqMobile.matches);
    const onMobile = () => setIsMobile(mqMobile.matches);
    mqMobile.addEventListener("change", onMobile);

    let cancelled = false;
    const start = () => {
      if (!cancelled) setLoadWebgl(true);
    };

    let idleId: number | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: 2200 });
    } else {
      fallbackTimer = setTimeout(start, 350);
    }

    return () => {
      cancelled = true;
      mqMobile.removeEventListener("change", onMobile);
      if (idleId != undefined) window.cancelIdleCallback(idleId);
      if (fallbackTimer != undefined) clearTimeout(fallbackTimer);
    };
  }, []);

  if (reducedMotion) {
    return <div className={staticBgClass} aria-hidden />;
  }

  if (!loadWebgl) {
    return <div className={staticBgClass} aria-hidden />;
  }

  const iterationsViscous = isMobile ? 18 : (props.iterationsViscous ?? 32);
  const iterationsPoisson = isMobile ? 18 : (props.iterationsPoisson ?? 32);
  const resolution = isMobile ? 0.38 : (props.resolution ?? 0.5);

  return (
    <LiquidEther
      {...props}
      iterationsViscous={iterationsViscous}
      iterationsPoisson={iterationsPoisson}
      resolution={resolution}
    />
  );
}
