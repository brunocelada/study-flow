
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export default function Input({
  invalid = false,
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900
        outline-none transition-colors placeholder:text-slate-400
        focus:border-blue-600 focus:ring-2 focus:ring-blue-100
        disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500
        ${invalid
          ? "border-red-500 focus:border-red-600 focus:ring-red-100"
          : "border-slate-200"}
        ${className}`}
    />
  );
}
