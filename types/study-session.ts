export type SessionStatus = 
  | 'scheduled'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export interface StudySession {
  id: number;
  student_id: string;
  task_id: number | null;
  title: string;
  start_time: Date;
  end_time: Date;
  status: SessionStatus;
  notes: string | null;
}  
