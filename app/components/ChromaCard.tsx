"use client";

import { type ReactNode } from "react";

type ChromaCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  borderColor?: string;
  gradient?: string;
} & React.ComponentPropsWithoutRef<"div">;

export default function ChromaCard({
  children,
  className = "",
  as: Tag = "div",
  borderColor,
  gradient,
  style,
  ...rest
}: ChromaCardProps) {
  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <Tag
      className={`chroma-card-site ${className}`.trim()}
      onMouseMove={handleMove}
      style={
        {
          ...style,
          ...(borderColor && { "--card-border": borderColor }),
          ...(gradient && { "--card-gradient": gradient }),
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
