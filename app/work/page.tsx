import type { Metadata } from "next";
import logoMe from "../../img/logo-me.png";
import { SEO_PERSON, SEO_SITE, buildPageMetadata } from "../../lib/seo-config";
import WorkJsonLd from "../components/WorkJsonLd";
import WorkPageContent from "./WorkPageContent";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: `Projects | ${SEO_PERSON.nameEn} — ${SEO_PERSON.nameAr}`,
  description: `${SEO_PERSON.descriptionEn} Explore portfolio case studies: web apps, e-commerce, and full-stack builds by ${SEO_PERSON.nameEn}. ${SEO_PERSON.descriptionAr}`,
  path: "/work",
  keywords: [
    "web development portfolio",
    "معرض مشاريع",
    "case studies",
    "دراسات حالة",
    "client projects",
  ],
  ogTitle: `Projects — ${SEO_PERSON.nameEn} | ${SEO_PERSON.nameAr}`,
});

export default function WorkPage() {
  return (
    <>
      <WorkJsonLd />
      <WorkPageContent logoUrl={logoMe.src} />
    </>
  );
}
