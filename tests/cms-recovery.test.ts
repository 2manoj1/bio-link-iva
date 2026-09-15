import assert from 'node:assert/strict';
import test from 'node:test';
import { recoverContent } from '../lib/cms-recovery';

test('CMS failures fall back but intentionally empty collections stay empty', async () => {
  const rethrow = () => {};
  assert.deepEqual(await recoverContent(async () => [], ['fallback'], rethrow), []);
  assert.deepEqual(await recoverContent(async () => { throw new Error('offline'); }, ['fallback'], rethrow), ['fallback']);
});

test('framework redirects and rendering control flow are never swallowed', async () => {
  const redirect = new Error('framework control flow');
  await assert.rejects(recoverContent(async () => { throw redirect; }, [], error => { throw error; }), error => error === redirect);
});
