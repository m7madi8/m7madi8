import ClinicReveal from "./ClinicReveal";

export default function ClinicHero() {
  return (
    <section className="cg-shell cg-hero">
      <ClinicReveal className="flex items-center gap-3">
        <span className="cg-hero-signal" aria-hidden />
        <p className="cg-step-count uppercase">A private growth concept</p>
      </ClinicReveal>

      <ClinicReveal as="h1" className="cg-hero-headline mt-6 font-medium text-white">
        Your clinic deserves more than a website.
      </ClinicReveal>

      <ClinicReveal className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--muted)] sm:text-lg">
        A connected digital experience designed to help clinics attract
        patients, turn inquiries into bookings, and build lasting patient
        relationships.
      </ClinicReveal>

      <ClinicReveal className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a href="#journey" className="btn-primary px-6 py-3.5 text-center" data-cursor>
          See how it works
        </a>
        <a
          href="#assessment"
          className="px-6 py-3.5 text-center text-sm text-[color:var(--muted)] underline decoration-[color:var(--border)] underline-offset-4 transition hover:text-white hover:decoration-white"
          data-cursor
        >
          I&apos;m interested
        </a>
      </ClinicReveal>
    </section>
  );
}
