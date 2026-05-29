import { projects } from "../data/projects";
import {
  SEO_FAQ,
  SEO_PERSON,
  SEO_SITE,
  absoluteUrl,
  defaultPageTitle,
  getSiteUrl,
} from "../../lib/seo-config";

type JsonLd = Record<string, unknown>;

function jsonLdScript(data: JsonLd) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * بيانات منظمة (Schema.org) — Person, WebSite, ProfessionalService, ItemList
 */
export default function SeoJsonLd() {
  const url = getSiteUrl();

  const person: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}/#person`,
    name: SEO_PERSON.nameEn,
    alternateName: [SEO_PERSON.nameAr, "M7madi"],
    url,
    email: SEO_PERSON.email,
    jobTitle: SEO_PERSON.jobTitle,
    description: SEO_PERSON.descriptionEn,
    knowsAbout: [
      "Web Development",
      "Full-Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Firebase",
      "Responsive Web Design",
      "تطوير مواقع",
      "مطور ويب",
    ],
    sameAs: [...SEO_PERSON.sameAs],
    worksFor: {
      "@type": "Organization",
      name: SEO_PERSON.nameEn,
    },
  };

  const website: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    name: SEO_SITE.nameEn,
    alternateName: SEO_SITE.nameAr,
    url,
    description: SEO_PERSON.description,
    inLanguage: ["en", "ar"],
    publisher: { "@id": `${url}/#person` },
    author: { "@id": `${url}/#person` },
  };

  const profilePage: JsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}/#profilepage`,
    url,
    name: SEO_SITE.nameEn,
    description: SEO_PERSON.description,
    inLanguage: ["en", "ar"],
    mainEntity: { "@id": `${url}/#person` },
    isPartOf: { "@id": `${url}/#website` },
  };

  const professional: JsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}/#service`,
    name: `${SEO_PERSON.nameEn} — ${SEO_PERSON.jobTitle}`,
    alternateName: `${SEO_PERSON.nameAr} — ${SEO_PERSON.jobTitleAr}`,
    url,
    description: SEO_PERSON.descriptionEn,
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    serviceType: [
      "Web Development",
      "Full-Stack Development",
      "تطوير مواقع",
      "Portfolio Development",
    ],
    provider: { "@id": `${url}/#person` },
    availableLanguage: ["English", "Arabic"],
  };

  const webPage: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name: defaultPageTitle,
    description: SEO_PERSON.description,
    inLanguage: ["en", "ar"],
    isPartOf: { "@id": `${url}/#website` },
    about: { "@id": `${url}/#person` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon.png"),
    },
  };

  const faqPage: JsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}/#faq`,
    mainEntity: SEO_FAQ.map((item) => ({
      "@type": "Question",
      name: `${item.questionEn} | ${item.questionAr}`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${item.answerEn} ${item.answerAr}`,
      },
    })),
  };

  const workList: JsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}/#projects`,
    name: "Portfolio Projects",
    description: "Selected web development projects by Mohammad Hroub",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: absoluteUrl(`/work/${project.slug}`),
    })),
  };

  return (
    <>
      {jsonLdScript(person)}
      {jsonLdScript(website)}
      {jsonLdScript(profilePage)}
      {jsonLdScript(professional)}
      {jsonLdScript(webPage)}
      {jsonLdScript(faqPage)}
      {jsonLdScript(workList)}
    </>
  );
}
