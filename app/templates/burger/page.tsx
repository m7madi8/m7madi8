import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/seo-config";
import BurgerMenu from "./BurgerMenu";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "GRIDLOCK — منيو برغر",
  description: "منيو صاج برغر للعرض داخل المطعم: برغر، جانبي، ومشروبات.",
  path: "/templates/burger",
  keywords: ["منيو برغر", "صاج", "رام الله", "GRIDLOCK"],
  ogTitle: "GRIDLOCK — منيو برغر",
});

export default function BurgerMenuPage() {
  return <BurgerMenu />;
}
