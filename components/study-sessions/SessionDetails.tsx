/**
 * StudySessionDetails
 *
 * Server Component that fetches and renders the full details of a single study session.
 *
 * Responsibilities:
 * - Queries the database for the session matching the provided `sessionId`.
 * - Verifies that the session exists and belongs to the authenticated `studentId`,
 *   triggering Next.js `notFound()` if missing or unauthorized.
 * - Renders the session title, status badge, formatted date/time range, and session notes.
 * - Throws an error to trigger the nearest error boundary if the database query fails.
 */


import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { StudySession } from "@/types/study-session";
import { getStudySessionById } from "@/lib/db/sessions-db";
import { formatSessionDate, formatSessionTimeRange } from "@/lib/dates";
import { statusStyles } from "@/lib/styles/session-status";

interface StudySessionDetailsProps {
    session_id: number;
    student_id: string;
}

export async function StudySessionDetails({ session_id, student_id }: StudySessionDetailsProps) {
    await connection();
    let session: StudySession | null = null
    
    //Database access
    try{
        session = await getStudySessionById(session_id, student_id);
    }catch (error) {
        console.error('Failed to retreive study session', error);
        throw new Error('Study session not available at this time. Please try again later.');
    }

    //Trigger Next.js 404 page if the ID doesn't exist in the DB
    if (!session || session.student_id !== student_id) {
        notFound();
    }

    //Render details outside try/catch
    return(
        <div className="bg-surface border border-border rounded-xl p-6 md:p-8 card-shadow">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">
                        {session.title}
                    </h1>
                    <p>
                        {formatSessionDate(session.start_time)}
                        {formatSessionTimeRange(session.start_time, session.end_time)}
                    </p>
                </div>

                <span 
                    className={
                        `rounded-full px-3 py-1 text-xs font-medium capitalize 
                        ${statusStyles[session.status]}`
                    }
                >
                    {session.status}    
                </span>
            </div>    
            
            <div className="mt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">
                    Session Notes
                </h2>
                <p className="text-foreground whitespace-pre-line">
                    {session.notes || 'No notes added for this session.'}
                </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <Link
                    href="/study-sessions"
                    className="text-sm font-medium text-muted hover:text-primary transition-colors"
                >
                    ← Back to All Sessions
                </Link>
                    
                {/* Placeholder action buttons for when we build Edit & Delete */}
                <div className="flex gap-3">
                    <Link
                        href={`/study-sessions/${session.id}/edit`}
                        className="bg-surface-secondary hover:bg-border text-foreground font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
    
}