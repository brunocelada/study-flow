
import type { HTMLAttributes } from "react";

type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
}

const paddings: Record<CardPadding, string> = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-6",
};

export default function Card({
  children,
  padding = "md",
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white shadow-sm
        ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
