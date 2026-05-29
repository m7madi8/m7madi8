import { projects } from "../data/projects";
import { SEO_PERSON, absoluteUrl } from "../../lib/seo-config";

export default function WorkJsonLd() {
  const url = absoluteUrl("/work");

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}/#collection`,
    url,
    name: `Projects — ${SEO_PERSON.nameEn} | ${SEO_PERSON.nameAr}`,
    description: SEO_PERSON.description,
    inLanguage: ["en", "ar"],
    author: {
      "@type": "Person",
      name: SEO_PERSON.nameEn,
      alternateName: SEO_PERSON.nameAr,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: absoluteUrl(`/work/${project.slug}`),
      })),
    },
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
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
