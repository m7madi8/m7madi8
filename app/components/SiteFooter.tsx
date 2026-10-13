import Link from "next/link";
import type { Locale } from "../../lib/i18n/config";
import { getMessages } from "../../lib/i18n/messages";
import { homePath } from "../../lib/i18n/paths";
import { getMenuItems, socialItems } from "../../lib/site-nav";
import BrandMark from "./BrandMark";

type SiteFooterProps = {
  locale?: Locale;
};

export default function SiteFooter({ locale = "en" }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const m = getMessages(locale).footer;
  const menu = getMenuItems(locale);

  return (
    <footer className="site-footer reveal" data-reveal>
      <p className="site-footer-signoff">
        <BrandMark
          href={homePath(locale)}
          size="display"
          tone="light"
          animate={false}
          aria-label={m.homeAria}
        />
        <span className="site-footer-thanks">{m.thanks}</span>
      </p>

      <div className="site-footer-meta">
        <nav aria-label="Footer">
          <ul className="site-footer-links">
            {menu.map((item) => (
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
          © {year} m. · {m.legal}
        </p>
      </div>
    </footer>
  );
}
