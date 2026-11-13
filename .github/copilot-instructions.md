# StudyFlow Copilot Instructions

## Project Overview

StudyFlow is a full-stack web application for students to manage academic tasks and study sessions, and to review their workload through a dashboard.

## Tech Stack

- Next.js with the App Router
- TypeScript
- Tailwind CSS
- PostgreSQL
- Neon Postgres via Vercel Marketplace

## Project Structure

Use the existing route-group structure:

- `app/(main)` for public landing content
- `app/(auth)` for authentication routes such as login and registration
- `app/(app)` for authenticated application pages
- `components/` for reusable UI and feature components
- `types/` for shared TypeScript types

Do not create duplicate routes across route groups.

## Feature Ownership

Current team ownership:

- Ronaldo: Database and data-access layer
- Kennedy / Obakeng: Home page, dashboard, and dashboard components
- Bruno: Tasks pages and task components
- Horacio: Study Sessions pages and study-session components

Avoid modifying another teammate's feature area unless the team has agreed to the change.

## Git Workflow

- Create feature branches for new work.
- Branch naming convention: `feature-[featureName]`
- Do not develop directly on `main`.
- Open a pull request after completing a feature.
- A teammate should review the pull request before it is merged.

## Data and Architecture

Core StudyFlow entities include:

- User / Student
- Academic Task
- Study Session

Expected relationships:

- One user can have many academic tasks.
- One user can have many study sessions.
- A study session may optionally be linked to an academic task.

Database and data-access code should provide a shared foundation for authentication, tasks, study sessions, and dashboard data.

## Security

- Never commit database credentials or secrets.
- Store sensitive values in environment variables.
- Keep local environment files excluded from Git.
- Ensure authenticated users can access only their own StudyFlow data.

## TypeScript and Code Quality

- Prefer strong TypeScript types.
- Avoid `any` unless there is a clear reason.
- Reuse shared types instead of duplicating data shapes.
- Follow the existing ESLint and Prettier configuration.
- Keep components and functions focused and reusable.

## Next.js Guidelines

- Prefer Server Components by default.
- Use Client Components only when client-side interactivity or browser APIs are required.
- Preserve the current route-group architecture.
- Do not introduce duplicate public paths.

## Team Coordination

The team uses asynchronous Teams check-ins with:

- Progress
- Blockers
- Next step

## Pending Team Decisions

Do not invent or finalize these without team agreement:

- Final authentication implementation details
- Allowed task priority values
- Allowed task status values
- Allowed study-session status values
- Final behavior when deleting a task linked to study sessions
