import type { Locale } from "../../lib/i18n/config";
import { getMessages } from "../../lib/i18n/messages";
import { contactHash } from "../../lib/i18n/paths";
import ScrollFloat from "./ScrollFloat";

type HomeCtaProps = {
  liveCount: number;
  locale: Locale;
};

export default function HomeCta({ liveCount, locale }: HomeCtaProps) {
  const m = getMessages(locale).cta;

  return (
    <section className="cta-breakout section-block" aria-label={m.aria}>
      <div className="cta-breakout-stat">
        <p className="sr-only">{m.statSr(liveCount)}</p>
        <p className="cta-stat" aria-hidden>
          {String(liveCount).padStart(2, "0")}
        </p>
        <p className="cta-stat-label">{m.statLabel}</p>
      </div>

      <div className="cta-breakout-copy">
        <p className="eyebrow">{m.eyebrow}</p>
        <h2 className="cta-statement">
          <ScrollFloat
            as="span"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            {m.statement}
          </ScrollFloat>
          <a href={contactHash(locale)} className="cta-inline" data-cursor>
            {m.inline}
            <span aria-hidden>{locale === "ar" ? "←" : "→"}</span>
          </a>
        </h2>
      </div>
    </section>
  );
}
