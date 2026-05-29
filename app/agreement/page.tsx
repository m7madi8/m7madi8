import type { Metadata } from "next";
import AgreementContent from "./AgreementContent";
import { SEO_PERSON, buildPageMetadata } from "../../lib/seo-config";

const agreementTitle =
  "Work Agreement | اتفاقية العمل — Mohammad Hroub | محمد حروب";

const agreementDesc =
  "Work agreement (EN/AR) — scope, timeline, payment, and delivery terms for web development projects with Mohammad Hroub (Full-Stack Web Developer). اتفاقية عمل واضحة: نطاق الخدمة، مراحل التنفيذ، الدفع، والدعم.";

export const metadata: Metadata = buildPageMetadata({
  title: agreementTitle,
  description: agreementDesc,
  path: "/agreement",
  keywords: [
    "work agreement",
    "اتفاقية عمل",
    "freelance contract",
    "عقد تطوير مواقع",
    "web development terms",
    "شروط العمل",
  ],
  ogTitle: agreementTitle,
});

export default function AgreementPage() {
  return <AgreementContent />;
}
