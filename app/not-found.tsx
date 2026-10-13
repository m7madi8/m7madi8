import Link from "next/link";
import { buildPageMetadata } from "../lib/seo-config";

export const metadata = buildPageMetadata({
  title: "Page not found",
  description:
    "The page you requested is not on mohammadhroub.com. Browse projects or contact Mohammad Hroub for web development and operational systems work.",
  path: "/",
  locale: "en",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main
      className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-5 py-16 text-center"
      id="main-content"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
        404
      </p>
      <h1 className="mt-4 text-2xl font-medium text-white">Page not found</h1>
      <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
        This URL is not part of the portfolio. Try the homepage or project
        archive.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/" className="btn-primary px-6 py-3" data-cursor>
          Home
        </Link>
        <Link href="/work" className="hero-btn hero-btn--ghost px-6 py-3" data-cursor>
          Projects
        </Link>
      </div>
    </main>
  );
}
