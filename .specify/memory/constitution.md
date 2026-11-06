<!--
Sync Impact Report
- Version change: unversioned template -> 1.0.0 (initial StudyFlow constitution)
- Modified principles: template placeholders -> I. Type-Safe Next.js Architecture; II. Server-First, Reusable UI; III. Accessible Student Experience; IV. Tested Workflows and Quality; V. Six-Week MVP and Maintainability
- Added sections: Additional Constraints; Development Workflow
- Removed sections: none
- Templates and guidance: ✅ .specify/templates/plan-template.md; ✅ .specify/templates/tasks-template.md; ✅ .github/agents/speckit.tasks.agent.md; ✅ .github/agents/speckit.plan.agent.md; ✅ .specify/templates/spec-template.md reviewed, no change needed; ✅ .github/prompts/ reviewed, no stale references
- Command templates: ⚠ .specify/templates/commands/ does not exist in this repository.
- Follow-up TODO: confirm the original ratification date; it is not recorded in the repository.
-->
# StudyFlow Constitution

## Core Principles

### I. Type-Safe Next.js Architecture
StudyFlow MUST use Next.js App Router conventions and TypeScript strict mode. The codebase
MUST NOT use the `any` type; unknown external data MUST be validated or narrowed before use.
Routes, layouts, loading states, and route handlers MUST use the file-based App Router structure.
This keeps routing predictable and catches invalid application states before they reach students.

### II. Server-First, Reusable UI
Components MUST be Server Components by default. A Client Component is permitted only when
browser state, event handling, or another interactive capability requires it. Components MUST
have clear responsibilities and reusable behavior MUST live in shared components when doing so
reduces duplication without obscuring feature ownership. Styling MUST use Tailwind CSS utilities;
custom CSS is permitted only when utilities cannot express the required design or behavior.

### III. Accessible Student Experience
Every user-facing workflow MUST work across supported mobile and desktop viewport sizes.
Interactive controls MUST be keyboard operable, use semantic elements, expose accessible names,
and preserve visible focus. Forms MUST associate instructions and errors with their controls.
Color MUST NOT be the sole carrier of meaning. These requirements keep workload management usable
for students with different devices and access needs.

### IV. Tested Workflows and Quality
Every core student workflow MUST have automated coverage at the appropriate integration or
end-to-end level; isolated business rules MUST have focused unit tests where practical. Changes
MUST pass the repository's ESLint and Prettier checks before merge. Tests MUST be run for affected
workflows, with failures resolved or explicitly documented in the pull request. These checks
protect the planning, study-session, and progress flows students rely on.

### V. Six-Week MVP and Maintainability
Features MUST fit the agreed six-week academic project scope and prioritize the smallest complete
student value increment. The team MUST prefer direct, maintainable solutions over speculative
abstractions, extra services, or dependencies. Complexity that materially increases delivery or
maintenance cost MUST be justified in the implementation plan and approved during review.

## Additional Constraints

- The application stack is Next.js App Router, TypeScript, and Tailwind CSS. TypeScript strict
	mode is mandatory, and use of `any` is prohibited.
- ESLint and Prettier are required code-quality tools; project scripts and CI MUST run them.
- Naming MUST follow these conventions: Next.js convention files use framework-defined lowercase
	names; reusable component files and exported component names use PascalCase; variables and
	functions use camelCase; constants use UPPER_SNAKE_CASE only when they are true constants.
- Feature branches MUST use `feature/<short-description>` (or the team's issue-linked equivalent).
	Pull request titles and commits MUST use Conventional Commits, such as `feat: add study session`.

## Development Workflow

- Developers MUST NOT push directly to `main`. All work MUST be performed on a feature branch.
- Every change MUST be submitted through a pull request. At least one teammate MUST review and
	approve the pull request before it is merged.
- Required lint, formatting, and affected-workflow test checks MUST pass before merge. The pull
	request MUST identify any unrun checks and explain the reason.

## Governance

This constitution is the governing standard for StudyFlow specifications, plans, tasks, code,
and reviews. A change to this constitution MUST be proposed in a pull request that describes the
motivation, affected principles and artifacts, and any migration needed. At least one teammate
must approve the amendment before merge.

Versioning follows semantic versioning: MAJOR for incompatible principle or governance changes,
MINOR for new principles or materially expanded requirements, and PATCH for clarifications and
non-semantic wording changes. Every specification and implementation plan MUST include a
Constitution Check. Reviewers MUST verify principle compliance, required tests, and quality gates;
any exception MUST be documented with a concrete rationale and approved in the pull request.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): Original adoption date is not recorded in this repository. | **Last Amended**: 2026-11-04
