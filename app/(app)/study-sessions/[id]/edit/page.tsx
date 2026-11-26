

import Link from 'next/link';

export default function UpdateStudySessionPage() {
  return (
    <main className="page-container py-8">
      <div className="mb-6">
        <Link
          href="/study-sessions"
          className="text-sm font-medium text-muted hover:text-primary transition-colors"
        >
          ← Back to Study Sessions
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-xl p-10 text-center card-shadow max-w-xl mx-auto">
        <span className="inline-block rounded-full bg-warning-light text-warning px-3 py-1 text-xs font-medium mb-3">
          Under Construction
        </span>

        <h1 className="text-2xl font-semibold text-foreground">
          Update Study Session — Coming Soon
        </h1>

        <p className="text-sm text-muted mt-2 mb-6">
          The form to schedule and link new study sessions to your academic tasks is currently in development.
        </p>

        <Link
          href="/study-sessions"
          className="inline-block bg-primary hover:bg-primary-hover text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Return to Sessions List
        </Link>
      </div>
    </main>
  );
}
