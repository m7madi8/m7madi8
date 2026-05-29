type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`reveal max-w-2xl ${alignClass} ${className}`} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-3 font-medium tracking-tight">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-[color:var(--muted)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
