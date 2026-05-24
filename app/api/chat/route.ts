import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateText,
  streamText,
  type UIMessage,
} from "ai";

import {
  getSecurityHeaders,
  guardMessages,
  validateChatRequest,
} from "@/lib/ai/chat-guard";
import { checkChatLimit } from "@/lib/ai/rate-limit";
import {
  getCachedIvaAnswer,
  getIvaGeminiModel,
  getIvaGenerationSettings,
  getIvaGoogleProviderOptions,
  getIvaMaxRetries,
  getInstantIvaAnswer,
  getTemplateIvaAnswer,
  getIvaGenerationMode,
  isTemplateIvaAnswer,
  prepareIvaAgentPrompt,
  setCachedIvaAnswer,
} from "@/lib/ai/iva-agent";
import { logIvaChatEvent } from "@/lib/ai/observability";

export const maxDuration = 60;
export const runtime = "nodejs";

function getAiTimeoutMs() {
  const value = Number(process.env.IVA_CHAT_AI_TIMEOUT_MS ?? 35_000);

  return Number.isFinite(value) && value > 5_000 ? Math.floor(value) : 35_000;
}

function getVisitorId(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim();
  return ip || request.headers.get("x-real-ip") || "local-visitor";
}

function readRequestMessages(body: unknown): UIMessage[] {
  if (!body || typeof body !== "object" || !("messages" in body)) {
    return [];
  }

  const rawMessages = (body as { messages?: unknown }).messages;

  if (!Array.isArray(rawMessages)) {
    return [];
  }

  return rawMessages.slice(-12).flatMap((rawMessage, index) => {
    if (!rawMessage || typeof rawMessage !== "object") {
      return [];
    }

    const message = rawMessage as {
      id?: unknown;
      role?: unknown;
      parts?: unknown;
      content?: unknown;
    };
    const role =
      message.role === "assistant" || message.role === "user"
        ? message.role
        : null;

    if (!role) {
      return [];
    }

    const textParts = Array.isArray(message.parts)
      ? message.parts.flatMap((part) => {
          if (!part || typeof part !== "object") {
            return [];
          }

          const candidate = part as { type?: unknown; text?: unknown };

          return candidate.type === "text" && typeof candidate.text === "string"
            ? [{ type: "text" as const, text: candidate.text }]
            : [];
        })
      : typeof message.content === "string"
        ? [{ type: "text" as const, text: message.content }]
        : [];

    if (textParts.length === 0) {
      return [];
    }

    return [
      {
        id: typeof message.id === "string" ? message.id : `message-${index}`,
        role,
        parts: textParts,
      } satisfies UIMessage,
    ];
  });
}

function getLastUserQuestion(messages: UIMessage[]) {
  const lastUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user");

  return (
    lastUserMessage?.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("\n")
      .trim() ?? ""
  );
}

function streamAnswer(answer: string, originalMessages: UIMessage[]) {
  const stream = createUIMessageStream<UIMessage>({
    originalMessages,
    execute: ({ writer }) => {
      const id = crypto.randomUUID();
      writer.write({ type: "start" });
      writer.write({ type: "start-step" });
      writer.write({ type: "text-start", id });
      for (const delta of answer.match(/.{1,72}(\s|$)/g) ?? [answer]) {
        writer.write({ type: "text-delta", id, delta });
      }
      writer.write({ type: "text-end", id });
      writer.write({ type: "finish-step" });
      writer.write({ type: "finish", finishReason: "stop" });
    },
  });

  return createUIMessageStreamResponse({
    stream,
    headers: getSecurityHeaders(),
  });
}

function writeStreamText(
  writer: Parameters<
    Parameters<typeof createUIMessageStream<UIMessage>>[0]["execute"]
  >[0]["writer"],
  answer: string,
) {
  const id = crypto.randomUUID();
  writer.write({ type: "start" });
  writer.write({ type: "start-step" });
  writer.write({ type: "text-start", id });

  for (const delta of answer.match(/.{1,72}(\s|$)/g) ?? [answer]) {
    writer.write({ type: "text-delta", id, delta });
  }

  writer.write({ type: "text-end", id });
  writer.write({ type: "finish-step" });
  writer.write({ type: "finish", finishReason: "stop" });
}

function writeTextDeltas(
  writer: Parameters<Parameters<typeof createUIMessageStream<UIMessage>>[0]["execute"]>[0]["writer"],
  id: string,
  answer: string,
) {
  for (const delta of answer.match(/.{1,72}(\s|$)/g) ?? [answer]) {
    writer.write({ type: "text-delta", id, delta });
  }
}

async function resolveOr<T>(promise: PromiseLike<T>, fallback: T) {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}

function createRequestTimeoutSignal(signal: AbortSignal) {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort("Iva chat AI timeout");
  }, getAiTimeoutMs());

  function abortFromRequest() {
    controller.abort(signal.reason ?? "Request aborted");
  }

  if (signal.aborted) {
    abortFromRequest();
  } else {
    signal.addEventListener("abort", abortFromRequest, { once: true });
  }

  return {
    signal: controller.signal,
    clear: () => {
      clearTimeout(timeout);
      signal.removeEventListener("abort", abortFromRequest);
    },
  };
}

function streamGeminiAnswer(messages: UIMessage[], abortSignal: AbortSignal) {
  const stream = createUIMessageStream<UIMessage>({
    originalMessages: messages,
    onError: () => getTemplateIvaAnswer("error"),
    execute: async ({ writer }) => {
      const startedAt = Date.now();
      let fallbackAnswer = getTemplateIvaAnswer("error");
      let openTextId: string | null = null;
      let streamClosed = false;
      let clearAiTimeout: (() => void) | null = null;

      try {
        const prepared = await prepareIvaAgentPrompt(messages);
        const { question, system, prompt } = prepared;
        fallbackAnswer = prepared.faqFallbackAnswer || fallbackAnswer;

        if (!prepared.shouldAttemptAi && prepared.faqFallbackAnswer) {
          logIvaChatEvent("faq_hit", {
            reason: "low_retrieval_confidence",
            intent: prepared.faqFallbackIntent,
            latencyMs: Date.now() - startedAt,
          });
          writeStreamText(writer, prepared.faqFallbackAnswer);
          return;
        }

        const settings = getIvaGenerationSettings(
          prepared.creativeMode,
          prepared.structuredMode,
        );
        const timeoutSignal = createRequestTimeoutSignal(abortSignal);
        clearAiTimeout = timeoutSignal.clear;

        if (getIvaGenerationMode() === "generate") {
          try {
            logIvaChatEvent("ai_hit", {
              mode: "generate",
              creativeMode: prepared.creativeMode,
              structuredMode: prepared.structuredMode,
              retrievalConfidence: Number(prepared.retrievalConfidence.toFixed(2)),
            });

            const result = await generateText({
              model: getIvaGeminiModel(),
              temperature: settings.temperature,
              maxOutputTokens: settings.maxOutputTokens,
              maxRetries: getIvaMaxRetries(),
              providerOptions: getIvaGoogleProviderOptions(),
              abortSignal: timeoutSignal.signal,
              system,
              prompt,
            });
            const answer = result.text.trim() || fallbackAnswer;

            writeStreamText(writer, answer);

            if (question && result.text.trim()) {
              await setCachedIvaAnswer(question, answer);
            }

            logIvaChatEvent(result.text.trim() ? "ai_success" : "fallback_usage", {
              mode: "generate",
              reason: result.text.trim() ? undefined : "empty_generation",
              latencyMs: Date.now() - startedAt,
            });
          } finally {
            timeoutSignal.clear();
          }

          return;
        }

        logIvaChatEvent("ai_hit", {
          mode: "stream",
          creativeMode: prepared.creativeMode,
          structuredMode: prepared.structuredMode,
          retrievalConfidence: Number(prepared.retrievalConfidence.toFixed(2)),
        });

        const result = streamText({
          model: getIvaGeminiModel(),
          temperature: settings.temperature,
          maxOutputTokens: settings.maxOutputTokens,
          maxRetries: getIvaMaxRetries(),
          providerOptions: getIvaGoogleProviderOptions(),
          abortSignal: timeoutSignal.signal,
          system,
          prompt,
        });

        const id = crypto.randomUUID();
        let answer = "";

        writer.write({ type: "start" });
        writer.write({ type: "start-step" });
        writer.write({ type: "text-start", id });
        openTextId = id;

        for await (const delta of result.textStream) {
          answer += delta;
          writer.write({ type: "text-delta", id, delta });
        }

        timeoutSignal.clear();
        clearAiTimeout = null;

        const finishReason = await resolveOr(result.finishReason, "unknown");
        const usage = await resolveOr(result.usage, null);

        if (!answer.trim()) {
          answer = fallbackAnswer;
          writeTextDeltas(writer, id, fallbackAnswer);
          logIvaChatEvent("fallback_usage", {
            reason: "empty_stream",
            intent: prepared.faqFallbackIntent || null,
            finishReason,
            latencyMs: Date.now() - startedAt,
          });
        } else {
          logIvaChatEvent("ai_success", {
            mode: "stream",
            finishReason,
            totalTokens: usage?.totalTokens,
            latencyMs: Date.now() - startedAt,
          });
        }

        writer.write({ type: "text-end", id });
        writer.write({ type: "finish-step" });
        writer.write({ type: "finish", finishReason: "stop" });
        streamClosed = true;

        if (question && answer.trim() && !isTemplateIvaAnswer(answer.trim())) {
          await setCachedIvaAnswer(question, answer.trim());
        }
      } catch (error) {
        clearAiTimeout?.();
        console.error("Iva chat stream failed", error);
        logIvaChatEvent("ai_failure", {
          error,
          timeout: abortSignal.aborted ? false : Date.now() - startedAt >= getAiTimeoutMs(),
          latencyMs: Date.now() - startedAt,
        });

        if (openTextId && !streamClosed) {
          writeTextDeltas(writer, openTextId, `\n\n${fallbackAnswer}`);
          writer.write({ type: "text-end", id: openTextId });
          writer.write({ type: "finish-step" });
          writer.write({ type: "finish", finishReason: "error" });
          return;
        }

        writeStreamText(writer, fallbackAnswer);
      }
    },
  });

  return createUIMessageStreamResponse({
    stream,
    headers: getSecurityHeaders(),
  });
}

export async function POST(request: Request) {
  let messages: UIMessage[] = [];
  const requestCheck = validateChatRequest(request);

  if (!requestCheck.ok) {
    logIvaChatEvent("request_rejected", { status: requestCheck.status });
    return requestCheck.status === 200
      ? streamAnswer(requestCheck.answer, [])
      : Response.json(
          { error: requestCheck.answer },
          { status: requestCheck.status, headers: getSecurityHeaders() },
        );
  }

  try {
    const body = await request.json();
    messages = readRequestMessages(body);
  } catch {
    logIvaChatEvent("request_rejected", { status: 400, reason: "invalid_json" });
    return Response.json(
      { error: "Invalid chat payload." },
      { status: 400, headers: getSecurityHeaders() },
    );
  }

  const guard = guardMessages(messages);

  if (!guard.ok) {
    logIvaChatEvent("guard_block", { status: guard.status });
    return guard.status === 200
      ? streamAnswer(guard.answer, messages)
      : Response.json(
          { error: guard.answer },
          { status: guard.status, headers: getSecurityHeaders() },
        );
  }

  messages = guard.messages;
  const question = guard.question || getLastUserQuestion(messages);
  const instantAnswer = getInstantIvaAnswer(question);

  if (instantAnswer) {
    logIvaChatEvent("instant_answer", { intent: instantAnswer.intentId });
    await setCachedIvaAnswer(question, instantAnswer.answer);
    return streamAnswer(instantAnswer.answer, messages);
  }

  const cached = await getCachedIvaAnswer(question);

  if (cached) {
    logIvaChatEvent("cache_hit");
    return streamAnswer(cached, messages);
  }

  const limit = checkChatLimit(getVisitorId(request));

  if (limit.limited) {
    logIvaChatEvent("fallback_usage", {
      reason: limit.reason === "burst" ? "burst_limit" : "daily_limit",
    });
    return streamAnswer(
      limit.reason === "burst"
        ? "Please wait a moment before sending another question. This keeps the public chat available for everyone."
        : getTemplateIvaAnswer("limit"),
      messages,
    );
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    logIvaChatEvent("fallback_usage", { reason: "missing_key" });
    return streamAnswer(getTemplateIvaAnswer("missing-key"), messages);
  }

  try {
    return streamGeminiAnswer(messages, request.signal);
  } catch (error) {
    console.error("Iva chat failed", error);
    return streamAnswer(getTemplateIvaAnswer("error"), messages);
  }
}
