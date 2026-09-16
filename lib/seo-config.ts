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
  jobTitle: "Full-Stack Developer — Websites & Operational Systems",
  jobTitleAr: "مطور Full-Stack — مواقع وأنظمة تشغيل رقمية",
  email: "eslamhuhu1@gmail.com",
  taglineEn:
    "Freelance full-stack developer — websites and the operational systems behind them.",
  taglineAr:
    "مطور ويب مستقل — مواقع وأنظمة تشغيل رقمية للأعمال.",
  descriptionEn:
    "Mohammad Hroub — Full-stack developer building websites and the operational systems behind them, for businesses worldwide.",
  descriptionAr:
    "محمد حروب — مطور ويب مستقل يبني مواقع وأنظمة تشغيل رقمية للأعمال حول العالم.",
  /** وصف مeta يجمع العربية والإنجليزية لمحركات البحث */
  description:
    "Mohammad Hroub | محمد حروب — Full-stack developer building websites and the operational systems behind them, for businesses worldwide. React, Next.js, TypeScript, Supabase. مطور ويب مستقل — مواقع وأنظمة تشغيل رقمية للأعمال.",
  sameAs: [
    "https://www.instagram.com/mohammad._dev/",
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
  "hire full-stack developer",
  "operational systems developer",
  "business dashboard developer",
  "تصميم وتطوير مواقع",
  "أنظمة تشغيل رقمية للأعمال",
] as const;

/** أسئلة شائعة — FAQ schema لمحركات البحث (EN + AR) */
export const SEO_FAQ = [
  {
    questionEn: "Who is Mohammad Hroub?",
    questionAr: "من هو محمد حروب؟",
    answerEn:
      "Mohammad Hroub is a freelance Full-Stack Developer specializing in React, Next.js, and TypeScript — building websites and the operational systems behind them for clients worldwide.",
    answerAr:
      "محمد حروب مطور Full-Stack مستقل، متخصص في React وNext.js وTypeScript — يبني مواقع وأنظمة تشغيل رقمية للأعمال حول العالم.",
  },
  {
    questionEn: "What services does Mohammad Hroub offer?",
    questionAr: "ما الخدمات التي يقدمها محمد حروب؟",
    answerEn:
      "Websites, operational systems, and digital products: custom sites, e-commerce, dashboards, workflows, API integration, and deployment — from discovery to launch.",
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
  "Mohammad Hroub — Websites & Operational Systems | محمد حروب";

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
  url: "/og.png",
  width: 1200,
  height: 630,
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
      icon: [
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [
        { url: "/apple-icon.png", type: "image/png", sizes: "512x512" },
      ],
      shortcut: ["/icon.png"],
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
