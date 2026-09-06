import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/seo-config";
import { RESTAURANT } from "./data";
import HeroReveal from "./HeroReveal";
import ReserveNav from "./Nav";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "NOIR — Table reservation",
  description:
    "Contemporary Palestinian dining in Ramallah. Reserve a table at NOIR.",
  path: "/templates/reserve",
  keywords: ["reservation", "NOIR", "Ramallah", "restaurant booking"],
  ogTitle: "NOIR — Table reservation",
});

export default function ReserveHomePage() {
  return (
    <div className="nr">
      <ReserveNav />
      <section className="nr-hero">
        <div
          className="nr-hero-bg"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.95) 100%), url('${RESTAURANT.heroImage}')`,
          }}
        />
        <HeroReveal eyebrow={RESTAURANT.eyebrow} headline={RESTAURANT.tagline} />
      </section>

      <section id="about" className="nr-section">
        <div className="nr-wrap nr-about">
          <p className="nr-gold" style={{ letterSpacing: "0.18em", fontSize: 12 }}>
            The Concept
          </p>
          <div>
            <h2 className="nr-display">A quiet room built around fire, stone, and patience.</h2>
            <p>
              NOIR reinterprets Palestinian cooking through a modern, produce-led lens —
              slow-cooked over open flame, served in a room designed to disappear around
              the table. No spectacle. No shortcuts. Just an evening worth remembering.
            </p>
          </div>
        </div>
      </section>

      <section id="location" className="nr-section nr-place">
        <div className="nr-wrap nr-place-grid">
          <h2 className="nr-display">Reserve your evening.</h2>
          <div>
            <p>
              {RESTAURANT.address}
              <br />
              {RESTAURANT.phone}
            </p>
            <Link href="/templates/reserve/book" className="nr-btn nr-btn--full nr-focus">
              Book a table
            </Link>
          </div>
        </div>
      </section>

      <footer className="nr-wrap nr-foot">
        <span>© {new Date().getFullYear()} NOIR</span>
        <span>Ramallah</span>
      </footer>
    </div>
  );
}
