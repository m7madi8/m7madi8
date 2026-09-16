import ScrollFloat from "./ScrollFloat";

type HomeCtaProps = {
  liveCount: number;
};

export default function HomeCta({ liveCount }: HomeCtaProps) {
  return (
    <section className="cta-breakout section-block" aria-label="Start a project">
      <div className="cta-breakout-stat">
        <p className="sr-only">{liveCount} projects live on the web</p>
        <p className="cta-stat" aria-hidden>
          {String(liveCount).padStart(2, "0")}
        </p>
        <p className="cta-stat-label">live on the web</p>
      </div>

      <div className="cta-breakout-copy">
        <p className="eyebrow">Next</p>
        <h2 className="cta-statement">
          <ScrollFloat
            as="span"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Let's build the next one.
          </ScrollFloat>
          <a href="#contact" className="cta-inline" data-cursor>
            Start a project
            <span aria-hidden>→</span>
          </a>
        </h2>
      </div>
    </section>
  );
}
