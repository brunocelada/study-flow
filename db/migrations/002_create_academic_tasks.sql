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
