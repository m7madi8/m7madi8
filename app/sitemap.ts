import type { MetadataRoute } from "next";
import { projects } from "./data/projects";
import { getSiteUrl } from "../lib/seo-config";

/** مطلوب مع `output: "export"` لإنشاء sitemap.xml أثناء البناء */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const routes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/agreement`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  for (const p of projects) {
    routes.push({
      url: `${base}/work/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return routes;
}
