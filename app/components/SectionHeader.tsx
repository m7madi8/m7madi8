import ScrollFloat from "./ScrollFloat";

type SectionHeaderProps = {
  eyebrow: string;
  index?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      <div
        className={`section-eyebrow-row reveal ${align === "center" ? "justify-center" : ""}`}
        data-reveal
      >
        {index ? (
          <span className="section-index" aria-hidden>
            {index}
          </span>
        ) : null}
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <ScrollFloat
        as="h2"
        className="section-title section-title--serif mt-3"
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="center bottom+=50%"
        scrollEnd="bottom bottom-=40%"
        stagger={0.03}
      >
        {title}
      </ScrollFloat>
      {description ? (
        <p
          className="reveal mt-4 text-base leading-relaxed text-[color:var(--muted)] sm:text-lg"
          data-reveal
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
