"use client";

import dynamic from "next/dynamic";
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

export default function LazyStaggeredMenu(props: LazyStaggeredMenuProps) {
  return <StaggeredMenu {...props} />;
}
