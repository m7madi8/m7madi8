import type { Metadata } from "next";
import { getMessages } from "../../lib/i18n/messages";
import { buildPageMetadata } from "../../lib/seo-config";
import HomePageView from "../views/HomePageView";

const m = getMessages("ar");

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: m.meta.homeTitle,
    description: m.meta.homeDescription,
    path: "/ar",
    locale: "ar",
    keywords: [
      "مطور مواقع ويب",
      "تطوير مواقع للشركات",
      "مطور ويب فلسطين",
      "تطبيقات ويب مخصصة",
      "أنظمة إدارية مخصصة",
      "مطور Next.js",
    ],
    ogTitle: m.meta.homeOg,
  }),
  title: { absolute: m.meta.homeTitle },
};

export default function ArabicHomePage() {
  return <HomePageView locale="ar" />;
}
