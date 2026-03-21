import type { Metadata } from "next";
import AgreementContent from "./AgreementContent";
import { SEO_PERSON, getSiteUrl } from "../../lib/seo-config";

const agreementTitle =
  "اتفاقية العمل | محمد حروب — مطور ويب Full-Stack";
const agreementDesc =
  "اتفاقية العمل بين محمد حروب (مطور ويب Full-Stack) والعميل. آلية العمل، نطاق الخدمة، مراحل التنفيذ، الدفع والدعم الفني.";

export const metadata: Metadata = {
  title: {
    absolute: agreementTitle,
  },
  description: agreementDesc,
  keywords: [
    ...SEO_PERSON.keywords,
    "اتفاقية عمل",
    "عقد عمل مستقل",
    "اتفاقية تطوير مواقع",
  ],
  openGraph: {
    title: agreementTitle,
    description: agreementDesc,
    locale: "ar",
    type: "website",
    url: `${getSiteUrl()}/agreement`,
    siteName: `${SEO_PERSON.nameEn} — Portfolio`,
    images: [{ url: "/icon.png", alt: SEO_PERSON.nameEn }],
  },
  twitter: {
    title: agreementTitle,
    description: agreementDesc,
    images: ["/icon.png"],
  },
  alternates: {
    canonical: "/agreement",
  },
};

export default function AgreementPage() {
  return <AgreementContent />;
}
