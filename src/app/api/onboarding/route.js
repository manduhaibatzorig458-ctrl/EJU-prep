import { auth } from "@clerk/nextjs/server";
import {
  onboardingAnswersSchema,
  savedOnboardingResponseSchema,
} from "../../../lib/validations/onboarding";
import { requestOnboardingResponse } from "../../../lib/supabase/server";

const supabaseSetupError =
  "Supabase тохиргоо дутуу байна. .env.local-д SUPABASE_URL болон SUPABASE_SECRET_KEY тохируулна уу.";
const saveError = "Тохиргоог хадгалж чадсангүй. Supabase хүснэгт болон холболтоо шалгана уу.";

async function getAuthenticatedUserId() {
  const { userId } = await auth();
  return userId;
}

export async function GET() {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return Response.json({ error: "Хадгалсан тохиргоог харахын тулд нэвтэрнэ үү." }, { status: 401 });
  }

  try {
    const response = await requestOnboardingResponse({ method: "GET", userId });
    if (!response) {
      return Response.json({ error: supabaseSetupError }, { status: 503 });
    }
    if (!response.ok) {
      return Response.json({ error: saveError }, { status: 502 });
    }

    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return Response.json({ answers: null }, { headers: { "Cache-Control": "no-store" } });
    }

    const savedResponse = savedOnboardingResponseSchema.safeParse(rows[0]);
    if (!savedResponse.success) {
      return Response.json({ error: saveError }, { status: 502 });
    }

    return Response.json(
      { answers: savedResponse.data.answers },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({ error: saveError }, { status: 502 });
  }
}

export async function POST(request) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return Response.json({ error: "Хариултаа хадгалахын тулд нэвтэрнэ үү." }, { status: 401 });
  }

  let requestBody;
  try {
    requestBody = await request.json();
  } catch {
    return Response.json({ error: "Илгээсэн мэдээллийг уншиж чадсангүй." }, { status: 400 });
  }

  const validation = onboardingAnswersSchema.safeParse(requestBody);
  if (!validation.success) {
    return Response.json({ error: "Бүх асуултад зөв хариулж дуусгана уу." }, { status: 400 });
  }

  try {
    const response = await requestOnboardingResponse({
      method: "POST",
      userId,
      answers: validation.data,
    });
    if (!response) {
      return Response.json({ error: supabaseSetupError }, { status: 503 });
    }
    if (!response.ok) {
      return Response.json({ error: saveError }, { status: 502 });
    }

    return Response.json({ saved: true });
  } catch {
    return Response.json({ error: saveError }, { status: 502 });
  }
}
