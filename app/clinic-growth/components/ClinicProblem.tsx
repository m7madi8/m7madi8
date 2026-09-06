import ClinicReveal from "./ClinicReveal";

const CHANNELS = [
  "Instagram",
  "Google",
  "WhatsApp",
  "Phone",
  "Website",
  "Appointments",
  "Reviews",
];

export default function ClinicProblem() {
  return (
    <section className="cg-shell cg-section">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <ClinicReveal>
          <p className="cg-step-count uppercase">The fragmentation</p>
          <h2 className="section-title mt-3 max-w-md font-medium text-white">
            Your patients are everywhere.
            <br />
            Your system shouldn&apos;t be.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[color:var(--muted)] sm:text-base">
            Clinics often have separate channels for discovery, communication,
            booking, and reviews — but these experiences aren&apos;t
            connected. Every gap between them is a patient who quietly goes
            elsewhere.
          </p>
        </ClinicReveal>

        <ClinicReveal className="cg-channel-field lg:justify-end">
          {CHANNELS.map((channel) => (
            <span key={channel} className="cg-channel-chip">
              {channel}
            </span>
          ))}
        </ClinicReveal>
      </div>
    </section>
  );
}
