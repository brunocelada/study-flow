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
      className={`w-full rounded-lg border bg-surface px-3 py-2.5 text-sm text-foreground
        outline-none transition-colors placeholder:text-muted
        focus:border-primary focus:ring-2 focus:ring-primary-light
        disabled:cursor-not-allowed disabled:bg-surface-secondary disabled:text-muted
        ${
          invalid
            ? "border-error focus:border-error focus:ring-error-light"
            : "border-border"
        }
        ${className}`}
    />
  );
}