import ClinicReveal from "./ClinicReveal";

const AUDIENCE = [
  "Dental",
  "Aesthetic",
  "Dermatology",
  "Medical",
  "Physiotherapy",
  "Wellness",
];

export default function ClinicWhoFor() {
  return (
    <section className="cg-shell cg-section">
      <ClinicReveal>
        <p className="cg-step-count uppercase">Who it&apos;s for</p>
        <h2 className="section-title mt-3 max-w-lg font-medium text-white">
          Built around the way modern clinics grow.
        </h2>
      </ClinicReveal>

      <ClinicReveal className="cg-audience-row mt-8">
        {AUDIENCE.map((item) => (
          <span key={item} className="cg-audience-item">
            {item}
          </span>
        ))}
      </ClinicReveal>
    </section>
  );
}
