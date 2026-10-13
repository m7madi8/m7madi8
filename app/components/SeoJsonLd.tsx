import { projects } from "../data/projects";
import {
  SEO_FAQ,
  SEO_GEO,
  SEO_OG,
  SEO_PERSON,
  SEO_PORTRAIT,
  SEO_SERVICES,
  SEO_SITE,
  absoluteUrl,
  defaultPageTitle,
  getSiteUrl,
  personEntityId,
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
 * بيانات منظمة (Schema.org) — Person, WebSite, ProfilePage, FAQ, صور
 */
export default function SeoJsonLd() {
  const url = getSiteUrl();
  const personId = personEntityId(url);
  const portraitUrl = absoluteUrl(SEO_PORTRAIT.jpeg);
  const ogUrl = absoluteUrl(SEO_OG.png);

  const portraitImage: JsonLd = {
    "@type": "ImageObject",
    "@id": `${url}/#portrait`,
    url: portraitUrl,
    contentUrl: portraitUrl,
    width: SEO_PORTRAIT.width,
    height: SEO_PORTRAIT.height,
    caption: SEO_PORTRAIT.alt,
    name: SEO_PORTRAIT.alt,
    inLanguage: ["en", "ar"],
    representativeOfPage: true,
    encodingFormat: "image/jpeg",
  };

  const socialImage: JsonLd = {
    "@type": "ImageObject",
    "@id": `${url}/#ogimage`,
    url: ogUrl,
    contentUrl: ogUrl,
    width: SEO_OG.width,
    height: SEO_OG.height,
    caption: SEO_OG.alt,
    name: SEO_OG.alt,
    encodingFormat: "image/png",
  };

  const person: JsonLd = {
    "@type": "Person",
    "@id": personId,
    name: SEO_PERSON.nameEn,
    givenName: SEO_PERSON.givenName,
    familyName: SEO_PERSON.familyName,
    alternateName: SEO_PERSON.alternateNames,
    url,
    mainEntityOfPage: { "@id": `${url}/#profilepage` },
    email: `mailto:${SEO_PERSON.email}`,
    jobTitle: SEO_PERSON.jobTitle,
    description: SEO_PERSON.descriptionEn,
    image: [
      { "@id": `${url}/#portrait` },
      { "@id": `${url}/#ogimage` },
    ],
    knowsAbout: [
      "Web Development",
      "Full-Stack Development",
      "Business Websites",
      "Custom Web Applications",
      "Operational Systems",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Firebase",
      "Tailwind CSS",
      "تطوير مواقع",
      "مطور ويب",
      "أنظمة تشغيل رقمية",
      ...SEO_SERVICES,
    ],
    knowsLanguage: ["en", "ar"],
    sameAs: [...SEO_PERSON.sameAs],
    nationality: {
      "@type": "Country",
      name: SEO_GEO.countryEn,
    },
    homeLocation: {
      "@type": "Country",
      name: SEO_GEO.countryEn,
    },
    workLocation: {
      "@type": "Place",
      name: "Remote — Worldwide",
    },
  };

  const website: JsonLd = {
    "@type": "WebSite",
    "@id": `${url}/#website`,
    name: SEO_SITE.nameEn,
    alternateName: [SEO_SITE.nameAr, SEO_SITE.shortName],
    url,
    description: SEO_PERSON.description,
    inLanguage: ["en", "ar"],
    publisher: { "@id": personId },
    author: { "@id": personId },
  };

  const profilePage: JsonLd = {
    "@type": "ProfilePage",
    "@id": `${url}/#profilepage`,
    url,
    name: defaultPageTitle,
    description: SEO_PERSON.description,
    inLanguage: ["en", "ar"],
    mainEntity: { "@id": personId },
    isPartOf: { "@id": `${url}/#website` },
    primaryImageOfPage: { "@id": `${url}/#portrait` },
    image: [{ "@id": `${url}/#portrait` }, { "@id": `${url}/#ogimage` }],
  };

  const professional: JsonLd = {
    "@type": "ProfessionalService",
    "@id": `${url}/#service`,
    name: `${SEO_PERSON.nameEn} — ${SEO_PERSON.jobTitle}`,
    alternateName: `${SEO_PERSON.nameAr} — ${SEO_PERSON.jobTitleAr}`,
    url,
    description: SEO_PERSON.descriptionEn,
    image: { "@id": `${url}/#portrait` },
    areaServed: [
      { "@type": "Country", name: SEO_GEO.countryEn },
      ...SEO_GEO.citiesEn.map((city) => ({
        "@type": "City",
        name: city,
      })),
      { "@type": "Place", name: "Worldwide" },
    ],
    serviceType: [...SEO_SERVICES],
    provider: { "@id": personId },
    availableLanguage: ["English", "Arabic"],
  };

  const webPage: JsonLd = {
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name: defaultPageTitle,
    description: SEO_PERSON.description,
    inLanguage: ["en", "ar"],
    isPartOf: { "@id": `${url}/#website` },
    about: { "@id": personId },
    primaryImageOfPage: { "@id": `${url}/#portrait` },
    image: [{ "@id": `${url}/#portrait` }, { "@id": `${url}/#ogimage` }],
  };

  const faqPage: JsonLd = {
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
    "@type": "ItemList",
    "@id": `${url}/#projects`,
    name: "Portfolio Projects — Mohammad Hroub",
    description: "Selected web development projects by Mohammad Hroub | محمد حروب",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: absoluteUrl(`/work/${project.slug}`),
    })),
  };

  const graph: JsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      portraitImage,
      socialImage,
      person,
      website,
      profilePage,
      professional,
      webPage,
      faqPage,
      workList,
    ],
  };

  return jsonLdScript(graph);
}
