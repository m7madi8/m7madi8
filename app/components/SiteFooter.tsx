import Link from "next/link";
import { menuItems, socialItems } from "../../lib/site-nav";
import BrandMark from "./BrandMark";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer reveal" data-reveal>
      <p className="site-footer-signoff">
        <BrandMark
          href="/"
          size="display"
          tone="light"
          animate={false}
          aria-label="m. — Home"
        />
        <span className="site-footer-thanks">Thanks for looking.</span>
      </p>

      <div className="site-footer-meta">
        <nav aria-label="Footer">
          <ul className="site-footer-links">
            {menuItems.map((item) => (
              <li key={item.link}>
                <Link href={item.link} data-cursor>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="site-footer-links">
          {socialItems.map((item) => (
            <li key={item.link}>
              <a href={item.link} target="_blank" rel="noreferrer" data-cursor>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="site-footer-legal">
          © {year} m. · Silent Code. Massive Impact.
        </p>
      </div>
    </footer>
  );
}
