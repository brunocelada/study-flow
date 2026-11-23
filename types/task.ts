export type TaskStatus = "pending" | "in_progress" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  studentId: string;
  title: string;
  course: string | null;
  description: string | null;
  dueDate: string | null;
  estimatedDuration: number | null;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskInput {
  title: string;
  course: string | null;
  description: string | null;
  dueDate: string | null;
  estimatedDuration: number | null;
  priority: TaskPriority;
  status: TaskStatus;
}
