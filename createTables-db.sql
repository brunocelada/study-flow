CREATE TABLE "User" (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE "AcademicTask" (
  id SERIAL PRIMARY KEY,
  "studentId" INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  "courseName" VARCHAR(100),
  description TEXT,
  "dueDate" TIMESTAMP,
  "estimatedDuration" INTEGER, -- e.g., in minutes
  priority VARCHAR(50),
  status VARCHAR(50)
);

CREATE TABLE "StudySession" (
  id SERIAL PRIMARY KEY,
  "studentId" INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "taskId" INTEGER REFERENCES "AcademicTask"(id) ON DELETE SET NULL, -- Optional link
  title VARCHAR(255) NOT NULL,
  "startTime" TIMESTAMP NOT NULL,
  "endTime" TIMESTAMP NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'scheduled',
  notes TEXT
);
