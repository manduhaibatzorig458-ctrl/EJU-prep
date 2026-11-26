import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { saveScienceExamAttempt, ExamDatabaseUnavailableError } from "../../../../features/mock-exam/save-exam-attempt";
import { science2011FirstSessionAnswerKeys } from "../../../mock-exam/science-2011-answer-key";

export const runtime = "nodejs";

const gradeExamSchema = z.object({
  year: z.literal(2011),
  paperId: z.literal("session-1"),
  subject: z.enum(["physics", "chemistry", "biology"]),
  answers: z.array(z.number().int().min(1).max(9)).min(1).max(20),
  elapsedSeconds: z.number().int().min(0).max(21600).default(0),
});

export async function POST(request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Шалгалт өгөхийн тулд нэвтэрнэ үү." }, { status: 401 });
  }

  let requestBody;
  try {
    requestBody = await request.json();
  } catch {
    return Response.json({ error: "Хариултын мэдээллийг уншиж чадсангүй." }, { status: 400 });
  }

  const parsedRequest = gradeExamSchema.safeParse(requestBody);
  if (!parsedRequest.success) {
    return Response.json({ error: "Хариултын мэдээлэл буруу байна." }, { status: 400 });
  }

  const { answers, elapsedSeconds, subject } = parsedRequest.data;
  const correctAnswers = science2011FirstSessionAnswerKeys[subject];
  if (answers.length !== correctAnswers.length) {
    return Response.json({ error: "Бүх асуултын хариултыг сонгоно уу." }, { status: 400 });
  }

  try {
    const result = await saveScienceExamAttempt({
      answers,
      clerkUserId: userId,
      elapsedSeconds,
      subject,
    });

    return Response.json(result);
  } catch (error) {
    if (error instanceof ExamDatabaseUnavailableError) {
      return Response.json({ error: "Шалгалтын мэдээллийн сан тохируулаагүй байна." }, { status: 503 });
    }

    return Response.json({ error: "Хариултыг хадгалж чадсангүй. Дахин оролдоно уу." }, { status: 500 });
  }
}
