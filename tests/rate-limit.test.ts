import assert from 'node:assert/strict';
import test from 'node:test';
import { checkChatLimit } from '../lib/ai/rate-limit';

test('distributed quota checks fail closed and interpret atomic Redis results', async () => {
  const originalFetch = globalThis.fetch;
  const oldUrl = process.env.UPSTASH_REDIS_REST_URL;
  const oldToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  try {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    assert.equal((await checkChatLimit('visitor')).reason, 'unavailable');
    process.env.UPSTASH_REDIS_REST_URL = 'https://quota.example.com';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-only';
    for (const [code, reason] of [[0, null], [1, 'daily'], [2, 'burst']] as const) {
      globalThis.fetch = async (_url, init) => {
        const command = JSON.parse(String(init?.body));
        assert.equal(command[0], 'EVAL');
        assert.equal(command[2], 2);
        assert.equal(command[3].includes('visitor'), false);
        assert.equal(init?.cache, 'no-store');
        return Response.json({ result: [code, code === 0 ? 15 : 0] });
      };
      const result = await checkChatLimit('visitor');
      assert.equal(result.reason, reason);
      assert.equal(result.limited, code !== 0);
    }
    globalThis.fetch = async () => Response.json({ error: 'unavailable' }, { status: 503 });
    assert.equal((await checkChatLimit('visitor')).reason, 'unavailable');
    globalThis.fetch = async () => Response.json({ result: [0, -1] });
    assert.equal((await checkChatLimit('visitor')).limited, true);
  } finally {
    globalThis.fetch = originalFetch;
    if (oldUrl === undefined) delete process.env.UPSTASH_REDIS_REST_URL;
    else process.env.UPSTASH_REDIS_REST_URL = oldUrl;
    if (oldToken === undefined) delete process.env.UPSTASH_REDIS_REST_TOKEN;
    else process.env.UPSTASH_REDIS_REST_TOKEN = oldToken;
  }
});
