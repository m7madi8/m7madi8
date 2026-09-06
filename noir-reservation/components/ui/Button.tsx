"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const base =
  "focus-ring inline-flex items-center justify-center gap-2 tracking-[0.08em] uppercase text-[13px] font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-[#0a0a0a] px-7 py-4 hover:brightness-110 active:scale-[0.98]",
  secondary:
    "border border-border-strong text-text px-7 py-4 hover:border-accent hover:text-accent",
  ghost: "text-text-muted hover:text-text px-2 py-2",
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", fullWidth, className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          base,
          variants[variant],
          fullWidth && "w-full",
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
