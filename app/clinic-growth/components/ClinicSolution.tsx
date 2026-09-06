import ClinicReveal from "./ClinicReveal";

const STAGES = [
  {
    mark: "01",
    title: "Discover",
    copy: "A patient finds the clinic through search, social, or a referral.",
  },
  {
    mark: "02",
    title: "Contact",
    copy: "They reach out — by message, call, or form — and land in one place.",
  },
  {
    mark: "03",
    title: "Book",
    copy: "The inquiry becomes a scheduled appointment, without back-and-forth.",
  },
  {
    mark: "04",
    title: "Follow up",
    copy: "Anyone who doesn't book right away is never simply forgotten.",
  },
  {
    mark: "05",
    title: "Return",
    copy: "Past patients are reconnected with, instead of going quiet.",
  },
  {
    mark: "06",
    title: "Review",
    copy: "Good experiences turn into reviews that bring the next patient in.",
  },
];

export default function ClinicSolution() {
  return (
    <section id="journey" className="cg-shell cg-section scroll-mt-24">
      <ClinicReveal>
        <p className="cg-step-count uppercase">The system</p>
        <h2 className="section-title mt-3 max-w-lg font-medium text-white">
          One connected patient journey.
        </h2>
      </ClinicReveal>

      <div className="cg-stage-list mt-10">
        {STAGES.map((stage) => (
          <ClinicReveal key={stage.mark} as="div" className="cg-stage-row">
            <span className="cg-stage-mark">{stage.mark}</span>
            <div>
              <h3 className="text-lg font-medium text-white sm:text-xl">
                {stage.title}
              </h3>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[color:var(--muted)]">
                {stage.copy}
              </p>
            </div>
          </ClinicReveal>
        ))}
      </div>
    </section>
  );
}
