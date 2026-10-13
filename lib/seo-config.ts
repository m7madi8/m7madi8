/**
 * إعدادات SEO مركزية — عربي + إنجليزي
 * النطاق: mohammadhroub.com (أو NEXT_PUBLIC_SITE_URL)
 */

import type { Metadata } from "next";
import type { Locale } from "./i18n/config";
import {
  hasArabicEquivalent,
  localizedPath,
  stripArabicPrefix,
} from "./i18n/paths";
import { getBasePath, withBasePath } from "./base-path";

export const DEFAULT_SITE_URL = "https://mohammadhroub.com";

export const SEO_PERSON = {
  nameEn: "Mohammad Hroub",
  nameAr: "محمد حروب",
  givenName: "Mohammad",
  familyName: "Hroub",
  jobTitle: "Full-Stack Developer — Websites & Operational Systems",
  jobTitleAr: "مطور Full-Stack — مواقع وأنظمة تشغيل رقمية",
  email: "eslamhuhu1@gmail.com",
  taglineEn:
    "Freelance full-stack developer — websites and the operational systems behind them.",
  taglineAr:
    "مطور ويب مستقل — مواقع وأنظمة تشغيل رقمية للأعمال.",
  descriptionEn:
    "Mohammad Hroub (محمد حروب) — Full-stack developer in Palestine building business websites, custom web applications, and operational systems. Remote work across Hebron, Ramallah, and international clients. mohammadhroub.com",
  descriptionAr:
    "محمد حروب (Mohammad Hroub) — مطور ويب Full-Stack في فلسطين يبني مواقع أعمال، تطبيقات ويب مخصصة، وأنظمة تشغيل رقمية. عمل عن بُعد من الخليل ورام الله ومع عملاء دوليين.",
  /** وصف meta يجمع العربية والإنجليزية لمحركات البحث */
  description:
    "Mohammad Hroub | محمد حروب — Full-stack developer in Palestine. Business websites, custom web apps, operational systems. React, Next.js, TypeScript, Firebase. مطور ويب في فلسطين — الخليل، رام الله، وعالمياً. mohammadhroub.com",
  sameAs: [
    "https://www.instagram.com/mohammad._dev/",
    "https://wa.me/972592132438",
  ] as string[],
  /** أسماء وبدائل بحث شائعة (بدون حشو) */
  alternateNames: [
    "محمد حروب",
    "Mohammad Hroub developer",
    "Mohammad Hroub portfolio",
    "Mohamed Hroub",
    "Mohammed Hroub",
    "mohammadhroub",
    "mohammadhroub.com",
    "موقع محمد حروب",
    "معرض أعمال محمد حروب",
    "مطور محمد حروب",
    "Silent Code Massive Impact",
  ] as string[],
} as const;

export const SEO_SITE = {
  nameEn: "Mohammad Hroub — Portfolio",
  nameAr: "محمد حروب — معرض الأعمال",
  shortName: "Mohammad Hroub",
} as const;

export const SEO_PORTRAIT = {
  jpeg: "/mohammad-hroub-portrait.jpg",
  webp: "/mohammad-hroub-portrait.webp",
  width: 1200,
  height: 1200,
  alt: "Mohammad Hroub | محمد حروب — Full-Stack Developer portrait",
} as const;

export const SEO_OG = {
  png: "/og.png",
  webp: "/og.webp",
  width: 1200,
  height: 630,
  alt: "Mohammad Hroub | محمد حروب — Websites & Operational Systems",
} as const;

export const SEO_KEYWORDS = [
  "Mohammad Hroub",
  "محمد حروب",
  "Mohammad Hroub developer",
  "Mohammad Hroub portfolio",
  "Mohamed Hroub",
  "mohammadhroub",
  "mohammadhroub.com",
  "موقع محمد حروب",
  "معرض أعمال محمد حروب",
  "مطور محمد حروب",
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
  "hire web developer",
  "hire full-stack developer",
  "operational systems developer",
  "business dashboard developer",
  "تصميم وتطوير مواقع",
  "أنظمة تشغيل رقمية للأعمال",
  "Silent Code Massive Impact",
  "مطور Next.js",
  "مطور React فلسطين",
  "Palestine web developer",
  "web developer Palestine",
  "web developer Hebron",
  "web developer Ramallah",
  "مطور ويب فلسطين",
  "مطور مواقع فلسطين",
  "مبرمج مواقع في الخليل",
  "مطور ويب في رام الله",
  "custom web application development",
  "business operations software",
  "internal business tools developer",
] as const;

/** مناطق خدمة فعلية — بدون عنوان مكتب وهمي */
export const SEO_GEO = {
  countryEn: "Palestine",
  countryAr: "فلسطين",
  citiesEn: ["Hebron", "Ramallah"] as const,
  citiesAr: ["الخليل", "رام الله"] as const,
  remoteNoteEn: "Remote projects for suitable international clients",
  remoteNoteAr: "مشاريع عن بُعد للعملاء المناسبين دولياً",
} as const;

export const SEO_SERVICES = [
  "Business website development",
  "Custom web applications",
  "Internal operational systems",
  "UI implementation",
  "React and Next.js development",
  "تطوير مواقع للأعمال",
  "تطبيقات ويب مخصصة",
  "أنظمة تشغيل داخلية للأعمال",
] as const;

export function personEntityId(siteUrl?: string): string {
  return `${siteUrl ?? getSiteUrl()}/#person`;
}

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
    questionEn: "What is Mohammad Hroub's website?",
    questionAr: "ما هو موقع محمد حروب؟",
    answerEn:
      "The official portfolio is mohammadhroub.com — showcasing selected projects, services, and contact details.",
    answerAr:
      "الموقع الرسمي هو mohammadhroub.com — يعرض مشاريع مختارة، الخدمات، ووسائل التواصل.",
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
  {
    questionEn: "Is Mohammad Hroub a web developer in Palestine?",
    questionAr: "هل محمد حروب مطور ويب في فلسطين؟",
    answerEn:
      "Yes. Mohammad Hroub is based in Palestine with relevance to Hebron and Ramallah, and also works remotely with suitable international clients.",
    answerAr:
      "نعم. محمد حروب يعمل من فلسطين مع ارتباط عملي بالخليل ورام الله، ويقدم أيضاً مشاريع عن بُعد للعملاء المناسبين دولياً.",
  },
] as const;

export const defaultPageTitle = "Mohammad Hroub | محمد حروب";

export const defaultOgTitle =
  "Mohammad Hroub — Websites & Operational Systems | محمد حروب";

function isVercelAppHost(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

/**
 * Public origin for canonical, Open Graph, sitemap, robots, and JSON-LD.
 *
 * Production source of truth: https://mohammadhroub.com (`DEFAULT_SITE_URL`).
 * Set `NEXT_PUBLIC_SITE_URL` to that value on the host, or leave it unset.
 * A different custom domain is allowed. A `*.vercel.app` value is not: that
 * host can be deployment-protected and send `noindex`.
 *
 * `VERCEL_URL` is never read. It is the deployment hostname, not the public site.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  const production = process.env.NODE_ENV === "production";

  if (configured && !(production && isVercelAppHost(configured))) {
    return configured;
  }
  if (!production) {
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

export function buildAlternates(
  path: string = "",
  locale: Locale = "en"
): NonNullable<Metadata["alternates"]> {
  const raw = path || "/";
  const enPath = stripArabicPrefix(raw);
  const canonicalPath = localizedPath(enPath, locale);
  const canonical = withBasePath(canonicalPath === "/" ? "/" : canonicalPath);
  const enUrl = absoluteUrl(localizedPath(enPath, "en"));
  const languages: Record<string, string> = {
    en: enUrl,
    "x-default": enUrl,
  };

  if (hasArabicEquivalent(enPath)) {
    languages.ar = absoluteUrl(localizedPath(enPath, "ar"));
  }

  return {
    canonical,
    languages,
  };
}

export function getOpenGraphImages(): NonNullable<
  Metadata["openGraph"]
>["images"] {
  return [
    {
      url: SEO_OG.png,
      secureUrl: absoluteUrl(SEO_OG.png),
      width: SEO_OG.width,
      height: SEO_OG.height,
      alt: SEO_OG.alt,
      type: "image/png",
    },
    {
      url: SEO_PORTRAIT.jpeg,
      secureUrl: absoluteUrl(SEO_PORTRAIT.jpeg),
      width: SEO_PORTRAIT.width,
      height: SEO_PORTRAIT.height,
      alt: SEO_PORTRAIT.alt,
      type: "image/jpeg",
    },
  ];
}

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogTitle?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  locale?: Locale;
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
  locale = "en",
}: BuildMetadataOptions): Metadata {
  const canonicalPath = localizedPath(stripArabicPrefix(path || "/"), locale);
  const url = absoluteUrl(canonicalPath === "/" ? "/" : canonicalPath);
  const allKeywords = [...new Set([...SEO_KEYWORDS, ...keywords])];
  const ogImages = getOpenGraphImages();
  const ogLocale = locale === "ar" ? "ar_PS" : "en_US";
  const ogAltLocales =
    locale === "ar" ? (["en_US"] as const) : (["ar_PS", "ar"] as const);

  return {
    title,
    description,
    keywords: allKeywords,
    authors: [
      { name: SEO_PERSON.nameEn, url: getSiteUrl() },
      { name: SEO_PERSON.nameAr, url: getSiteUrl() },
    ],
    creator: SEO_PERSON.nameEn,
    publisher: SEO_PERSON.nameEn,
    alternates: buildAlternates(path, locale),
    openGraph: {
      type: ogType,
      locale: ogLocale,
      alternateLocale: [...ogAltLocales],
      url,
      siteName:
        locale === "ar" ? SEO_SITE.nameAr : SEO_SITE.nameEn,
      title: ogTitle ?? title,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description,
      images: [absoluteUrl(SEO_OG.png)],
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
            "max-video-preview": -1,
          },
        },
    other: {
      "geo.region": "PS",
      "content-language": locale === "ar" ? "ar" : "en",
      "og:image:alt": SEO_OG.alt,
    },
  };
}

export function getArabicRootLayoutMetadata(): Metadata {
  const base = getRootLayoutMetadata();
  return {
    ...base,
    title: {
      default: "محمد حروب | Mohammad Hroub",
      template: `%s | محمد حروب`,
    },
    description: SEO_PERSON.descriptionAr,
    alternates: buildAlternates("/", "ar"),
    openGraph: {
      ...base.openGraph,
      locale: "ar_PS",
      alternateLocale: ["en_US"],
      url: absoluteUrl("/ar"),
      title: "محمد حروب — مواقع وأنظمة تشغيل",
      description: SEO_PERSON.descriptionAr,
      siteName: SEO_SITE.nameAr,
    },
    twitter: {
      ...base.twitter,
      title: "محمد حروب — مواقع وأنظمة تشغيل",
      description: SEO_PERSON.descriptionAr,
    },
    other: {
      "content-language": "ar",
      "og:image:alt": SEO_OG.alt,
    },
  };
}

export function getRootLayoutMetadata(): Metadata {
  const googleToken = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bingToken = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  const verification: Metadata["verification"] | undefined =
    googleToken || bingToken
      ? {
          ...(googleToken ? { google: googleToken } : {}),
          ...(bingToken
            ? { other: { "msvalidate.01": bingToken } }
            : {}),
        }
      : undefined;

  const ogImages = getOpenGraphImages();

  return {
    metadataBase: getMetadataBase(),
    title: {
      default: defaultPageTitle,
      template: `%s | ${SEO_PERSON.nameEn}`,
    },
    description: SEO_PERSON.description,
    keywords: [...SEO_KEYWORDS],
    authors: [
      { name: SEO_PERSON.nameEn, url: getSiteUrl() },
      { name: SEO_PERSON.nameAr, url: getSiteUrl() },
    ],
    creator: SEO_PERSON.nameEn,
    publisher: SEO_PERSON.nameEn,
    category: "technology",
    icons: {
      icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
      apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "512x512" }],
      shortcut: ["/icon.png"],
    },
    alternates: buildAlternates("/"),
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["ar_PS", "ar"],
      url: getSiteUrl(),
      siteName: SEO_SITE.nameEn,
      title: defaultOgTitle,
      description: SEO_PERSON.description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: defaultOgTitle,
      description: SEO_PERSON.description,
      images: [absoluteUrl(SEO_OG.png)],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification,
    other: {
      "content-language": "en, ar",
      "og:image:alt": SEO_OG.alt,
    },
  };
}

/** للتحقق من basePath في sitemap/robots */
export { getBasePath, withBasePath };
