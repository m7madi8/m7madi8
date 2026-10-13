import Link from "next/link";
import { getMessages } from "../../lib/i18n/messages";
import { buildPageMetadata } from "../../lib/seo-config";
import { homePath, workIndexPath } from "../../lib/i18n/paths";

const m = getMessages("ar").notFound;

export const metadata = buildPageMetadata({
  title: m.title,
  description: m.body,
  path: "/ar",
  locale: "ar",
  noIndex: true,
});

export default function ArabicNotFound() {
  return (
    <main
      className="locale-root mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-5 py-16 text-center"
      id="main-content"
      dir="rtl"
      lang="ar"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
        {m.code}
      </p>
      <h1 className="mt-4 text-2xl font-medium text-white">{m.title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
        {m.body}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href={homePath("ar")} className="btn-primary px-6 py-3" data-cursor>
          {m.home}
        </Link>
        <Link
          href={workIndexPath("ar")}
          className="hero-btn hero-btn--ghost px-6 py-3"
          data-cursor
        >
          {m.projects}
        </Link>
      </div>
    </main>
  );
}
