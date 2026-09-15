import assert from 'node:assert/strict';
import test from 'node:test';
import { serializeJsonLd } from '../lib/json-ld';
import { mergeContentDefaults } from '../lib/content-defaults';

test('CMS text cannot terminate a JSON-LD script element', () => {
  const content = { name: '</script><script>alert(1)</script>', description: 'A < B & C' };
  const serialized = serializeJsonLd(content);
  assert.equal(serialized.includes('<'), false);
  assert.deepEqual(JSON.parse(serialized), content);
});

test('partial and null CMS objects preserve required fields, while empty arrays stay empty', () => {
  const defaults = { creator: { name: 'Iva', email: 'hello@example.com' }, links: ['old'], count: 3 };
  assert.deepEqual(mergeContentDefaults(defaults, { creator: { name: 'New' }, links: [], count: null }), {
    creator: { name: 'New', email: 'hello@example.com' }, links: [], count: 3,
  });
  assert.deepEqual(mergeContentDefaults(defaults, null), defaults);
  assert.deepEqual(mergeContentDefaults(defaults, { creator: 'invalid', links: 'invalid' }), defaults);
});
