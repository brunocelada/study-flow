export type SessionStatus = 
  | 'scheduled'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export interface StudySession {
  id: number;
  studentId: number;
  taskId: number | null;
  title: string;
  startTime: Date;
  endTime: Date;
  status: SessionStatus;
  notes: string | null;
}  
