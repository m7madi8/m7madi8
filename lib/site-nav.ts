import type { Locale } from "./i18n/config";
import {
  aboutHash,
  contactHash,
  homePath,
  workHash,
  workIndexPath,
} from "./i18n/paths";
import { getMessages } from "./i18n/messages";

export type StaggeredMenuItem = {
  label: string;
  ariaLabel: string;
  link: string;
};

export type StaggeredMenuSocialItem = {
  label: string;
  link: string;
};

export const headerLinks = [
  { num: "01", label: "Work", href: "/#work" },
  { num: "02", label: "About", href: "/#about" },
  { num: "03", label: "Method", href: "/#method" },
  { num: "04", label: "Contact", href: "/#contact" },
] as const;

export function getHeaderLinks(locale: Locale) {
  const m = getMessages(locale).nav;
  return [
    { num: "01", label: m.work, href: workHash(locale) },
    { num: "02", label: m.about, href: aboutHash(locale) },
    { num: "03", label: m.method, href: `${homePath(locale)}#method` },
    { num: "04", label: m.contact, href: contactHash(locale) },
  ];
}

export function getMenuItems(locale: Locale): StaggeredMenuItem[] {
  const m = getMessages(locale);
  const linksPath = locale === "ar" ? "/ar/links" : "/links";
  return [
    {
      label: m.nav.home,
      ariaLabel: m.navAria.home,
      link: homePath(locale),
    },
    {
      label: m.nav.projects,
      ariaLabel: m.navAria.projects,
      link: workIndexPath(locale),
    },
    {
      label: m.nav.about,
      ariaLabel: m.navAria.about,
      link: aboutHash(locale),
    },
    {
      label: m.nav.restaurants,
      ariaLabel: m.navAria.restaurants,
      link: "/restaurants",
    },
    {
      label: m.nav.links,
      ariaLabel: m.navAria.links,
      link: linksPath,
    },
    {
      label: m.nav.contact,
      ariaLabel: m.navAria.contact,
      link: contactHash(locale),
    },
    {
      label: m.nav.agreement,
      ariaLabel: m.navAria.agreement,
      link: "/agreement",
    },
  ];
}

/** @deprecated Use getMenuItems(locale) */
export const menuItems: StaggeredMenuItem[] = getMenuItems("en");

export const socialItems: StaggeredMenuSocialItem[] = [
  { label: "WhatsApp", link: "https://wa.me/972592132438" },
  { label: "Instagram", link: "https://www.instagram.com/mohammad._dev/" },
];
