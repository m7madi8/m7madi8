import type { Metadata } from "next";
import {
  SEO_PERSON,
  buildPageMetadata,
  defaultOgTitle,
  defaultPageTitle,
} from "../lib/seo-config";
import HomePageView from "./views/HomePageView";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: defaultPageTitle,
    description: SEO_PERSON.description,
    path: "/",
    locale: "en",
    keywords: [
      "Silent Code Massive Impact",
      "hire full-stack developer",
      "operational systems developer",
      "business dashboard developer",
      "استئجار مطور ويب",
      "أنظمة تشغيل رقمية للأعمال",
      "مطور Next.js",
    ],
    ogTitle: defaultOgTitle,
  }),
  title: { absolute: defaultPageTitle },
};

export default function Home() {
  return <HomePageView locale="en" />;
}
