/**
 * StudySessionList
 *
 * Server Component that fetches and renders all study sessions for a given student.
 *
 * Responsibilities:
 * - Queries the database for sessions matching the provided `studentId`.
 * - Displays an empty-state prompt with a link to create a session if none exist.
 * - Renders a responsive grid of session cards showing title, status badge,
 *   formatted date/time range, optional notes, and a link to each session's detail page.
 * - Throws an error to trigger the nearest error boundary if the database fetch fails.
 */
import Link from 'next/link';
import { connection } from 'next/server';
import { getStudySessionsByStudent } from '@/lib/db/sessions-db';
import { StudySession } from '@/types/study-session';
import { statusStyles } from '@/lib/styles/session-status';
import { formatSessionDate, formatSessionTimeRange } from '@/lib/dates';

interface StudySessionListProps {
  student_id: string;
}

export async function StudySessionList({ student_id }: StudySessionListProps) {
  await connection();
  let sessions: StudySession[] = [];

  try {
    sessions = await getStudySessionsByStudent(student_id);
  } catch (error) {
    console.error('Failed to retrieve sessions for this student', error);
    throw new Error('No study sessions found for this student.');
  }

  // Empty State
  if (sessions.length === 0) {
    return (
      <div className="bg-surface border border-dashed border-border rounded-xl p-10 text-center card-shadow">
        <p className="text-muted mb-4">No study sessions yet.</p>
        <Link
          href="/study-sessions/new"
          className="inline-block bg-primary hover:bg-primary-hover text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Create your first session
        </Link>
      </div>
    );
  }

  // Session Cards Grid
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {sessions.map((session) => (
        <Link
          key={session.id}
          href={`/study-sessions/${session.id}`}
          className="block bg-surface border border-border hover:border-primary rounded-xl p-5 card-shadow card-shadow-hover"
        >
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-lg font-semibold text-foreground">
              {session.title}
            </h2>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                statusStyles[session.status]
              }`}
            >
              {session.status}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted">
            {formatSessionDate(session.start_time)} •{' '}
            {formatSessionTimeRange(session.start_time, session.end_time)}
          </p>


          {session.notes && (
            <p className="mt-3 line-clamp-2 text-sm text-muted border-t border-border pt-3">
              {session.notes}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
