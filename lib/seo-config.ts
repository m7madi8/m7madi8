/**
 * إعدادات SEO مركزية — عربي + إنجليزي
 * النطاق: mohammadhroub.com (أو NEXT_PUBLIC_SITE_URL)
 */

import type { Metadata } from "next";
import { getBasePath, withBasePath } from "./base-path";

export const DEFAULT_SITE_URL = "https://mohammadhroub.com";

export const SEO_PERSON = {
  nameEn: "Mohammad Hroub",
  nameAr: "محمد حروب",
  jobTitle: "Full-Stack Web Developer",
  jobTitleAr: "مطور ويب Full-Stack",
  email: "eslamhuhu1@gmail.com",
  taglineEn:
    "Freelance full-stack developer — modern websites, high performance, clear delivery.",
  taglineAr:
    "مطور ويب مستقل — مواقع حديثة، أداء عالٍ، وتسليم احترافي.",
  descriptionEn:
    "Mohammad Hroub — Full-Stack Web Developer & freelancer. Portfolio showcasing React, Next.js, and scalable web apps. Available for remote projects worldwide.",
  descriptionAr:
    "محمد حروب — مطور ويب Full-Stack ومستقل. معرض أعمال React وNext.js وتطبيقات ويب قابلة للتوسع. متاح للمشاريع عن بُعد.",
  /** وصف مeta يجمع العربية والإنجليزية لمحركات البحث */
  description:
    "Mohammad Hroub | محمد حروب — Full-Stack Web Developer & freelance portfolio. React, Next.js, TypeScript. مطور ويب مستقل — تطوير مواقع احترافي.",
  sameAs: [
    "https://www.instagram.com/m7madi8/",
    "https://wa.me/972592132438",
  ] as string[],
} as const;

export const SEO_SITE = {
  nameEn: "Mohammad Hroub — Portfolio",
  nameAr: "محمد حروب — معرض الأعمال",
  shortName: "Mohammad Hroub",
} as const;

export const SEO_KEYWORDS = [
  "Mohammad Hroub",
  "محمد حروب",
  "Full-Stack Web Developer",
  "مطور ويب Full-Stack",
  "مطور ويب",
  "freelance web developer",
  "مطور مواقع مستقل",
  "Next.js developer",
  "React developer",
  "TypeScript developer",
  "portfolio",
  "معرض أعمال",
  "web development",
  "تطوير مواقع",
  "remote developer",
  "مطور عن بعد",
  "mohammadhroub.com",
  "Mohammad Hroub portfolio",
  "portfolio محمد حروب",
  "hire web developer",
  "تصميم وتطوير مواقع",
] as const;

/** أسئلة شائعة — FAQ schema لمحركات البحث (EN + AR) */
export const SEO_FAQ = [
  {
    questionEn: "Who is Mohammad Hroub?",
    questionAr: "من هو محمد حروب؟",
    answerEn:
      "Mohammad Hroub is a freelance Full-Stack Web Developer specializing in React, Next.js, and TypeScript — building fast, scalable websites and web apps for clients worldwide.",
    answerAr:
      "محمد حروب مطور ويب Full-Stack مستقل، متخصص في React وNext.js وTypeScript — يبني مواقع وتطبيقات ويب سريعة وقابلة للتوسع للعملاء حول العالم.",
  },
  {
    questionEn: "What services does Mohammad Hroub offer?",
    questionAr: "ما الخدمات التي يقدمها محمد حروب؟",
    answerEn:
      "Full-stack web development: custom websites, e-commerce, dashboards, API integration, performance optimization, and deployment — from discovery to launch.",
    answerAr:
      "تطوير ويب Full-Stack: مواقع مخصصة، متاجر إلكترونية، لوحات تحكم، ربط APIs، تحسين الأداء، والنشر — من التخطيط حتى الإطلاق.",
  },
  {
    questionEn: "Is Mohammad Hroub available for remote projects?",
    questionAr: "هل محمد حروب متاح للمشاريع عن بُعد؟",
    answerEn:
      "Yes. Mohammad works with clients remotely worldwide. Contact via email, WhatsApp, or Instagram to discuss your project.",
    answerAr:
      "نعم. يعمل محمد مع العملاء عن بُعد عالمياً. تواصل عبر البريد الإلكتروني أو واتساب أو إنستغرام لمناقشة مشروعك.",
  },
  {
    questionEn: "What technologies does Mohammad Hroub use?",
    questionAr: "ما التقنيات التي يستخدمها محمد حروب؟",
    answerEn:
      "React, Next.js, TypeScript, Node.js, Firebase, Tailwind CSS, and modern tooling for performance-focused, maintainable codebases.",
    answerAr:
      "React وNext.js وTypeScript وNode.js وFirebase وTailwind CSS وأدوات حديثة لبناء مشاريع سريعة وسهلة الصيانة.",
  },
] as const;

export const defaultPageTitle = "Mohammad Hroub";

export const defaultOgTitle =
  "Mohammad Hroub — Full-Stack Web Developer | محمد حروب";

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return DEFAULT_SITE_URL;
}

export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}

export function absoluteUrl(path: string = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${withBasePath(normalized)}`;
}

export function buildAlternates(path: string = ""): NonNullable<Metadata["alternates"]> {
  const canonical = withBasePath(path || "/");
  const url = absoluteUrl(path || "/");

  return {
    canonical,
    languages: {
      en: url,
      ar: url,
      "x-default": url,
    },
  };
}

const OG_IMAGE = {
  url: "/icon.png",
  width: 512,
  height: 512,
  alt: `${SEO_PERSON.nameEn} | ${SEO_PERSON.nameAr} — ${SEO_PERSON.jobTitle}`,
};

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogTitle?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
};

/** Metadata موحّد لكل الصفحات — hreflang + Open Graph + Twitter */
export function buildPageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  ogTitle,
  ogType = "website",
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path || "/");
  const allKeywords = [...new Set([...SEO_KEYWORDS, ...keywords])];

  return {
    title,
    description,
    keywords: allKeywords,
    authors: [{ name: SEO_PERSON.nameEn, url: getSiteUrl() }],
    creator: SEO_PERSON.nameEn,
    publisher: SEO_PERSON.nameEn,
    alternates: buildAlternates(path),
    openGraph: {
      type: ogType,
      locale: "en_US",
      alternateLocale: ["ar"],
      url,
      siteName: SEO_SITE.nameEn,
      title: ogTitle ?? title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description,
      images: [OG_IMAGE.url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large" as const,
            "max-snippet": -1,
          },
        },
    other: {
      "geo.region": "PS",
      "content-language": "en, ar",
    },
  };
}

export function getRootLayoutMetadata(): Metadata {
  const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined;

  return {
    metadataBase: getMetadataBase(),
    title: {
      default: defaultPageTitle,
      template: `%s | ${SEO_PERSON.nameEn}`,
    },
    description: SEO_PERSON.description,
    keywords: [...SEO_KEYWORDS],
    authors: [{ name: SEO_PERSON.nameEn, url: getSiteUrl() }],
    creator: SEO_PERSON.nameEn,
    publisher: SEO_PERSON.nameEn,
    category: "technology",
    icons: {
      icon: [{ url: "/icon.png", type: "image/png" }],
      apple: [{ url: "/icon.png", type: "image/png" }],
    },
    alternates: buildAlternates("/"),
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["ar"],
      url: getSiteUrl(),
      siteName: SEO_SITE.nameEn,
      title: defaultOgTitle,
      description: SEO_PERSON.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultOgTitle,
      description: SEO_PERSON.description,
      images: [OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification,
    other: {
      "content-language": "en, ar",
    },
  };
}

/** للتحقق من basePath في sitemap/robots */
export { getBasePath, withBasePath };
