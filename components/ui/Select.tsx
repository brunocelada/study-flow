
import type { SelectHTMLAttributes } from "react";

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export default function Select({
  children,
  invalid = false,
  className = "",
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      aria-invalid={invalid || undefined}
      className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900
        outline-none transition-colors
        focus:border-blue-600 focus:ring-2 focus:ring-blue-100
        disabled:cursor-not-allowed disabled:bg-slate-100
        ${invalid
          ? "border-red-500 focus:border-red-600 focus:ring-red-100"
          : "border-slate-200"}
        ${className}`}
    >
      {children}
    </select>
  );
}
