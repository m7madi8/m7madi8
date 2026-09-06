import Link from "next/link";
import Nav from "@/components/Nav";
import { RESTAURANT } from "@/lib/mock-data";
import HeroReveal from "@/components/HeroReveal";
import MobileReserveBar from "@/components/MobileReserveBar";

export default function Home() {
  return (
    <main className="relative flex-1">
      <Nav />

      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.95) 100%), url('https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1920&auto=format&fit=crop')",
          }}
        />
        <HeroReveal eyebrow={RESTAURANT.eyebrow} headline={RESTAURANT.tagline} />
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-[1440px] px-6 md:px-10 py-28 md:py-36">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <p className="text-[12px] tracking-[0.18em] uppercase text-accent">
              The Concept
            </p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-[clamp(28px,4vw,44px)] leading-[1.2] italic mb-6">
              A quiet room built around fire, stone, and patience.
            </h2>
            <p className="text-text-muted text-[15px] md:text-[16px] leading-[1.8] max-w-[640px]">
              NOIR reinterprets Palestinian cooking through a modern,
              produce-led lens — slow-cooked over open flame, served in a
              room designed to disappear around the table. No spectacle.
              No shortcuts. Just an evening worth remembering.
            </p>
          </div>
        </div>
      </section>

      {/* LOCATION / CTA */}
      <section
        id="location"
        className="relative border-t border-border mx-auto max-w-[1440px] px-6 md:px-10 py-28 md:py-36"
      >
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-end">
          <div className="md:col-span-7">
            <h2 className="font-display text-[clamp(30px,4.5vw,52px)] leading-[1.15] italic mb-6">
              Reserve your evening.
            </h2>
            <p className="text-text-muted text-[15px] leading-[1.8] max-w-[520px] mb-10">
              {RESTAURANT.address}
              <br />
              {RESTAURANT.phone}
            </p>
            <Link
              href="/reserve"
              className="focus-ring inline-flex items-center justify-center bg-accent text-[#0a0a0a] px-8 py-4 text-[13px] tracking-[0.1em] uppercase font-medium hover:brightness-110 transition-all"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border mx-auto max-w-[1440px] w-full px-6 md:px-10 py-8 flex items-center justify-between text-[11px] tracking-[0.1em] uppercase text-text-muted">
        <span>© {new Date().getFullYear()} NOIR</span>
        <span>Ramallah, Palestine</span>
      </footer>

      <MobileReserveBar />
    </main>
  );
}
