import { SEO_PERSON, getSiteUrl } from "../../lib/seo-config";

/**
 * بيانات منظمة لـ Google (Person + WebSite) — تساعد على الظهور في النتائج الغنية.
 */
export default function SeoJsonLd() {
  const url = getSiteUrl();

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SEO_PERSON.nameEn,
    alternateName: SEO_PERSON.nameAr,
    url,
    jobTitle: SEO_PERSON.jobTitle,
    description: SEO_PERSON.description,
    sameAs: [...SEO_PERSON.sameAs],
    knowsAbout: [
      "Web development",
      "Full-stack development",
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${SEO_PERSON.nameEn} — Portfolio`,
    alternateName: SEO_PERSON.nameAr,
    url,
    description: SEO_PERSON.description,
    inLanguage: ["en", "ar"],
    author: {
      "@type": "Person",
      name: SEO_PERSON.nameEn,
      url,
    },
  };

  const professional = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SEO_PERSON.nameEn} — ${SEO_PERSON.jobTitle}`,
    url,
    description: SEO_PERSON.description,
    areaServed: "Worldwide",
    serviceType: "Web development",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professional) }}
      />
    </>
  );
}
