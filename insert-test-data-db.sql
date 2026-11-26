-- 1. Create a test user
INSERT INTO "User" (email) VALUES ('horacio@test.com');

-- 2. Create a test task (id will be 1)
INSERT INTO "AcademicTask" ("studentId", title, "courseName", status) 
VALUES (1, 'Build StudySession UI', 'WDD430', 'in-progress');

-- 3. Create a linked study session AND an unlinked study session
INSERT INTO "StudySession" ("studentId", "taskId", title, "startTime", "endTime", status, notes)
VALUES 
  (1, 1, 'Database & CRUD Setup', '2026-11-20 18:00:00', '2026-11-20 19:30:00', 'scheduled', 'Focus on POST and GET routes'),
  (1, NULL, 'General React Review', '2026-11-21 10:00:00', '2026-11-21 11:00:00', 'completed', 'Standalone review session');
