"use client";

import type { Locale } from "../../lib/i18n/config";
import { getMenuItems, socialItems } from "../../lib/site-nav";
import LazyCustomCursor from "./LazyCustomCursor";
import LazyStaggeredMenu from "./LazyStaggeredMenu";
import RevealManager from "./RevealManager";

type PortfolioChromeProps = {
  locale: Locale;
};

export default function PortfolioChrome({ locale }: PortfolioChromeProps) {
  const menuPosition = locale === "ar" ? "left" : "right";

  return (
    <>
      <LazyCustomCursor />
      <RevealManager />
      <LazyStaggeredMenu
        locale={locale}
        position={menuPosition}
        items={getMenuItems(locale)}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        menuButtonColor="#ffffff"
        openMenuButtonColor="#ffffff"
        colors={["#060708", "#111318", "#1a1c22"]}
        accentColor="var(--button-border)"
        isFixed={true}
        closeOnClickAway
        changeMenuColorOnOpen={false}
      />
    </>
  );
}
