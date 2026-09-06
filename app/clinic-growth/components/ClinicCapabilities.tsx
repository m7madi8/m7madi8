import ClinicReveal from "./ClinicReveal";

const CAPABILITIES: {
  index: string;
  title: string;
  copy: string;
  span: "wide" | "half";
}[] = [
  {
    index: "01",
    title: "Digital presence",
    copy: "A premium clinic website designed around trust, patient intent, and conversion — not a generic template.",
    span: "wide",
  },
  {
    index: "02",
    title: "Booking",
    copy: "Makes it easier for patients to request or book an appointment, with less friction at the moment they're ready.",
    span: "half",
  },
  {
    index: "03",
    title: "Lead management",
    copy: "Tracks people who contact the clinic but don't book, so no inquiry disappears unnoticed.",
    span: "half",
  },
  {
    index: "04",
    title: "Follow-up",
    copy: "Prevents potential patients from going quiet after their first message.",
    span: "half",
  },
  {
    index: "05",
    title: "Patient relationships",
    copy: "Keeps patient interactions and useful context organized in one place.",
    span: "half",
  },
  {
    index: "06",
    title: "Reactivation",
    copy: "Reconnects with previous patients who haven't come back in a while.",
    span: "half",
  },
  {
    index: "07",
    title: "Reviews",
    copy: "A structured process for collecting patient feedback, at the moments it's most likely to happen.",
    span: "half",
  },
  {
    index: "08",
    title: "Insights",
    copy: "Shows where patients actually come from, and what happens after they make contact.",
    span: "wide",
  },
];

export default function ClinicCapabilities() {
  return (
    <section className="cg-shell cg-section">
      <ClinicReveal>
        <p className="cg-step-count uppercase">The capabilities</p>
        <h2 className="section-title mt-3 max-w-lg font-medium text-white">
          Everything the journey needs, working as one system.
        </h2>
      </ClinicReveal>

      <div className="cg-capabilities-grid mt-10">
        {CAPABILITIES.map((cap) => (
          <ClinicReveal
            key={cap.index}
            as="div"
            className="cg-capability"
            data-span={cap.span}
          >
            <span className="cg-capability-index">{cap.index}</span>
            <h3 className="mt-2 text-lg font-medium text-white sm:text-xl">
              {cap.title}
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-[color:var(--muted)]">
              {cap.copy}
            </p>
          </ClinicReveal>
        ))}
      </div>
    </section>
  );
}
