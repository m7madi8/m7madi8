import {
  SEO_GEO,
  SEO_PERSON,
  SEO_SERVICES,
  getSiteUrl,
} from "../../lib/seo-config";

/**
 * Crawlable identity summary — visually hidden, available to screen readers and bots
 * that do not execute client-side UI. Not keyword stuffing; mirrors verified facts.
 */
export default function HomeEntitySummary() {
  const site = getSiteUrl();

  return (
    <section className="sr-only" aria-label="About Mohammad Hroub">
      <h2>Mohammad Hroub — محمد حروب</h2>
      <p>
        {SEO_PERSON.jobTitle}. {SEO_PERSON.descriptionEn} Official website:{" "}
        {site}.
      </p>
      <p>{SEO_PERSON.descriptionAr}</p>
      <p>
        Based in {SEO_GEO.countryEn} ({SEO_GEO.citiesEn.join(", ")}).{" "}
        {SEO_GEO.remoteNoteEn}.
      </p>
      <p>
        مقر العمل: {SEO_GEO.countryAr} ({SEO_GEO.citiesAr.join("، ")}).{" "}
        {SEO_GEO.remoteNoteAr}.
      </p>
      <h3>Services</h3>
      <ul>
        {SEO_SERVICES.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
      <p>
        Portfolio and case studies: {site}/work. Contact: {site}/#contact.
      </p>
    </section>
  );
}
