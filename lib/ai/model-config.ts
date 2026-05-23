import "server-only";

export type ChatGenerationMode = "stream" | "generate";

const DEFAULT_MODEL = "gemini-flash-latest";

function readIntEnv(name: string, fallback: number) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : fallback;
}

function readBoolEnv(name: string, fallback: boolean) {
  const value = process.env[name];

  if (value === undefined) {
    return fallback;
  }

  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

export function getChatModelConfig() {
  const model = process.env.IVA_CHAT_MODEL ?? DEFAULT_MODEL;
  const family = process.env.IVA_CHAT_MODEL_FAMILY ?? (model.includes("gemma") ? "gemma" : "gemini");
  const generationMode = (process.env.IVA_CHAT_GENERATION_MODE ??
    (family === "gemma" ? "generate" : "stream")) as ChatGenerationMode;
  const thinkingEnabled = readBoolEnv("IVA_CHAT_THINKING_ENABLED", false);
  const thinkingBudget = readIntEnv("IVA_CHAT_THINKING_BUDGET", 0);

  return {
    model,
    family,
    generationMode,
    maxOutputTokens: readIntEnv(
      "IVA_CHAT_MAX_OUTPUT_TOKENS",
      generationMode === "generate" ? 1024 : 260,
    ),
    maxRetries: readIntEnv("IVA_CHAT_MAX_RETRIES", 1),
    retrievalLimit: readIntEnv("IVA_CHAT_RETRIEVAL_LIMIT", family === "gemma" ? 2 : 3),
    thinkingEnabled,
    providerOptions:
      family === "gemini" && !thinkingEnabled
        ? {
            google: {
              thinkingConfig: {
                thinkingBudget,
                includeThoughts: false,
              },
            },
          }
        : undefined,
  };
}
