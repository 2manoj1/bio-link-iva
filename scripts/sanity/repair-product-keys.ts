import { randomUUID } from 'node:crypto';
import { getCliClient } from 'sanity/cli';

async function main() {
  const client = getCliClient({ apiVersion: '2024-01-01' }).withConfig({ useCdn: false });
  const docs = await client.fetch<{ _id: string; _rev: string; products?: Record<string, unknown>[] }[]>(
    '*[_type == "dailyProductShelf"]{_id,_rev,products}',
  );
  const apply = process.argv.includes('--apply');
  for (const doc of docs) {
    if (!doc.products?.some(product => !product._key)) continue;
    if (!doc._id.startsWith('drafts.') && docs.some(other => other._id === `drafts.${doc._id}`)) {
      throw new Error(`Resolve the draft of ${doc._id} before repairing it.`);
    }
    console.log(`${apply ? 'Repair' : 'Would repair'} ${doc._id}`);
    if (apply) await client.patch(doc._id).ifRevisionId(doc._rev).set({
      products: doc.products.map(product => ({ ...product, _key: product._key || randomUUID().replaceAll('-', '') })),
    }).commit();
  }
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
