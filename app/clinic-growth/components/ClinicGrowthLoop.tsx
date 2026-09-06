import ClinicReveal from "./ClinicReveal";

const LOOP_STAGES = ["Attract", "Capture", "Book", "Follow up", "Return", "Grow"];

const RADIUS = 120;
const CENTER = 150;

function pointOnCircle(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

export default function ClinicGrowthLoop() {
  return (
    <section className="cg-shell cg-section">
      <ClinicReveal className="mx-auto max-w-lg text-center">
        <p className="cg-step-count uppercase">The growth loop</p>
        <h2 className="section-title mt-3 font-medium text-white">
          Every interaction is an opportunity to grow.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted)] sm:text-base">
          Turn disconnected patient interactions into one continuous loop —
          each stage feeding the next.
        </p>
      </ClinicReveal>

      <ClinicReveal className="cg-loop-wrap mt-10">
        <svg
          className="cg-loop-svg"
          viewBox="0 0 300 300"
          width="300"
          height="300"
          role="img"
          aria-label="Growth loop: attract, capture, book, follow up, return, grow — feeding back into itself"
        >
          <circle className="cg-loop-ring" cx={CENTER} cy={CENTER} r={RADIUS} />
          {LOOP_STAGES.map((stage, i) => {
            const { x, y } = pointOnCircle(i, LOOP_STAGES.length);
            const labelPoint = pointOnCircle(i, LOOP_STAGES.length);
            const labelX = CENTER + (RADIUS + 26) * ((labelPoint.x - CENTER) / RADIUS);
            const labelY = CENTER + (RADIUS + 26) * ((labelPoint.y - CENTER) / RADIUS);
            return (
              <g key={stage}>
                <circle className="cg-loop-dot" cx={x} cy={y} r={4} />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {stage}
                </text>
              </g>
            );
          })}
        </svg>
      </ClinicReveal>
    </section>
  );
}
