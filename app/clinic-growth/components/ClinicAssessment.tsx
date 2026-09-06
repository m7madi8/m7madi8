import ClinicForm from "./ClinicForm";
import ClinicReveal from "./ClinicReveal";

export default function ClinicAssessment() {
  return (
    <section id="assessment" className="cg-shell cg-section scroll-mt-24">
      <ClinicReveal className="mx-auto max-w-lg text-center">
        <p className="cg-step-count uppercase">A quick assessment</p>
        <h2 className="section-title mt-3 font-medium text-white">
          Let&apos;s see where your clinic can grow.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted)] sm:text-base">
          Answer a few quick questions about your clinic. I&apos;ll review
          your current digital patient journey and identify the biggest
          opportunities.
        </p>
      </ClinicReveal>

      <ClinicReveal className="mx-auto mt-10 max-w-2xl">
        <ClinicForm />
      </ClinicReveal>
    </section>
  );
}
