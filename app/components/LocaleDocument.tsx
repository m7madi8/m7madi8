import type { Locale } from "../../lib/i18n/config";

type LocaleDocumentProps = {
  locale: Locale;
};

/** Sets document `lang` and `dir` before paint on Arabic routes. */
export default function LocaleDocument({ locale }: LocaleDocumentProps) {
  if (locale !== "ar") return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){var e=document.documentElement;e.setAttribute('lang','ar');e.setAttribute('dir','rtl');})();`,
      }}
    />
  );
}
