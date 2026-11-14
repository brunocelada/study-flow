import type { TextareaHTMLAttributes } from "react";

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export default function Textarea({
  invalid = false,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <textarea
      {...props}
      aria-invalid={invalid || undefined}
      className={`w-full min-h-24 resize-y rounded-lg border bg-surface px-3 py-2.5
        text-sm text-foreground outline-none transition-colors
        placeholder:text-muted
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