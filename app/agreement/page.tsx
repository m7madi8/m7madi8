import type { Metadata } from "next";
import AgreementContent from "./AgreementContent";
import { SEO_PERSON, buildPageMetadata } from "../../lib/seo-config";

const agreementTitle = "Work Agreement | اتفاقية العمل — m.";

const agreementDesc =
  "Professional work agreement (EN/AR): scope, phases, payment, ownership, and support terms for web projects with Mohammad Hroub. اتفاقية عمل احترافية: النطاق، المراحل، الدفع، الملكية، والدعم.";

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
