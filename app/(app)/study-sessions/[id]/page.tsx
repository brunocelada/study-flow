/**
 * StudySessionDetailsPage (/study-sessions/[id])
 *
 * Route page for viewing an individual study session and accessing its management actions.
 *
 * Responsibilities:
 * - Awaits and validates the dynamic `id` route parameter, triggering a 404 if invalid.
 * - Renders navigation links back to the sessions list as well as to the edit and delete routes.
 * - Wraps `StudySessionDetails` in a `<Suspense>` boundary to display a loading fallback
 *   while the session record is fetched and verified against the current `studentId`.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { StudySessionDetails } from "@/components/study-sessions/SessionDetails";

interface StudySessionDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function StudySessionDetailsPage({ params, }: StudySessionDetailsPageProps) {
  const { id } = await params;
  const sessionId = Number(id);

  //Guard against invalid URLs like /study-sessions/abc
  if (isNaN(sessionId) || sessionId <= 0) {
    notFound();
  }
   // TODO: Replace hardcoded studentId with real auth session later
  const studentId = 1;

  return (
    <main className="page-container py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <Link
          href="/study-sessions"
          className="text-sm font-medium text-muted hover:text-primary transition-colors"
        >
          ← Back to Study Sessions
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href={`/study-sessions/${sessionId}/edit`}
            className="bg-primary hover:bg-primary-hover text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Update Session
          </Link>

          <Link
            href={`/study-sessions/${sessionId}/delete`}
            className="bg-error-light hover:bg-error hover:text-white text-error font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Delete Session
          </Link>
        </div>
      </div>

      <Suspense fallback={<p className="text-muted">Loading session details...</p>}>
        <StudySessionDetails sessionId={sessionId} studentId={studentId} />
      </Suspense>
    </main>
  );
}