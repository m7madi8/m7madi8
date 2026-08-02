import Link from "next/link";
import type { CSSProperties } from "react";
import "./brand-mark.css";

export type BrandMarkTone = "light" | "dark" | "gray" | "inherit";
export type BrandMarkSize = "xs" | "sm" | "md" | "lg" | "xl" | "display";

type BrandMarkProps = {
  href?: string | null;
  tone?: BrandMarkTone;
  size?: BrandMarkSize;
  animate?: boolean;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
};

/**
 * Typographic brand mark: m.
 * Quiet luxury — League Spartan, no ornaments.
 */
export default function BrandMark({
  href = "/",
  tone = "light",
  size = "md",
  animate = true,
  className = "",
  style,
  "aria-label": ariaLabel = "m. — Home",
}: BrandMarkProps) {
  const classes = [
    "brand-mark",
    `brand-mark--${tone}`,
    `brand-mark--${size}`,
    animate ? "brand-mark--animate" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const glyph = (
    <span className="brand-mark-glyph" aria-hidden>
      <span className="brand-mark-m">m</span>
      <span className="brand-mark-dot">.</span>
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        style={style}
        aria-label={ariaLabel}
        data-cursor
      >
        {glyph}
      </Link>
    );
  }

  return (
    <span className={classes} style={style} aria-label={ariaLabel} role="img">
      {glyph}
    </span>
  );
}
