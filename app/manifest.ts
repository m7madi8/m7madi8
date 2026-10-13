import type { MetadataRoute } from "next";
import { SEO_OG, SEO_PERSON, SEO_PORTRAIT, SEO_SITE } from "../lib/seo-config";

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
      {
        src: "/apple-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: SEO_OG.png,
        sizes: `${SEO_OG.width}x${SEO_OG.height}`,
        type: "image/png",
        form_factor: "wide",
        label: SEO_OG.alt,
      },
      {
        src: SEO_PORTRAIT.webp,
        sizes: `${SEO_PORTRAIT.width}x${SEO_PORTRAIT.height}`,
        type: "image/webp",
        form_factor: "narrow",
        label: SEO_PORTRAIT.alt,
      },
    ],
  };
}
