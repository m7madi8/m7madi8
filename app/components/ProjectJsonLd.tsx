import type { Project } from "../data/projects";
import { SEO_PERSON, absoluteUrl } from "../../lib/seo-config";

type ProjectJsonLdProps = {
  project: Project;
};

export default function ProjectJsonLd({ project }: ProjectJsonLdProps) {
  const url = absoluteUrl(`/work/${project.slug}`);

  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url,
    inLanguage: ["en", "ar"],
    author: {
      "@type": "Person",
      name: SEO_PERSON.nameEn,
      alternateName: SEO_PERSON.nameAr,
      url: absoluteUrl("/"),
    },
    creator: {
      "@type": "Person",
      name: SEO_PERSON.nameEn,
    },
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
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: absoluteUrl("/work"),
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
