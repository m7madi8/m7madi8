import ClinicReveal from "./ClinicReveal";

export default function ClinicFinalCta() {
  return (
    <section className="cg-shell cg-section text-center">
      <ClinicReveal className="mx-auto max-w-xl">
        <h2 className="section-title font-medium text-white">
          Your next patient is already looking for you.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted)] sm:text-base">
          The question is what happens after they find you.
        </p>
        <a
          href="#assessment"
          className="btn-primary mt-8 inline-flex px-8 py-3.5"
          data-cursor
        >
          Start a conversation
        </a>
      </ClinicReveal>
    </section>
  );
}
