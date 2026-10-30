import assert from 'node:assert/strict';
import fs from 'node:fs';
import {test, mock} from 'node:test';
import {getAllPosts, getPostBySlug} from '../lib/blog';
import {formatPostDate} from '../lib/post-date';

test('every published article retains its metadata and nonempty MDX', () => {
  const posts = getAllPosts();
  assert(posts.length > 0);
  for (const post of posts) {
    const loaded = getPostBySlug(post.slug);
    assert.equal(loaded.meta.title, post.title);
    assert(loaded.content.trim());
  }
});

test('publication day is stable across server/visitor timezones', () => {
  const previous = process.env.TZ;
  try {
    for (const zone of ['UTC', 'America/Chicago', 'Pacific/Kiritimati']) {
      process.env.TZ = zone;
      assert.equal(formatPostDate('2026-03-15'), 'Mar 15, 2026');
      assert.equal(formatPostDate('2026-03-15', 'long'), 'March 15, 2026');
    }
  } finally {
    if (previous === undefined) delete process.env.TZ;
    else process.env.TZ = previous;
  }
});

test('unknown and traversal slugs reject before any content file read', () => {
  const read = mock.method(fs, 'readFileSync', () => {throw new Error('Unexpected file read');});
  try {
    for (const slug of ['does-not-exist', '../frameworks_2026', '..\\frameworks_2026',
      '../../package', '%2e%2e%2fframeworks_2026', '/frameworks_2026', 'frameworks_2026\0']) {
      assert.throws(() => getPostBySlug(slug), /Post not found/);
    }
    assert.equal(read.mock.callCount(), 0);
  } finally {read.mock.restore();}
});
