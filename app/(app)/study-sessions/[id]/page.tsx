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

async function SuspendedSessionContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session_id = Number(id);

  if (isNaN(session_id) || session_id <= 0) {
    notFound();
  }

  const student_id = "usr_01a9b8c7";

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href={`/study-sessions/${session_id}/edit`}
          className="bg-primary hover:bg-primary-hover text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Update Session
        </Link>
        <Link
          href={`/study-sessions/${session_id}/delete`}
          className="bg-error-light hover:bg-error hover:text-white text-error font-medium px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Delete Session
        </Link>
      </div>

      <StudySessionDetails session_id={session_id} student_id={student_id} />
    </>
  );
}

export default function StudySessionDetailsPage({
  params,
}: StudySessionDetailsPageProps) {
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

      <Suspense fallback={<p className="text-muted">Loading session details...</p>}>
        <SuspendedSessionContent params={params} />
      </Suspense>
    </main>
  );
}
