/**
 * إعدادات SEO مركزية — اسمك والوصف والكلمات المفتاحية تظهر في Google ووسائل المشاركة.
 * النطاق الافتراضي للإنتاج: mohammadhroub.com — يمكن تجاوزه بـ NEXT_PUBLIC_SITE_URL.
 */

/** النطاق الرسمي للموقع (HTTPS، بدون شرطة نهائية) */
export const DEFAULT_SITE_URL = "https://mohammadhroub.com";

export const SEO_PERSON = {
  nameEn: "Mohammad Hroub",
  nameAr: "محمد حروب",
  jobTitle: "Full-Stack Web Developer",
  jobTitleAr: "مطور ويب Full-Stack",
  tagline:
    "Freelance full-stack web developer — modern sites, performance, and clear delivery.",
  /** وصف أطول لمحركات البحث (150–160 حرفاً تقريباً) */
  description:
    "Mohammad Hroub — Full-Stack Web Developer & freelancer. Portfolio, web development, React, Next.js, scalable front-end and back-end. Hire for remote web projects.",
  keywords: [
    "Mohammad Hroub",
    "محمد حروب",
    "Full-Stack Web Developer",
    "freelance web developer",
    "Next.js developer",
    "React developer",
    "portfolio",
    "web development",
    "remote developer",
    "mohammadhroub.com",
    "Mohammad Hroub portfolio",
  ] as string[],
  /** روابط اجتماعية تُستخدم في Schema.org (sameAs) */
  sameAs: [
    "https://www.instagram.com/m7madi8/",
    "https://wa.me/972592132438",
  ] as string[],
} as const;

/** عنوان الصفحة الرئيسية الافتراضي */
export const defaultPageTitle = `${SEO_PERSON.nameEn} | ${SEO_PERSON.jobTitle} — Portfolio`;

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
