import type { Metadata } from "next";
import { getMessages } from "../../../lib/i18n/messages";
import { buildPageMetadata } from "../../../lib/seo-config";
import WorkJsonLd from "../../components/WorkJsonLd";
import WorkPageContent from "../../work/WorkPageContent";

export const dynamic = "force-static";

const m = getMessages("ar").meta;

export const metadata: Metadata = buildPageMetadata({
  title: m.workTitle,
  description: m.workDescription,
  path: "/ar/work",
  locale: "ar",
  keywords: [
    "معرض مشاريع",
    "دراسات حالة",
    "تطوير مواقع",
    "مطور ويب فلسطين",
  ],
  ogTitle: m.workOg,
});

export default function ArabicWorkPage() {
  return (
    <>
      <WorkJsonLd />
      <WorkPageContent locale="ar" />
    </>
  );
}
