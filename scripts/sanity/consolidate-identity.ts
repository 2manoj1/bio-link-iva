import { getCliClient } from 'sanity/cli';
import { randomUUID } from 'node:crypto';

type Doc = { _id: string; _rev: string; _updatedAt: string; [key: string]: unknown };
async function main() {
  const client = getCliClient({ apiVersion: '2024-01-01' }).withConfig({ useCdn: false, perspective: 'raw' });
  const ids = ['singleton-creator-profile','singleton-site-content','singleton-instagram-stats','singleton-media-kit'];
  const docs = await client.fetch<Doc[]>('*[_id in $ids || _id in $drafts]', { ids, drafts: ids.map(id => `drafts.${id}`) });
  if (docs.some(doc => doc._id.startsWith('drafts.'))) throw new Error('Publish or discard the existing singleton drafts before consolidation.');
  const [profile, site, metrics, kit] = ids.map(id => docs.find(doc => doc._id === id)!);
  if (!profile || !site || !metrics || !kit) throw new Error('Required singleton missing.');
  if (!site.creator) { console.log('Identity already consolidated.'); return; }
  const creator = site.creator as Record<string, unknown>;
  const markets = await client.fetch<{_id:string;role:string}[]>('*[_type=="market" && hidden!=true]{_id,role}');
  const primary = markets.find(m => m.role === 'Home City');
  if (!primary) throw new Error('No primary market found.');
  const otherStats = site.otherStats as {label:string;value:string}[];
  const fields = Object.fromEntries(Object.entries(creator).filter(([key]) => !['handle','username','instagramUrl','location','websiteUrl'].includes(key)));
  const transaction = client.transaction()
    .patch(profile._id, p => p.ifRevisionId(profile._rev).setIfMissing({
      ...fields,
      primaryMarket: { _type: 'reference', _ref: primary._id },
      additionalMarkets: markets.filter(m=>m._id!==primary._id).map(m=>({_key:randomUUID(),_type:'reference',_ref:m._id})),
      industries: site.collaborationTypes,
      services: kit.collaborationMenu,
    }).set({ instagramUrl: creator.instagramUrl, location: creator.location }))
    .patch(metrics._id, p => p.ifRevisionId(metrics._rev).setIfMissing({
      metricsUpdatedAt: metrics._updatedAt,
      youtubeSubscribers: otherStats.find(s=>s.label==='YouTube')?.value ?? '',
      lovedReelViews: otherStats.find(s=>s.label==='Loved Reel')?.value ?? '',
    }))
    .patch(site._id, p => p.ifRevisionId(site._rev).unset(['creator','otherStats','collaborationTypes']))
    .patch(kit._id, p => p.ifRevisionId(kit._rev).unset(['collaborationMenu']));
  if (!process.argv.includes('--apply')) { console.log('Would consolidate identity, services and metrics. Existing counts are preserved.'); return; }
  await transaction.commit();
  console.log('Consolidated identity and services into the existing profile; preserved all social counts.');
}
main().catch(error => { console.error(error.message); process.exitCode=1; });
