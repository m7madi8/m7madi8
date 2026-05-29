"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from "./StaggeredMenu";

const StaggeredMenu = dynamic(() => import("./StaggeredMenu"), {
  ssr: false,
  loading: () => (
    <div
      className="fixed right-6 top-8 z-[100] h-11 w-11 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm sm:right-10"
      aria-hidden
    />
  ),
});

type LazyStaggeredMenuProps = {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
};

function MenuPlaceholder() {
  return (
    <div
      className="fixed right-6 top-8 z-[100] h-11 w-11 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm sm:right-10"
      aria-hidden
    />
  );
}

/**
 * Defers GSAP menu until idle / first interaction to reduce TBT and LCP impact.
 */
export default function LazyStaggeredMenu(props: LazyStaggeredMenuProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const activate = () => {
      if (!cancelled) setReady(true);
    };

    const onInteract = () => {
      activate();
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("scroll", onInteract);
    };

    window.addEventListener("pointerdown", onInteract, { once: true, passive: true });
    window.addEventListener("keydown", onInteract, { once: true });
    window.addEventListener("scroll", onInteract, { once: true, passive: true });

    const idleId =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(activate, { timeout: 3500 })
        : window.setTimeout(activate, 3500);

    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("scroll", onInteract);
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId as number);
      } else {
        window.clearTimeout(idleId as number);
      }
    };
  }, []);

  if (!ready) return <MenuPlaceholder />;
  return <StaggeredMenu {...props} />;
}
