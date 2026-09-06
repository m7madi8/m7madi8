import type { Metadata } from "next";
import { buildPageMetadata } from "../../lib/seo-config";
import HospitalityPage from "./components/HospitalityPage";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Restaurants & cafés — work",
  description:
    "Restaurant and café work: menus, reservation systems, full brand sites, and custom builds.",
  path: "/restaurants",
  keywords: [
    "restaurant websites",
    "café websites",
    "digital menus",
    "restaurant reservations",
    "99cafe",
    "DARNA",
  ],
  ogTitle: "Restaurants & cafés — work",
});

export default function RestaurantsRoute() {
  return <HospitalityPage />;
}
