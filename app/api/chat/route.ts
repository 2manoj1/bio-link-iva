import { createUIMessageStream, createUIMessageStreamResponse, generateText, streamText, type UIMessage } from "ai";

import { getSecurityHeaders, guardMessages, validateChatRequest } from "@/lib/ai/chat-guard";
import { checkChatLimit } from "@/lib/ai/rate-limit";
import {
  getCachedIvaAnswer,
  getIvaGeminiModel,
  getIvaGoogleProviderOptions,
  getIvaMaxOutputTokens,
  getIvaMaxRetries,
  getTemplateIvaAnswer,
  getIvaGenerationMode,
  prepareIvaAgentPrompt,
  setCachedIvaAnswer,
} from "@/lib/ai/iva-agent";

export const maxDuration = 30;
export const runtime = "nodejs";

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
    const role = message.role === "assistant" || message.role === "user" ? message.role : null;

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
  const lastUserMessage = [...messages].reverse().find((message) => message.role === "user");

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

  return createUIMessageStreamResponse({ stream, headers: getSecurityHeaders() });
}

function writeStreamText(
  writer: Parameters<Parameters<typeof createUIMessageStream<UIMessage>>[0]["execute"]>[0]["writer"],
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

function streamGeminiAnswer(messages: UIMessage[], abortSignal: AbortSignal) {
  const stream = createUIMessageStream<UIMessage>({
    originalMessages: messages,
    onError: () => getTemplateIvaAnswer("error"),
    execute: async ({ writer }) => {
      try {
        // Build the agent context first, then stream Gemini directly to the UI.
        const { question, system, prompt } = await prepareIvaAgentPrompt(messages);

        if (getIvaGenerationMode() === "generate") {
          const result = await generateText({
            model: getIvaGeminiModel(),
            temperature: 0.45,
            maxOutputTokens: getIvaMaxOutputTokens(),
            maxRetries: getIvaMaxRetries(),
            system,
            prompt,
          });
          const answer = result.text.trim() || getTemplateIvaAnswer("error");

          writeStreamText(writer, answer);

          if (question && result.text.trim()) {
            await setCachedIvaAnswer(question, answer);
          }

          return;
        }

        const result = streamText({
          model: getIvaGeminiModel(),
          temperature: 0.45,
          maxOutputTokens: getIvaMaxOutputTokens(),
          maxRetries: getIvaMaxRetries(),
          providerOptions: getIvaGoogleProviderOptions(),
          abortSignal,
          system,
          prompt,
        });

        const id = crypto.randomUUID();
        let answer = "";

        writer.write({ type: "start" });
        writer.write({ type: "start-step" });
        writer.write({ type: "text-start", id });

        for await (const delta of result.textStream) {
          answer += delta;
          writer.write({ type: "text-delta", id, delta });
        }

        if (!answer.trim()) {
          const fallback = getTemplateIvaAnswer("error");
          answer = fallback;
          for (const delta of fallback.match(/.{1,72}(\s|$)/g) ?? [fallback]) {
            writer.write({ type: "text-delta", id, delta });
          }
        }

        writer.write({ type: "text-end", id });
        writer.write({ type: "finish-step" });
        writer.write({ type: "finish", finishReason: "stop" });

        if (question && answer.trim()) {
          await setCachedIvaAnswer(question, answer.trim());
        }
      } catch (error) {
        console.error("Iva chat stream failed", error);
        writeStreamText(writer, getTemplateIvaAnswer("error"));
      }
    },
  });

  return createUIMessageStreamResponse({ stream, headers: getSecurityHeaders() });
}

export async function POST(request: Request) {
  let messages: UIMessage[] = [];
  const requestCheck = validateChatRequest(request);

  if (!requestCheck.ok) {
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
    return Response.json(
      { error: "Invalid chat payload." },
      { status: 400, headers: getSecurityHeaders() },
    );
  }

  const guard = guardMessages(messages);

  if (!guard.ok) {
    return guard.status === 200
      ? streamAnswer(guard.answer, messages)
      : Response.json({ error: guard.answer }, { status: guard.status, headers: getSecurityHeaders() });
  }

  messages = guard.messages;
  const question = guard.question || getLastUserQuestion(messages);
  const cached = await getCachedIvaAnswer(question);

  if (cached) {
    return streamAnswer(cached, messages);
  }

  const limit = checkChatLimit(getVisitorId(request));

  if (limit.limited) {
    return streamAnswer(
      limit.reason === "burst"
        ? "Please wait a moment before sending another question. This keeps the public chat available for everyone."
        : getTemplateIvaAnswer("limit"),
      messages,
    );
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return streamAnswer(getTemplateIvaAnswer("missing-key"), messages);
  }

  try {
    return streamGeminiAnswer(messages, request.signal);
  } catch (error) {
    console.error("Iva chat failed", error);
    return streamAnswer(getTemplateIvaAnswer("error"), messages);
  }
}
