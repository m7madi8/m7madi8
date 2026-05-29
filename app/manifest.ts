import type { MetadataRoute } from "next";
import { SEO_PERSON, SEO_SITE } from "../lib/seo-config";

/** مطلوب مع `output: "export"` */
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SEO_SITE.nameEn} | ${SEO_SITE.nameAr}`,
    short_name: SEO_PERSON.nameEn,
    description: SEO_PERSON.description,
    start_url: "/",
    display: "standalone",
    background_color: "#060708",
    theme_color: "#060708",
    lang: "en",
    dir: "ltr",
    categories: ["portfolio", "business", "productivity"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
