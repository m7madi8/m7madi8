import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/seo-config";
import CafeMenu from "./CafeMenu";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "POUR — منيو قهوة",
  description: "منيو قهوة مختصة للعرض داخل المقهى: إسبريسو، لاتيه، ماتشا، ومشروبات التوقيع.",
  path: "/templates/cafe",
  keywords: ["منيو مقهى", "قهوة مختصة", "رام الله", "POUR"],
  ogTitle: "POUR — منيو قهوة",
});

export default function CafeMenuPage() {
  return <CafeMenu />;
}
