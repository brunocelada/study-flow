-- -- 1. Insert 4 regular users
INSERT INTO users (id, email) VALUES
  ('usr_01a9b8c7', 'alex.rivera@university.edu'),
  ('usr_02d6e5f4', 'maya.lin@university.edu'),
  ('usr_03g3h2i1', 'jordan.patel@university.edu'),
  ('usr_04j0k9l8', 'sam.oconnor@university.edu');

--2. Insert 12 academic tasks across the users
--(IDs 1 through 12 will be auto-generated sequentially on a fresh table)
INSERT INTO academic_tasks (student_id, title, course_name, description, due_date, estimated_duration, priority, status) VALUES
  ('usr_01a9b8c7', 'Binary Search Tree Lab', 'CS 201: Data Structures', 'Implement insertion, deletion, and traversal methods in C++.', '2026-11-30 23:59:00+00', 180, 'High', 'In Progress'),
  ('usr_01a9b8c7', 'Linear Regression Problem Set', 'STAT 310: Applied Statistics', 'Complete exercises 4.1 to 4.15 using RStudio.', '2026-12-03 17:00:00+00', 120, 'Medium', 'Pending'),
  ('usr_01a9b8c7', 'Database Normalization Quiz Prep', 'CS 340: Database Systems', 'Review 1NF, 2NF, 3NF, and BCNF examples.', '2026-12-05 14:00:00+00', 60, 'Low', 'Completed'),

  ('usr_02d6e5f4', 'Organic Chemistry Lab Report', 'CHEM 204: Organic Chemistry II', 'Write discussion and error analysis for synthesis experiment.', '2026-11-29 23:59:00+00', 150, 'High', 'In Progress'),
  ('usr_02d6e5f4', 'Cell Signaling Chapter Summary', 'BIO 115: Cell Biology', 'Summarize pages 210-245 and create flashcards.', '2026-12-02 12:00:00+00', 90, 'Medium', 'Completed'),
  ('usr_02d6e5f4', 'Calc III Vector Fields Worksheet', 'MATH 251: Multivariable Calculus', 'Solve line integrals and conservative vector field problems.', '2026-12-06 23:59:00+00', 120, 'High', 'Pending'),

  ('usr_03g3h2i1', 'Microeconomics Case Study', 'ECON 101: Principles of Microeconomics', 'Analyze supply shock impacts on local agricultural markets.', '2026-12-01 16:00:00+00', 120, 'Medium', 'In Progress'),
  ('usr_03g3h2i1', 'Cold War Primary Source Essay', 'HIST 212: Modern World History', '1,500-word essay comparing diplomatic cables from 1962.', '2026-12-08 23:59:00+00', 240, 'High', 'Pending'),
  ('usr_03g3h2i1', 'Spanish Oral Presentation Slides', 'SPAN 202: Intermediate Spanish', 'Prepare 6 slides on sustainable tourism in Costa Rica.', '2026-12-04 10:00:00+00', 75, 'Low', 'Completed'),

  ('usr_04j0k9l8', 'Thermodynamics Problem Set 6', 'PHYS 220: General Physics II', 'Entropy and Carnot cycle calculations.', '2026-11-28 23:59:00+00', 150, 'High', 'In Progress'),
  ('usr_04j0k9l8', 'Ethics in AI Position Paper', 'PHIL 105: Contemporary Ethics', 'Draft thesis and outline arguments on algorithmic bias.', '2026-12-07 23:59:00+00', 180, 'Medium', 'Pending'),
  ('usr_04j0k9l8', 'Circuit Analysis Simulation', 'EE 201: Intro to Circuits', 'Simulate RLC transient response in LTspice.', '2026-12-01 18:00:00+00', 90, 'Medium', 'Completed');

-- 3. Insert 12 study sessions (linked to users and tasks, including 2 standalone sessions)
INSERT INTO study_sessions (student_id, task_id, title, start_time, end_time, status, notes) VALUES
  ('usr_01a9b8c7', 1, 'BST Deletion Edge Cases', '2026-11-25 14:00:00+00', '2026-11-25 15:30:00+00', 'Completed', 'Finished node deletion with two children; need to test memory leaks.'),
  ('usr_01a9b8c7', 2, 'RStudio Regression Setup', '2026-11-26 10:00:00+00', '2026-11-26 11:30:00+00', 'Scheduled', 'Focus on residual plots for questions 4.5-4.10.'),
  ('usr_01a9b8c7', 3, 'Normalization Practice', '2026-11-24 18:00:00+00', '2026-11-24 19:00:00+00', 'Completed', 'Reviewed functional dependencies and decomposition.'),

  ('usr_02d6e5f4', 4, 'Orgo Yield Calculations', '2026-11-25 09:00:00+00', '2026-11-25 10:30:00+00', 'Completed', 'Calculated percent yield and started spectral analysis section.'),
  ('usr_02d6e5f4', 5, 'GPCR Pathway Flashcards', '2026-11-23 16:00:00+00', '2026-11-23 17:30:00+00', 'Completed', 'Made 35 Anki cards for kinase cascades.'),
  ('usr_02d6e5f4', 6, 'Green''s Theorem Review', '2026-11-27 13:00:00+00', '2026-11-27 15:00:00+00', 'Scheduled', 'Work through textbook examples before starting worksheet.'),

  ('usr_03g3h2i1', 7, 'Elasticity Data Gathering', '2026-11-25 11:00:00+00', '2026-11-25 12:30:00+00', 'Completed', 'Pulled regional price charts for the past 5 years.'),
  ('usr_03g3h2i1', 8, 'Archive Document Reading', '2026-11-28 15:00:00+00', '2026-11-28 17:00:00+00', 'Scheduled', 'Annotate primary sources and draft thesis statement.'),
  ('usr_03g3h2i1', NULL, 'General Spanish Vocabulary Drill', '2026-11-24 19:30:00+00', '2026-11-24 20:15:00+00', 'Completed', 'Standalone speaking practice with study partner.'),

  ('usr_04j0k9l8', 10, 'Carnot Engine Practice', '2026-11-25 16:00:00+00', '2026-11-25 18:00:00+00', 'In Progress', 'Completed problems 1-4; stuck on adiabatic expansion step in #5.'),
  ('usr_04j0k9l8', 11, 'AI Ethics Readings', '2026-11-29 10:00:00+00', '2026-11-29 12:00:00+00', 'Scheduled', 'Read assigned papers on fairness metrics.'),
  ('usr_04j0k9l8', NULL, 'Midterm Formula Sheet Review', '2026-11-22 14:00:00+00', '2026-11-22 15:30:00+00', 'Cancelled', 'Rescheduled due to lab partner conflict.');
