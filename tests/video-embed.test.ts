import assert from 'node:assert/strict';
import test from 'node:test';
import { videoEmbedUrl } from '../lib/video-embed';

test('embeds supported video URLs without carrying tracking parameters', () => {
  assert.equal(videoEmbedUrl('https://www.instagram.com/reel/DYEM8CpxKdj/?utm_source=share'), 'https://www.instagram.com/p/DYEM8CpxKdj/embed/');
  assert.equal(videoEmbedUrl('https://youtu.be/dQw4w9WgXcQ?t=5'), 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  assert.equal(videoEmbedUrl('https://www.youtube.com/shorts/dQw4w9WgXcQ'), 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
});
test('does not embed arbitrary hosts, protocols, profiles, or malformed IDs', () => {
  for(const url of ['javascript:alert(1)', 'http://instagram.com/reel/abc/', 'https://instagram.com.evil.test/reel/abc/', 'https://www.instagram.com/iva_mana5/', 'https://youtu.be/not-valid', 'not a URL']) {
    assert.equal(videoEmbedUrl(url), null, url);
  }
});
