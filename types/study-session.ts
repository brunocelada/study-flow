export interface StudySession {
  id: number;
  studentId: string;
  taskId?: number | null;
  title: string;
  startTime: Date;
  endTime: Date;
  status: string;
  notes?: string | null;
}
