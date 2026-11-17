import { sql } from "@/lib/db/client";
import type { AcademicTask } from "@/types/tasks";

type AcademicTaskRow = {
  id: number;
  student_id: string;
  title: string;
  course_name: string | null;
  description: string | null;
  due_date: Date | null;
  estimated_duration: number | null;
  priority: string | null;
  status: string;
};

function mapTask(row: AcademicTaskRow): AcademicTask {
  return {
    id: row.id,
    studentId: row.student_id,
    title: row.title,
    courseName: row.course_name,
    description: row.description,
    dueDate: row.due_date,
    estimatedDuration: row.estimated_duration,
    priority: row.priority,
    status: row.status,
  };
}

export async function getTasksByStudentId(studentId: string): Promise<AcademicTask[]> {
  const rows = (await sql`
    SELECT
      id,
      student_id,
      title,
      course_name,
      description,
      due_date,
      estimated_duration,
      priority,
      status
    FROM academic_tasks
    WHERE student_id = ${studentId}
    ORDER BY due_date ASC NULLS LAST
  `) as AcademicTaskRow[];

  return rows.map(mapTask);
}

export async function getTaskById(id: number): Promise<AcademicTask | null> {
  const rows = (await sql`
    SELECT
      id,
      student_id,
      title,
      course_name,
      description,
      due_date,
      estimated_duration,
      priority,
      status
    FROM academic_tasks
    WHERE id = ${id}
    LIMIT 1
  `) as AcademicTaskRow[];

  return rows[0] ? mapTask(rows[0]) : null;
}

export async function createTask(task: Omit<AcademicTask, "id">): Promise<AcademicTask> {
  const rows = (await sql`
    INSERT INTO academic_tasks (
      student_id,
      title,
      course_name,
      description,
      due_date,
      estimated_duration,
      priority,
      status
    )
    VALUES (
      ${task.studentId},
      ${task.title},
      ${task.courseName ?? null},
      ${task.description ?? null},
      ${task.dueDate ?? null},
      ${task.estimatedDuration ?? null},
      ${task.priority ?? null},
      ${task.status}
    )
    RETURNING
      id,
      student_id,
      title,
      course_name,
      description,
      due_date,
      estimated_duration,
      priority,
      status
  `) as AcademicTaskRow[];

  return mapTask(rows[0]);
}
