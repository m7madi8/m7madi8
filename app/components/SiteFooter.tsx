import Link from "next/link";
import { menuItems, socialItems } from "../../lib/site-nav";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer reveal mt-16 sm:mt-20" data-reveal>
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="text-lg font-medium tracking-tight text-white">
            Mohammad Hroub
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-[color:var(--muted)]">
            Full-Stack Web Developer crafting high-performance digital products
            with clean code and clear results.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Navigate</p>
          <ul className="space-y-2.5">
            {menuItems.map((item) => (
              <li key={item.link}>
                <Link
                  href={item.link}
                  className="text-sm text-[color:var(--muted)] transition hover:text-white"
                  data-cursor
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Connect</p>
          <ul className="space-y-2.5">
            {socialItems.map((item) => (
              <li key={item.link}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[color:var(--muted)] transition hover:text-white"
                  data-cursor
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center justify-between gap-4 pt-6 sm:mt-12 sm:flex-row">
        <p className="text-xs text-[color:var(--muted)]">
          © {year} Mohammad Hroub. All rights reserved.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
          Silent Code. Massive Impact.
        </p>
      </div>
    </footer>
  );
}
