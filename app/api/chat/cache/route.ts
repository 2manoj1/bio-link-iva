import { clearCachedAnswers, getChatCacheStats } from "@/lib/ai/chat-cache";
import { getSecurityHeaders } from "@/lib/ai/chat-guard";

export const runtime = "nodejs";

function isAuthorized(request: Request) {
  const secret = process.env.IVA_CHAT_CACHE_SECRET;

  if (!secret) {
    return false;
  }

  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice("Bearer ".length) : null;

  return token === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401, headers: getSecurityHeaders() },
    );
  }

  return Response.json(await getChatCacheStats(), { headers: getSecurityHeaders() });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401, headers: getSecurityHeaders() },
    );
  }

  await clearCachedAnswers();

  return Response.json(
    { ok: true, cache: await getChatCacheStats() },
    { headers: getSecurityHeaders() },
  );
}

export async function DELETE(request: Request) {
  return POST(request);
}

