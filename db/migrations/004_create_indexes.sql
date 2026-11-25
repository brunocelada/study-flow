CREATE INDEX IF NOT EXISTS idx_academic_tasks_student_due_date
  ON academic_tasks(student_id, due_date);

CREATE INDEX IF NOT EXISTS idx_academic_tasks_student_status
  ON academic_tasks(student_id, status);

CREATE INDEX IF NOT EXISTS idx_study_sessions_student_start_time
  ON study_sessions(student_id, start_time);

CREATE INDEX IF NOT EXISTS idx_study_sessions_student_status
  ON study_sessions(student_id, status);

CREATE INDEX IF NOT EXISTS idx_study_sessions_task_id
  ON study_sessions(task_id);
