import type { Metadata } from "next";
import { buildPageMetadata } from "../../lib/seo-config";
import "./clinic-growth.css";
import ClinicAssessment from "./components/ClinicAssessment";
import ClinicHeader from "./components/ClinicHeader";

// Private acquisition page — intentionally not linked from any nav,
// footer, or homepage. Reachable only via direct URL.
export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Clinic Growth Assessment",
    description:
      "A quick assessment for clinics to identify the biggest opportunities in their digital patient journey.",
    path: "/clinic-growth",
    noIndex: true,
  }),
  title: { absolute: "Clinic Growth Assessment" },
};

export default function ClinicGrowthPage() {
  return (
    <div className="cg-page">
      <ClinicHeader />
      <ClinicAssessment />
    </div>
  );
}