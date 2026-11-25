import { z } from "zod";

export const onboardingAnswersSchema = z
  .object({
    previousExam: z.enum(["Тийм", "Үгүй"]),
    studyStatus: z.enum(["Ахлах ангийн сурагч", "Их сургуулийн оюутан", "Gap year авсан", "Бусад"]),
    ejuTrack: z.enum(["science", "humanities"]),
    scienceSubjects: z.array(z.enum(["physics", "chemistry", "biology"])).max(2),
    scienceUndecided: z.boolean(),
    humanitiesSubject: z.enum(["", "japanAndWorld", "undecided"]),
    mathCourse: z.enum(["course1", "course2", "none"]),
    japaneseSelected: z.boolean(),
    examSession: z.enum(["session1", "session2"]),
    examYear: z.string().regex(/^\d{4}$/),
    examDay: z.string().regex(/^(?:[1-9]|[12]\d|30)$/),
    targetScore: z.enum(["foundation", "medium", "topUniversities"]),
    dailyStudyTime: z.enum(["30 минут", "1 цаг", "2 цаг", "3 ба түүнээс дээш цаг"]),
  })
  .strict()
  .superRefine((answers, context) => {
    if (answers.ejuTrack === "science" && !answers.scienceUndecided && answers.scienceSubjects.length !== 2) {
      context.addIssue({
        code: "custom",
        path: ["scienceSubjects"],
        message: "Байгалийн ухааны хоёр хичээл сонгоно уу.",
      });
    }

    if (answers.ejuTrack === "humanities" && !answers.humanitiesSubject) {
      context.addIssue({
        code: "custom",
        path: ["humanitiesSubject"],
        message: "Хүмүүнлэгийн ухааны хичээлээ сонгоно уу.",
      });
    }
  });

export const savedOnboardingResponseSchema = z.object({
  answers: onboardingAnswersSchema,
  completed_at: z.string().min(1),
});
