CREATE TABLE IF NOT EXISTS academic_tasks (
    id SERIAL PRIMARY KEY,
    student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    course TEXT,
    description TEXT,
    due_date TIMESTAMPTZ,
    estimated_duration INTEGER,
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
    status TEXT NOT NULL CHECK (
        status IN ('pending', 'in_progress', 'completed')
    ),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);