/**
 * StudySessionsPage (/study-sessions)
 *
 * Main route page for viewing and managing a student's study sessions.
 *
 * Responsibilities:
 * - Renders the page header, description, and primary action button to create a new session.
 * - Wraps `StudySessionList` in a React `<Suspense>` boundary to display a loading fallback
 *   while session data is fetched from the database.
 * - Currently uses a temporary `studentId` until authentication is integrated.
 */


import Link from 'next/link';
import { Suspense } from 'react';
import { StudySessionList } from '@/components/study-sessions/SessionList';

export default function StudySessionsPage() {
  // TODO: Replace hardcoded studentId with real auth session later
  const student_id = "usr_01a9b8c7";

  return (
    <main className="page-container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Study Sessions
          </h1>
          <p className="text-sm text-muted mt-1">
            Plan, track, and review your focused study blocks.
          </p>
        </div>

        <Link
          href="/study-sessions/new"
          className="bg-primary hover:bg-primary-hover text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + New Session
        </Link>
      </div>

      <Suspense fallback={<p className="text-muted">Loading study sessions...</p>}>
        <StudySessionList student_id={student_id} />
      </Suspense>
    </main>
  );
}
