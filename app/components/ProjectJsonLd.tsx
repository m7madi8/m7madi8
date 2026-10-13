import type { Locale } from "../../lib/i18n/config";
import { workProjectPath } from "../../lib/i18n/paths";
import type { Project } from "../data/projects";
import { absoluteUrl, personEntityId } from "../../lib/seo-config";

type ProjectJsonLdProps = {
  project: Project;
  locale?: Locale;
};

export default function ProjectJsonLd({
  project,
  locale = "en",
}: ProjectJsonLdProps) {
  const path = workProjectPath(project.slug, locale);
  const url = absoluteUrl(path);
  const homeUrl = absoluteUrl(locale === "ar" ? "/ar" : "/");
  const workUrl = absoluteUrl(locale === "ar" ? "/ar/work" : "/work");
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const workLabel = locale === "ar" ? "المشاريع" : "Projects";

  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url,
    inLanguage: locale === "ar" ? "ar" : "en",
    author: { "@id": personEntityId() },
    creator: { "@id": personEntityId() },
    about: project.context,
    abstract: project.overview,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: workLabel,
        item: workUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWork) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
