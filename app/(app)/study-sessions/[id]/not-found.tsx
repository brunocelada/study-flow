/**
 * NotFound (/not-found)
 *
 * Custom 404 page styled to match the Study-Flow design system.
 * Triggered automatically when `notFound()` is called (e.g., invalid IDs,
 * missing records, or unauthorized resource access) or on unmatched routes.
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-container py-16 flex items-center justify-center min-h-[70vh]">
      <div className="bg-surface border border-border rounded-xl p-8 md:p-10 card-shadow max-w-md w-full text-center">
        {/* Badge */}
        <span className="inline-block rounded-full bg-surface-secondary border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted mb-4">
          404 • Page Not Found
        </span>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          We couldn&apos;t find that study resource
        </h1>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed mb-8">
          The page or study session you&apos;re looking for may have been moved,
          deleted, or you may not have permission to view it.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/study-sessions"
            className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Back to Study Sessions
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto bg-surface-secondary hover:bg-border text-foreground font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

