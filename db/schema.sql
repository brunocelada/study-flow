CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS academic_tasks (
  id SERIAL PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  course_name TEXT,
  description TEXT,
  due_date TIMESTAMPTZ,
  estimated_duration INTEGER,
  priority TEXT,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS study_sessions (
  id SERIAL PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  task_id INTEGER REFERENCES academic_tasks(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL,
  notes TEXT
);