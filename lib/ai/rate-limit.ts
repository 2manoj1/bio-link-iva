import "server-only";
import { createHash } from "node:crypto";

export type ChatLimit = { limited: boolean; reason: "daily" | "burst" | "unavailable" | null; remaining: number };

// A single atomic script makes the limits consistent across serverless instances.
// Rejected burst requests do not consume the daily allowance.
const script = `
local daily = tonumber(redis.call('GET', KEYS[1]) or '0')
local burst = tonumber(redis.call('GET', KEYS[2]) or '0')
if daily >= tonumber(ARGV[1]) then return {1, 0} end
if burst >= tonumber(ARGV[2]) then return {2, 0} end
local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[3]) end
local short = redis.call('INCR', KEYS[2])
if short == 1 then redis.call('EXPIRE', KEYS[2], 60) end
return {0, tonumber(ARGV[1]) - count}
`;

function positiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export async function checkChatLimit(visitorId: string): Promise<ChatLimit> {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  // Keep free/template answers available, but never call the paid model without
  // a working shared quota store. An instance-local counter cannot enforce it.
  if (!url || !token) return { limited: true, reason: "unavailable", remaining: 0 };
  try {
    if (new URL(url).protocol !== 'https:') throw new Error('HTTPS required');
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setUTCHours(24, 0, 0, 0);
    const ttl = Math.max(1, Math.ceil((tomorrow.getTime() - now.getTime()) / 1000));
    const id = createHash('sha256').update(visitorId).digest('hex');
    const namespace = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'development';
    const key = `iva:${namespace}:chat-limit:${id}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(['EVAL', script, 2, `${key}:${now.toISOString().slice(0, 10)}`, `${key}:burst`,
        positiveInteger(process.env.IVA_CHAT_DAILY_LIMIT, 16), positiveInteger(process.env.IVA_CHAT_BURST_LIMIT, 4), ttl]),
      cache: 'no-store',
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) throw new Error('Quota service unavailable');
    const data: { result?: unknown; error?: string } = await response.json();
    const result = data.result;
    if (data.error || !Array.isArray(result) || result.length !== 2 ||
        ![0, 1, 2].includes(result[0]) || !Number.isSafeInteger(result[1]) || result[1] < 0) {
      throw new Error('Invalid quota response');
    }
    return { limited: result[0] !== 0, reason: result[0] === 1 ? 'daily' : result[0] === 2 ? 'burst' : null, remaining: result[1] };
  } catch {
    console.error('Chat quota service unavailable; using template answers.');
    return { limited: true, reason: 'unavailable', remaining: 0 };
  }
}
