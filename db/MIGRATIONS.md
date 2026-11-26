# StudyFlow Database Migrations

These SQL scripts define the current StudyFlow MVP database structure.

## Execution Order

Run the migration files in the following order:

1. `001_create_users.sql`
2. `002_create_academic_tasks.sql`
3. `003_create_study_sessions.sql`
4. `004_create_indexes.sql`
5. `005_add_password_hash_to_users.sql`

## Migration Details

### 001_create_users.sql

Creates the `users` table.

The table stores the StudyFlow student account identifier and unique email address.

### 002_create_academic_tasks.sql

Creates the `academic_tasks` table.

Each academic task belongs to a user through `student_id`.

Deleting a user deletes that user's academic tasks through `ON DELETE CASCADE`.

### 003_create_study_sessions.sql

Creates the `study_sessions` table.

Each study session belongs to a user through `student_id`.

A study session may optionally reference an academic task through `task_id`.

Deleting a user deletes that user's study sessions through `ON DELETE CASCADE`.

Deleting a linked academic task preserves the study session and sets `task_id` to `NULL` through `ON DELETE SET NULL`.

### 004_create_indexes.sql

Creates indexes for frequently queried columns related to:

- task ownership
- task due dates
- task status
- study session ownership
- task-linked study sessions
- session start times
- session status

### 005_add_password_hash_to_users.sql

Adds the `password_hash` column to the existing `users` table.

This column stores the hashed password used by the authentication feature.

## Notes

- Run these scripts against a PostgreSQL database.
- The current project uses Neon Postgres.
- The scripts use `IF NOT EXISTS` where applicable so they can be safely reviewed against an existing environment.
- Task priority, task status, and study-session status values are not currently enforced as database enums because those values have not yet been finalized by the team.
- Authentication-specific password storage is introduced by `005_add_password_hash_to_users.sql`.
- Test seed data is intentionally not included in the migration sequence to avoid inserting development records into the shared database.
