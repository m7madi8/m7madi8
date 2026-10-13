"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "../../lib/i18n/config";
import { switchLocalePath } from "../../lib/i18n/paths";
import { getMessages } from "../../lib/i18n/messages";
import "./LanguageSwitcher.css";

type LanguageSwitcherProps = {
  locale: Locale;
  /** menu = داخل لوحة القائمة · inline = بجانب عناصر الصفحة */
  variant?: "menu" | "inline";
  className?: string;
};

export default function LanguageSwitcher({
  locale,
  variant = "menu",
  className = "",
}: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const target: Locale = locale === "ar" ? "en" : "ar";
  const href = switchLocalePath(pathname, target);
  const m = getMessages(locale).langSwitch;
  const label = target === "ar" ? m.shortAr : m.shortEn;

  return (
    <Link
      href={href}
      className={`lang-switch lang-switch--${variant} ${className}`.trim()}
      hrefLang={target}
      lang={target}
      data-cursor
      aria-label={`${m.label}: ${label}`}
    >
      {variant === "menu" ? (
        <>
          <span className="lang-switch-menu-kicker">{m.menuKicker}</span>
          <span className="lang-switch-menu-label">{label}</span>
        </>
      ) : (
        label
      )}
    </Link>
  );
}
