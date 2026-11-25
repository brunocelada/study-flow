CREATE TABLE IF NOT EXISTS study_sessions (
  id SERIAL PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  task_id INTEGER REFERENCES academic_tasks(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL,
  notes TEXT,
  CHECK (end_time > start_time)
);
