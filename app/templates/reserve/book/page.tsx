import type { Metadata } from "next";
import { buildPageMetadata } from "../../../../lib/seo-config";
import ReserveNav from "../Nav";
import ReservationFlow from "../ReservationFlow";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Reserve a table — NOIR",
  description: "Choose a date, party size, and time. Confirm your table at NOIR, Ramallah.",
  path: "/templates/reserve/book",
  keywords: ["reserve table", "NOIR", "Ramallah"],
  ogTitle: "Reserve a table — NOIR",
});

export default function ReserveBookPage() {
  return (
    <div className="nr">
      <ReserveNav book />
      <ReservationFlow />
    </div>
  );
}
