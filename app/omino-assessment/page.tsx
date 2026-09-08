import type { Metadata } from "next";
import { buildPageMetadata } from "../../lib/seo-config";
import "./omino-assessment.css";
import OminoAssessment from "./components/OminoAssessment";
import OminoHeader from "./components/OminoHeader";

// Private assessment page — intentionally not linked from any nav,
// footer, or homepage. Reachable only via direct URL.
export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "OMINO — تقييم السوق",
    description: "تقييم سريع لأصحاب المتاجر لفهم احتياجاتهم التشغيلية الحقيقية.",
    path: "/omino-assessment",
    noIndex: true,
  }),
  title: { absolute: "OMINO — تقييم السوق" },
};

export default function OminoAssessmentPage() {
  return (
    // Scoped to rtl/ar for this page only — the root <html> stays
    // lang="en" dir="ltr" (set in the shared root layout) since this
    // is the only Arabic route and the rest of the site is English.
    <div dir="rtl" lang="ar" className="om-page">
      <OminoHeader />
      <OminoAssessment />
    </div>
  );
}