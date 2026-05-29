import type { MetadataRoute } from "next";
import { projects } from "./data/projects";
import { getBasePath } from "../lib/base-path";
import { getSiteUrl } from "../lib/seo-config";

/** مطلوب مع `output: "export"` لإنشاء sitemap.xml أثناء البناء */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const basePath = getBasePath();
  const path = (p: string) => `${base}${basePath}${p}`;

  const routes: MetadataRoute.Sitemap = [
    {
      url: path(""),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: path("/agreement"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: path("/work"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  for (const p of projects) {
    routes.push({
      url: path(`/work/${p.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return routes;
}
