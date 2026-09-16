"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from "./StaggeredMenu";
import "./StaggeredMenu.css";

const StaggeredMenu = dynamic(() => import("./StaggeredMenu"), {
  ssr: false,
  loading: () => <MenuPlaceholder />,
});

type LazyStaggeredMenuProps = {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
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
    <div className="staggered-menu-wrapper fixed-wrapper" aria-hidden>
      <header className="sm-header-placeholder">
        <div className="sm-header-inner">
          <div className="sm-logo" />
          <nav className="sm-inline-nav" />
          <span className="sm-toggle">
            <span className="sm-toggle-textWrap">Menu</span>
            <span className="sm-toggle-mark" />
          </span>
        </div>
      </header>
    </div>
  );
}

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

  if (!ready) {
    return (
      <div className="lazy-staggered-menu-slot">
        <MenuPlaceholder />
      </div>
    );
  }

  return (
    <div className="lazy-staggered-menu-slot">
      <StaggeredMenu {...props} />
    </div>
  );
}
