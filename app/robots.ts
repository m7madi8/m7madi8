import type { MetadataRoute } from "next";
import { getBasePath } from "../lib/base-path";
import { getSiteUrl } from "../lib/seo-config";

/** مطلوب مع `output: "export"` */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  const basePath = getBasePath();

  return {
    rules: {
      userAgent: "*",
      allow: basePath ? `${basePath}/` : "/",
      disallow: basePath ? `${basePath}/_next/` : "/_next/",
    },
    sitemap: `${base}${basePath}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}
