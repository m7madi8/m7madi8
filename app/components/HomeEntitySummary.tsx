import type { Locale } from "../../lib/i18n/config";
import { workIndexPath } from "../../lib/i18n/paths";
import {
  SEO_GEO,
  SEO_PERSON,
  SEO_SERVICES,
  getSiteUrl,
} from "../../lib/seo-config";
import { getMessages } from "../../lib/i18n/messages";

type HomeEntitySummaryProps = {
  locale?: Locale;
};

/**
 * Crawlable identity summary — visually hidden, available to screen readers and bots
 * that do not execute client-side UI. Not keyword stuffing; mirrors verified facts.
 */
export default function HomeEntitySummary({
  locale = "en",
}: HomeEntitySummaryProps) {
  const site = getSiteUrl();
  const aria = getMessages(locale).home.entityAria;
  const workPath = workIndexPath(locale);

  return (
    <section className="sr-only" aria-label={aria}>
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
        Portfolio and case studies: {site}{workPath}. Contact: {site}/#contact.
      </p>
    </section>
  );
}
