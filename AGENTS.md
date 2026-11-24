# EJU Prep — AGENTS.md

## 1. Project Overview

EJU Prep is an exam preparation platform for students
preparing for the Examination for Japanese University Admission (EJU).

### Core Learning Workflow

Mock Exam → Spaced Repetition → Wrong Answer Book → Quiz

The initial subjects are:
- Mathematics II
- Physics
- Chemistry

## 2. Technology Stack

- Framework: Next.js 16
- Language: JavaScript only
- UI: React
- Styling: Tailwind CSS
- Routing: Next.js App Router
- Database: Supabase PostgreSQL
- Validation: Zod
- Linter: ESLint
- Data fetching: Fetch API

Do not introduce TypeScript.

## 3. Coding Rules

### Rule 1: No Any

- Avoid unstructured or loosely typed data.
- Define clear object structures.
- Validate external data before using it.

### Rule 2: Descriptive Names

Bad:
- d
- flag
- handle()
- data

Good:
- questions
- isLoading
- submitExam()
- examResults

Use camelCase for variables and functions.

Use PascalCase for React components.

Use kebab-case for folders.

Use snake_case for database tables and columns.

### Rule 3: Return Early

Avoid deeply nested conditional statements.

Bad:
- Multiple nested if statements.

Good:
- Validate conditions first.
- Return early when conditions are not met.
- Keep the main logic readable.

### Rule 4: Small Files

- One main component per file.
- Keep files under 200 lines when practical.
- Split large components into smaller reusable components.
- Separate UI from business logic.

### Rule 5: Server-side Validation

- Never trust client input.
- Validate API request bodies with Zod.
- Use safeParse() before processing data.
- Return appropriate HTTP status codes.
- Never save unvalidated external input.

### Rule 6: Error Handling

- Use try/catch for external services.
- Handle database failures.
- Handle network failures.
- Provide friendly error messages.
- Never expose raw database or server errors to users.

### Rule 7: No Debug Logs

- Remove unnecessary console.log statements.
- Never commit sensitive information.
- Never expose API keys or secrets.
- Keep environment variables out of Git.

## 4. Architecture Rules

- Keep components reusable.
- Separate business logic from UI.
- Avoid duplicated code.
- Keep database operations separate from presentation components.
- Use server components by default.
- Use client components only when interactivity is required.
- Keep module responsibilities independent.

## 5. Project Structure

src/
  app/
    mock-exam/
    review/
    mistakes/
    quiz/
  components/
    ui/
    layout/
  features/
    mock-exam/
    spaced-repetition/
    wrong-answers/
    quiz/
  lib/
    supabase/
    validations/
    utils/

## 6. Core Business Rules

### Mock Exam
- Support Mathematics II, Physics and Chemistry.
- Provide a timer.
- Save submitted answers.
- Calculate results.
- Identify incorrect answers.

### Spaced Repetition
- Generate review schedules.
- Track review history.
- Prioritize questions that need review.
- Update review intervals based on learner performance.

### Wrong Answer Book
- Automatically collect incorrect answers.
- Store the original question.
- Store the user's answer.
- Store the correct answer.
- Allow learners to review mistakes.

### Quiz
- Generate quizzes from previous mistakes.
- Track quiz results.
- Measure improvement.
- Allow repeated practice.

## 7. Database Rules

- Use snake_case naming.
- Use unique IDs.
- Define foreign key relationships.
- Prevent duplicate records where necessary.
- Store timestamps.
- Protect user-specific data with Row Level Security.
- Never expose service role keys to the frontend.

## 8. UI/UX Rules

- Japanese-inspired minimal design.
- Clean and consistent layouts.
- Responsive on desktop, tablet and mobile.
- Consistent spacing and typography.
- Clear loading, empty and error states.
- Avoid unnecessary animations.
- Prioritize usability and readability.

## 9. Development Workflow

Before implementing a feature:

1. Inspect the existing project structure.
2. Understand the existing code.
3. Identify the files that need changes.
4. Implement the feature.
5. Check for errors.
6. Run ESLint.
7. Test the functionality.
8. Summarize the changes.

Never overwrite working code without understanding it.

Never introduce unnecessary dependencies.

Never leave unfinished placeholder implementations.

## 10. AI Coding Instructions

- Follow this file for every implementation.
- Use JavaScript only.
- Write simple, readable and maintainable code.
- Explain important implementation decisions.
- Do not invent existing files or functions.
- Do not silently change project architecture.
- Ask before making destructive changes.
- Keep all implementations consistent with the EJU Prep workflow.

