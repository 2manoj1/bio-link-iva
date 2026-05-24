import "server-only";

import type { UIMessage } from "ai";

import { searchKnowledgeBase } from "@/lib/ai/knowledge-base";

const MAX_MESSAGES = 8;
const MAX_TEXT_CHARS = 900;
const MAX_QUESTION_CHARS = 500;
const MAX_BODY_BYTES = 16_000;

const BLOCKED_PATTERNS = [
  /ignore (all )?(previous|system|developer) instructions/i,
  /disregard (all )?(previous|system|developer) instructions/i,
  /override (the )?(system|developer) instructions/i,
  /reveal (your )?(system|developer|hidden) prompt/i,
  /show (your )?(system|developer|hidden) prompt/i,
  /(print|show|reveal|leak).{0,40}(api[_ -]?key|secret|token|credential)/i,
  /google[_ -]?generative[_ -]?ai[_ -]?api[_ -]?key/i,
  /private (email|phone|address|data|details)/i,
  /jailbreak/i,
  /(write|build|generate).{0,40}(malware|ransomware|keylogger|exploit)/i,
  /phishing/i,
  /credit card/i,
];

export type GuardResult =
  | { ok: true; messages: UIMessage[]; question: string; grounded: boolean }
  | { ok: false; status: number; answer: string };

function readText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .trim();
}

function trimMessage(message: UIMessage): UIMessage {
  return {
    ...message,
    parts: message.parts
      .filter((part) => part.type === "text")
      .map((part) => ({
        ...part,
        text: part.text.trim().slice(0, MAX_TEXT_CHARS),
      })),
  };
}

function normalizeOrigin(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function getSecurityHeaders() {
  return {
    "Cache-Control": "no-store, max-age=0",
    "X-Content-Type-Options": "nosniff",
  };
}

export function validateChatRequest(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (!contentType.includes("application/json")) {
    return {
      ok: false as const,
      status: 415,
      answer: "Please send chat requests as JSON.",
    };
  }

  if (contentLength > MAX_BODY_BYTES) {
    return {
      ok: false as const,
      status: 413,
      answer: "That message is too large for the website chat.",
    };
  }

  const origin = normalizeOrigin(request.headers.get("origin"));
  const referer = normalizeOrigin(request.headers.get("referer"));
  const host = request.headers.get("host");
  const expected = host ? `https://${host}` : null;
  const localhost =
    host?.startsWith("localhost") || host?.startsWith("127.0.0.1");
  const configuredOrigin = normalizeOrigin(
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? null,
  );
  const allowedOrigins = new Set([expected, configuredOrigin].filter(Boolean));

  if (process.env.NODE_ENV === "production" && !localhost) {
    const requestOrigin = origin ?? referer;

    if (!requestOrigin || !allowedOrigins.has(requestOrigin)) {
      return {
        ok: false as const,
        status: 403,
        answer: "This chat endpoint only accepts requests from the website.",
      };
    }
  }

  return { ok: true as const };
}

export function guardMessages(messages: UIMessage[]): GuardResult {
  const trimmed = messages.slice(-MAX_MESSAGES).map(trimMessage);
  const lastUserMessage = [...trimmed]
    .reverse()
    .find((message) => message.role === "user");
  const question = lastUserMessage ? readText(lastUserMessage) : "";

  if (!question) {
    return {
      ok: false,
      status: 400,
      answer: "Please send a user message for Iva's concierge.",
    };
  }

  if (question.length > MAX_QUESTION_CHARS) {
    return {
      ok: false,
      status: 200,
      answer: "Please keep the question short so I can answer quickly.",
    };
  }

  if (BLOCKED_PATTERNS.some((pattern) => pattern.test(question))) {
    return {
      ok: false,
      status: 200,
      answer:
        "I can help with Iva, collaborations, lifestyle, fashion, city guides, and contact details, but I cannot assist with private data, hidden prompts, credentials, or misuse.",
    };
  }

  const grounded = searchKnowledgeBase(question, 1).length > 0;

  return { ok: true, messages: trimmed, question, grounded };
}
