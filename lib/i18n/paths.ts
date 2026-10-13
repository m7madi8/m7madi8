import type { Locale } from "./config";

/** Public routes that have a dedicated Arabic URL (no /ar prefix on English). */
const HAS_ARABIC_PAGE = new Set([
  "/",
  "/work",
  "/links",
]);

export function stripArabicPrefix(pathname: string): string {
  if (pathname === "/ar" || pathname === "/ar/") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function localizedPath(path: string, locale: Locale): string {
  const normalized =
    path === "" || path === "/"
      ? "/"
      : path.startsWith("/")
        ? path
        : `/${path}`;

  const enPath = normalized.startsWith("/ar")
    ? stripArabicPrefix(normalized)
    : normalized;

  if (locale === "en") {
    return enPath === "/" ? "/" : enPath;
  }

  if (enPath === "/") return "/ar";
  if (
    HAS_ARABIC_PAGE.has(enPath) ||
    enPath.startsWith("/work/")
  ) {
    return `/ar${enPath === "/" ? "" : enPath}`;
  }

  return "/ar";
}

export function workProjectPath(slug: string, locale: Locale): string {
  return locale === "ar" ? `/ar/work/${slug}` : `/work/${slug}`;
}

export function homePath(locale: Locale): string {
  return locale === "ar" ? "/ar" : "/";
}

export function workIndexPath(locale: Locale): string {
  return locale === "ar" ? "/ar/work" : "/work";
}

export function contactHash(locale: Locale): string {
  return `${homePath(locale)}#contact`;
}

export function workHash(locale: Locale): string {
  return `${homePath(locale)}#work`;
}

export function aboutHash(locale: Locale): string {
  return `${homePath(locale)}#about`;
}

export function methodHash(locale: Locale): string {
  return `${homePath(locale)}#method`;
}

/**
 * Map current pathname to the equivalent page in another locale.
 * Falls back to the language homepage when no Arabic page exists.
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const path = pathname.split("?")[0].split("#")[0];
  const enPath = stripArabicPrefix(path);
  const currentLocale: Locale = path.startsWith("/ar") ? "ar" : "en";

  if (currentLocale === target) {
    return path || "/";
  }

  return localizedPath(enPath, target);
}

export function hasArabicEquivalent(pathname: string): boolean {
  const enPath = stripArabicPrefix(pathname.split("?")[0].split("#")[0]);
  if (enPath === "/") return true;
  if (HAS_ARABIC_PAGE.has(enPath)) return true;
  if (enPath.startsWith("/work/") && enPath.length > "/work/".length) return true;
  return false;
}
