import { sql } from "@/lib/db/client";
import type { StudySession } from "@/types/study-session";

type StudySessionRow = {
  id: number;
  student_id: string;
  task_id: number | null;
  title: string;
  start_time: Date;
  end_time: Date;
  status: string;
  notes: string | null;
};

function mapStudySession(row: StudySessionRow): StudySession {
  return {
    id: row.id,
    studentId: row.student_id,
    taskId: row.task_id,
    title: row.title,
    startTime: row.start_time,
    endTime: row.end_time,
    status: row.status,
    notes: row.notes,
  };
}

export async function getStudySessionsByStudentId(studentId: string): Promise<StudySession[]> {
  const rows = (await sql`
    SELECT
      id,
      student_id,
      task_id,
      title,
      start_time,
      end_time,
      status,
      notes
    FROM study_sessions
    WHERE student_id = ${studentId}
    ORDER BY start_time ASC
  `) as StudySessionRow[];

  return rows.map(mapStudySession);
}

export async function getStudySessionById(id: number): Promise<StudySession | null> {
  const rows = (await sql`
    SELECT
      id,
      student_id,
      task_id,
      title,
      start_time,
      end_time,
      status,
      notes
    FROM study_sessions
    WHERE id = ${id}
    LIMIT 1
  `) as StudySessionRow[];

  return rows[0] ? mapStudySession(rows[0]) : null;
}

export async function createStudySession(session: Omit<StudySession, "id">): Promise<StudySession> {
  const rows = (await sql`
    INSERT INTO study_sessions (
      student_id,
      task_id,
      title,
      start_time,
      end_time,
      status,
      notes
    )
    VALUES (
      ${session.studentId},
      ${session.taskId ?? null},
      ${session.title},
      ${session.startTime},
      ${session.endTime},
      ${session.status},
      ${session.notes ?? null}
    )
    RETURNING
      id,
      student_id,
      task_id,
      title,
      start_time,
      end_time,
      status,
      notes
  `) as StudySessionRow[];

  return mapStudySession(rows[0]);
}
