import "server-only";

export function getSupabaseServerConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !secretKey) {
    return null;
  }

  try {
    const parsedUrl = new URL(supabaseUrl);
    const isLocalSupabase = new Set(["localhost", "127.0.0.1", "::1"]).has(parsedUrl.hostname);
    if (parsedUrl.protocol !== "https:" && !(parsedUrl.protocol === "http:" && isLocalSupabase)) {
      return null;
    }

    return { supabaseUrl: parsedUrl.origin, secretKey };
  } catch {
    return null;
  }
}

export async function requestOnboardingResponse({ method, userId, answers }) {
  const config = getSupabaseServerConfig();
  if (!config) {
    return null;
  }

  const endpoint = new URL("/rest/v1/onboarding_responses", config.supabaseUrl);

  if (method === "GET") {
    endpoint.searchParams.set("clerk_user_id", `eq.${userId}`);
    endpoint.searchParams.set("select", "answers,completed_at");
    endpoint.searchParams.set("limit", "1");
  } else {
    endpoint.searchParams.set("on_conflict", "clerk_user_id");
  }

  const headers = {
    apikey: config.secretKey,
    Accept: "application/json",
  };

  if (method === "POST") {
    headers["Content-Type"] = "application/json";
    headers.Prefer = "resolution=merge-duplicates,return=minimal";
  }

  const completedAt = new Date().toISOString();

  return fetch(endpoint, {
    method,
    headers,
    body:
      method === "POST"
        ? JSON.stringify({
            clerk_user_id: userId,
            answers,
            completed_at: completedAt,
            updated_at: completedAt,
          })
        : undefined,
    cache: "no-store",
  });
}
