import "server-only";

type VisitorWindow = {
  dailyCount: number;
  dailyResetAt: number;
  burstCount: number;
  burstResetAt: number;
};

const visitors = new Map<string, VisitorWindow>();

function getDailyLimit() {
  const limit = Number(process.env.IVA_CHAT_DAILY_LIMIT ?? 16);
  return Number.isFinite(limit) ? Math.max(1, limit) : 16;
}

function getBurstLimit() {
  const limit = Number(process.env.IVA_CHAT_BURST_LIMIT ?? 4);
  return Number.isFinite(limit) ? Math.max(1, limit) : 4;
}

function nextDailyReset() {
  const now = new Date();
  const reset = new Date(now);
  reset.setUTCHours(24, 0, 0, 0);
  return reset.getTime();
}

function nextBurstReset() {
  return Date.now() + 60_000;
}

export function checkChatLimit(visitorId: string) {
  const now = Date.now();
  const existing = visitors.get(visitorId);

  if (!existing || existing.dailyResetAt <= now) {
    visitors.set(visitorId, {
      dailyCount: 1,
      dailyResetAt: nextDailyReset(),
      burstCount: 1,
      burstResetAt: nextBurstReset(),
    });
    return { limited: false, reason: null, remaining: getDailyLimit() - 1 };
  }

  if (existing.burstResetAt <= now) {
    existing.burstCount = 0;
    existing.burstResetAt = nextBurstReset();
  }

  if (existing.dailyCount >= getDailyLimit()) {
    return { limited: true, reason: "daily" as const, remaining: 0 };
  }

  if (existing.burstCount >= getBurstLimit()) {
    return { limited: true, reason: "burst" as const, remaining: 0 };
  }

  existing.dailyCount += 1;
  existing.burstCount += 1;

  return {
    limited: false,
    reason: null,
    remaining: getDailyLimit() - existing.dailyCount,
  };
}
