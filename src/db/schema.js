import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  foreignKey,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const mockExams = pgTable(
  "mock_exams",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    subject: text("subject").notNull(),
    courseCode: text("course_code").notNull().default("none"),
    examType: text("exam_type").notNull().default("past"),
    examYear: integer("exam_year").notNull(),
    sourceUrl: text("source_url"),
    questionCount: integer("question_count"),
    durationMinutes: integer("duration_minutes"),
    isPublished: boolean("is_published").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("mock_exams_subject_year_type_idx").on(
      table.subject,
      table.courseCode,
      table.examYear,
      table.examType,
    ),
    check("mock_exams_question_count_positive", sql`${table.questionCount} is null or ${table.questionCount} > 0`),
    check("mock_exams_duration_positive", sql`${table.durationMinutes} is null or ${table.durationMinutes} > 0`),
    check("mock_exams_year_range", sql`${table.examYear} between 1900 and 2200`),
    check("mock_exams_subject_valid", sql`${table.subject} in ('mathematics', 'physics', 'chemistry', 'biology', 'japanese')`),
    check("mock_exams_course_code_valid", sql`(${table.subject} = 'mathematics' and ${table.courseCode} in ('course1', 'course2')) or (${table.subject} <> 'mathematics' and ${table.courseCode} = 'none')`),
    check("mock_exams_type_valid", sql`${table.examType} in ('past', 'mock')`),
  ],
);

export const mockExamSections = pgTable(
  "mock_exam_sections",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    mockExamId: uuid("mock_exam_id")
      .notNull()
      .references(() => mockExams.id, { onDelete: "cascade" }),
    sectionNumber: integer("section_number").notNull(),
    title: text("title").notNull(),
    sourceUrl: text("source_url"),
    questionCount: integer("question_count"),
    sortOrder: integer("sort_order").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("mock_exam_sections_exam_number_idx").on(table.mockExamId, table.sectionNumber),
    check("mock_exam_sections_number_positive", sql`${table.sectionNumber} > 0`),
    check("mock_exam_sections_question_count_positive", sql`${table.questionCount} is null or ${table.questionCount} > 0`),
  ],
);

export const questions = pgTable(
  "questions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    mockExamSectionId: uuid("mock_exam_section_id")
      .notNull()
      .references(() => mockExamSections.id, { onDelete: "cascade" }),
    questionNumber: integer("question_number").notNull(),
    questionText: text("question_text"),
    explanation: text("explanation"),
    sourcePage: integer("source_page"),
    difficulty: integer("difficulty"),
    points: integer("points").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("questions_section_number_idx").on(table.mockExamSectionId, table.questionNumber),
    check("questions_number_positive", sql`${table.questionNumber} > 0`),
    check("questions_points_positive", sql`${table.points} > 0`),
    check("questions_difficulty_range", sql`${table.difficulty} is null or ${table.difficulty} between 1 and 5`),
    check("questions_source_page_positive", sql`${table.sourcePage} is null or ${table.sourcePage} > 0`),
  ],
);

export const questionOptions = pgTable(
  "question_options",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    optionNumber: integer("option_number").notNull(),
    optionText: text("option_text"),
    isCorrect: boolean("is_correct").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("question_options_question_number_idx").on(table.questionId, table.optionNumber),
    uniqueIndex("question_options_question_id_id_idx").on(table.questionId, table.id),
    uniqueIndex("question_options_single_correct_idx")
      .on(table.questionId)
      .where(sql`${table.isCorrect}`),
    check("question_options_number_positive", sql`${table.optionNumber} > 0`),
  ],
);

export const examAttempts = pgTable(
  "exam_attempts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkUserId: text("clerk_user_id").notNull(),
    mockExamSectionId: uuid("mock_exam_section_id")
      .notNull()
      .references(() => mockExamSections.id, { onDelete: "cascade" }),
    status: text("status").notNull().default("in_progress"),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    submittedAt: timestamp("submitted_at", { withTimezone: true }),
    elapsedSeconds: integer("elapsed_seconds"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("exam_attempts_user_started_idx").on(table.clerkUserId, table.startedAt),
    index("exam_attempts_section_status_idx").on(table.mockExamSectionId, table.status),
    check("exam_attempts_user_id_nonempty", sql`length(${table.clerkUserId}) > 0`),
    check("exam_attempts_status_valid", sql`${table.status} in ('in_progress', 'submitted', 'abandoned')`),
    check("exam_attempts_elapsed_nonnegative", sql`${table.elapsedSeconds} is null or ${table.elapsedSeconds} >= 0`),
  ],
);

export const examAnswers = pgTable(
  "exam_answers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    examAttemptId: uuid("exam_attempt_id")
      .notNull()
      .references(() => examAttempts.id, { onDelete: "cascade" }),
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    questionOptionId: uuid("question_option_id").notNull(),
    isCorrect: boolean("is_correct").notNull(),
    answeredAt: timestamp("answered_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("exam_answers_attempt_question_idx").on(table.examAttemptId, table.questionId),
    foreignKey({
      name: "exam_answers_option_question_fk",
      columns: [table.questionId, table.questionOptionId],
      foreignColumns: [questionOptions.questionId, questionOptions.id],
    }).onDelete("cascade"),
    index("exam_answers_question_idx").on(table.questionId),
  ],
);

export const examResults = pgTable(
  "exam_results",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    examAttemptId: uuid("exam_attempt_id")
      .notNull()
      .references(() => examAttempts.id, { onDelete: "cascade" }),
    correctCount: integer("correct_count").notNull(),
    totalQuestions: integer("total_questions").notNull(),
    scorePercent: integer("score_percent").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("exam_results_attempt_idx").on(table.examAttemptId),
    check(
      "exam_results_counts_valid",
      sql`${table.correctCount} >= 0 and ${table.totalQuestions} > 0 and ${table.correctCount} <= ${table.totalQuestions}`,
    ),
    check("exam_results_percent_range", sql`${table.scorePercent} between 0 and 100`),
  ],
);

export const examBookmarks = pgTable(
  "exam_bookmarks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkUserId: text("clerk_user_id").notNull(),
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    note: text("note"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("exam_bookmarks_user_question_idx").on(table.clerkUserId, table.questionId),
    index("exam_bookmarks_question_idx").on(table.questionId),
    check("exam_bookmarks_user_id_nonempty", sql`length(${table.clerkUserId}) > 0`),
  ],
);
