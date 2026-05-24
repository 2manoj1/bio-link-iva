import "server-only";

type LogDetails = Record<string, unknown>;

function compact(value: unknown): unknown {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
    };
  }

  if (typeof value === "string") {
    return value.length > 220 ? `${value.slice(0, 220)}...` : value;
  }

  return value;
}

export function logIvaChatEvent(event: string, details: LogDetails = {}) {
  const payload = Object.fromEntries(
    Object.entries(details).map(([key, value]) => [key, compact(value)]),
  );

  console.info("[iva-chat]", {
    event,
    timestamp: new Date().toISOString(),
    ...payload,
  });
}
