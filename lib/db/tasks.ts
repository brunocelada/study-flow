import { sql } from "@/lib/db/client";
import type { Task, TaskInput, TaskPriority, TaskStatus } from "@/types/task";

type TaskRow = {
  id: number;
  student_id: string;
  title: string;
  course_name: string | null;
  description: string | null;
  due_date: Date | string | null;
  estimated_duration: number | null;
  priority: string | null;
  status: string;
};

function mapTask(row: TaskRow): Task {
  const priority: TaskPriority =
    row.priority === "low" || row.priority === "high" ? row.priority : "medium";

  const status: TaskStatus =
    row.status === "in_progress" || row.status === "completed" ? row.status : "pending";

  return {
    id: row.id,
    studentId: row.student_id,
    title: row.title,
    course: row.course_name,
    description: row.description,
    dueDate:
      row.due_date instanceof Date
        ? row.due_date.toISOString().slice(0, 10)
        : (row.due_date?.slice(0, 10) ?? null),
    estimatedDuration: row.estimated_duration,
    priority,
    status,
  };
}

export async function getTasksByStudentId(studentId: string): Promise<Task[]> {
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
  `) as TaskRow[];

  return rows.map(mapTask);
}

export async function getTaskById(id: number): Promise<Task | null> {
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
  `) as TaskRow[];

  return rows[0] ? mapTask(rows[0]) : null;
}

export async function createTask(task: TaskInput, studentId: string): Promise<Task> {
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
      ${studentId},
      ${task.title},
      ${task.course},
      ${task.description},
      ${task.dueDate},
      ${task.estimatedDuration},
      ${task.priority},
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
  `) as TaskRow[];

  return mapTask(rows[0]);
}
