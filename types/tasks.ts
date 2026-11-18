export interface AcademicTask {
  id: number;
  studentId: string;
  title: string;
  courseName?: string | null;
  description?: string | null;
  dueDate?: Date | null;
  estimatedDuration?: number | null;
  priority?: string | null;
  status: string;
}
