import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/seo-config";
import "./oday-requirements.css";
import OdayAssessment from "./components/OdayAssessment";
import OdayHeader from "./components/OdayHeader";

// Private intake for Oday — not linked from nav, footer, sitemap, or homepage.
export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "استبيان المتطلبات",
    description: "استبيان خاص لتحليل متطلبات نظام إدارة المكتب.",
    path: "/oday/requirements",
    noIndex: true,
  }),
  title: { absolute: "استبيان المتطلبات — Oday" },
};

export default function OdayRequirementsPage() {
  return (
    <div dir="rtl" lang="ar" className="od-page">
      <OdayHeader />
      <OdayAssessment />
    </div>
  );
}
