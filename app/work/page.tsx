import type { Metadata } from "next";
import logoMe from "../../img/logo-me.png";
import { SEO_PERSON, getSiteUrl } from "../../lib/seo-config";
import WorkPageContent from "./WorkPageContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Projects",
  description: `Portfolio projects by ${SEO_PERSON.nameEn} — web development, full-stack builds, and client work.`,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: `Projects | ${SEO_PERSON.nameEn}`,
    description: `Explore web projects by ${SEO_PERSON.nameEn}.`,
    url: `${getSiteUrl()}/work`,
  },
};

export default function WorkPage() {
  return <WorkPageContent logoUrl={logoMe.src} />;
}
