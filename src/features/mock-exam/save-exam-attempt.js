import { eq, inArray, sql } from "drizzle-orm";
import {
  examAnswers,
  examAttempts,
  examResults,
  mockExamSections,
  mockExams,
  questionOptions,
  questions,
} from "../../db/schema";
import { getDatabase } from "../../db";
import { science2011PaperUrl } from "../../app/mock-exam/mock-exam-year-data";
import { science2011FirstSessionAnswerKeys } from "../../app/mock-exam/science-2011-answer-key";

const subjectLabels = {
  physics: "Физик",
  chemistry: "Хими",
  biology: "Биологи",
};

const answerChoices = Array.from({ length: 9 }, (_, index) => index + 1);

export class ExamDatabaseUnavailableError extends Error {}

export async function saveScienceExamAttempt({
  clerkUserId,
  elapsedSeconds,
  subject,
  answers,
}) {
  const database = getDatabase();
  if (!database) throw new ExamDatabaseUnavailableError();

  const correctAnswerKey = science2011FirstSessionAnswerKeys[subject];
  const questionCount = correctAnswerKey.length;
  const submittedAt = new Date();
  const startedAt = new Date(submittedAt.getTime() - elapsedSeconds * 1000);

  return database.transaction(async (transaction) => {
    const [mockExam] = await transaction
      .insert(mockExams)
      .values({
        title: `2011 оны ${subjectLabels[subject]} шалгалт`,
        subject,
        courseCode: "none",
        examType: "past",
        examYear: 2011,
        sourceUrl: science2011PaperUrl,
        questionCount,
        isPublished: true,
      })
      .onConflictDoUpdate({
        target: [mockExams.subject, mockExams.courseCode, mockExams.examYear, mockExams.examType],
        set: {
          sourceUrl: science2011PaperUrl,
          questionCount,
          isPublished: true,
          updatedAt: submittedAt,
        },
      })
      .returning({ id: mockExams.id });

    const [section] = await transaction
      .insert(mockExamSections)
      .values({
        mockExamId: mockExam.id,
        sectionNumber: 1,
        title: "1-р ээлж · Бүтэн шалгалт",
        sourceUrl: science2011PaperUrl,
        questionCount,
        sortOrder: 1,
      })
      .onConflictDoUpdate({
        target: [mockExamSections.mockExamId, mockExamSections.sectionNumber],
        set: {
          title: "1-р ээлж · Бүтэн шалгалт",
          sourceUrl: science2011PaperUrl,
          questionCount,
        },
      })
      .returning({ id: mockExamSections.id });

    await transaction
      .insert(questions)
      .values(
        correctAnswerKey.map((_, index) => ({
          mockExamSectionId: section.id,
          questionNumber: index + 1,
          points: 1,
        })),
      )
      .onConflictDoNothing();

    const questionRows = await transaction
      .select({ id: questions.id, questionNumber: questions.questionNumber })
      .from(questions)
      .where(eq(questions.mockExamSectionId, section.id));

    await transaction
      .update(questionOptions)
      .set({ isCorrect: false })
      .where(inArray(questionOptions.questionId, questionRows.map((question) => question.id)));

    await transaction
      .insert(questionOptions)
      .values(
        questionRows.flatMap((question) =>
          answerChoices.map((optionNumber) => ({
            questionId: question.id,
            optionNumber,
            isCorrect: correctAnswerKey[question.questionNumber - 1] === optionNumber,
          })),
        ),
      )
      .onConflictDoUpdate({
        target: [questionOptions.questionId, questionOptions.optionNumber],
        set: { isCorrect: sql`excluded.is_correct` },
      });

    const optionRows = await transaction
      .select({
        id: questionOptions.id,
        questionId: questionOptions.questionId,
        optionNumber: questionOptions.optionNumber,
        isCorrect: questionOptions.isCorrect,
      })
      .from(questionOptions)
      .where(inArray(questionOptions.questionId, questionRows.map((question) => question.id)));

    const optionByQuestionAndNumber = new Map(
      optionRows.map((option) => [`${option.questionId}:${option.optionNumber}`, option]),
    );
    const results = questionRows
      .sort((firstQuestion, secondQuestion) => firstQuestion.questionNumber - secondQuestion.questionNumber)
      .map((question) => {
        const selectedOption = optionByQuestionAndNumber.get(
          `${question.id}:${answers[question.questionNumber - 1]}`,
        );
        const correctOption = optionRows.find(
          (option) => option.questionId === question.id && option.isCorrect,
        );

        return {
          questionId: question.id,
          questionNumber: question.questionNumber,
          questionOptionId: selectedOption.id,
          correctAnswer: correctOption.optionNumber,
          isCorrect: selectedOption.isCorrect,
        };
      });
    const correctCount = results.filter((result) => result.isCorrect).length;

    const [attempt] = await transaction
      .insert(examAttempts)
      .values({
        clerkUserId,
        mockExamSectionId: section.id,
        status: "submitted",
        startedAt,
        submittedAt,
        elapsedSeconds,
      })
      .returning({ id: examAttempts.id });

    await transaction.insert(examAnswers).values(
      results.map((result) => ({
        examAttemptId: attempt.id,
        questionId: result.questionId,
        questionOptionId: result.questionOptionId,
        isCorrect: result.isCorrect,
      })),
    );

    await transaction.insert(examResults).values({
      examAttemptId: attempt.id,
      correctCount,
      totalQuestions: questionCount,
      scorePercent: Math.round((correctCount / questionCount) * 100),
    });

    return {
      attemptId: attempt.id,
      score: correctCount,
      total: questionCount,
      results: results.map(({ correctAnswer, isCorrect }) => ({ correctAnswer, isCorrect })),
    };
  });
}
