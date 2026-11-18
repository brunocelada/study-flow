# StudyFlow Database

StudyFlow uses PostgreSQL with Neon Postgres.

## Environment variable

Create a local `.env.local` file with:

DATABASE_URL="your-neon-postgresql-connection-string"

Never commit `.env.local` or database credentials.

The repository includes `.env.example` as documentation only.

## Schema

The initial database schema is defined in:

db/schema.sql

Core entities:

- users
- academic_tasks
- study_sessions

## Relationships

- One user can have many academic tasks.
- One user can have many study sessions.
- One academic task can have many study sessions.
- A study session may exist without an academic task.

## Pending team decisions

The following items are intentionally not enforced as database enums yet:

- Task priority values
- Task status values
- Study Session status values
- Final authentication-specific user fields

The current `study_sessions.task_id` foreign key uses `ON DELETE SET NULL`.
This should be reviewed by the team before the shared database is finalized.
