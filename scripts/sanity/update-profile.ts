import { writeClient } from './utils/client';
import { instagramProfile } from '../../lib/brand-data';

// Only updates the supplied profile fields and counts; leaves insights and other content intact.
async function main() {
  const { followers, posts, following, ...profile } = instagramProfile;
  const statsId = 'singleton-instagram-stats';
  const profileId = 'singleton-creator-profile';
  const docs = await writeClient.fetch<{_id: string; _rev: string}[]>(
    '*[_id in $ids]{_id,_rev}',
    { ids: [statsId, profileId, `drafts.${statsId}`, `drafts.${profileId}`] }
  );
  if (docs.some(doc => doc._id.startsWith('drafts.'))) {
    throw new Error('Unpublished profile or stats edits exist. Publish or discard them before applying this snapshot.');
  }
  console.log(JSON.stringify({ profile, stats: { followers, posts, following } }, null, 2));
  if (!process.argv.includes('--apply')) {
    console.log('Dry run. Pass --apply to save this profile snapshot.');
    return;
  }
  if (!writeClient.config().token) throw new Error('Missing SANITY_WRITE_TOKEN');
  let transaction = writeClient.transaction();
  for (const [id, type, fields] of [
    [profileId, 'creatorProfile', profile],
    [statsId, 'instagramStats', { followers, posts, following }],
  ] as const) {
    const existing = docs.find(doc => doc._id === id);
    if (existing) transaction = transaction.patch(id, patch => patch.ifRevisionId(existing._rev).set(fields));
    else transaction = transaction.create<Record<string, unknown>>({ _id: id, _type: type, ...fields });
  }
  await transaction.commit();
  console.log('Profile and counts updated successfully.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
