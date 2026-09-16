import { readFile, readdir } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import vm from 'node:vm';
import { writeClient } from './utils/client';
import { siteContentDefaults, mediaKitDefaults } from '../../lib/site-content-defaults';
import pageCopy from '../../sanity/data/page-copy.json';

const siteFields = Object.fromEntries(Object.entries(siteContentDefaults).filter(([key]) => !['creator', 'otherStats', 'collaborationTypes'].includes(key)));
const apply = process.argv.includes('--apply');
function keyed(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(item => item && typeof item === 'object' ? { _key: randomUUID(), ...keyed(item) as object } : item);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key,item]) => [key,keyed(item)]));
  return value;
}
function blocks(source: string) {
  // Existing local MDX is paragraphs, h2s, an opening div, and bullet lists.
  // Refuse unknown markup rather than silently losing content.
  const content = source.replace(/<div[^>]*>([\s\S]*?)<\/div>/g, (_,text) => '\n\n> '+text.trim().replace(/\s+/g,' ')+'\n\n');
  const result: object[] = [];
  for (const chunk of content.trim().split(/\n\s*\n/)) {
    const heading = chunk.match(/^<h2 id="([^"]+)">([\s\S]*?)<\/h2>$/);
    const lines = chunk.startsWith('- ') ? chunk.split('\n') : [chunk];
    for (const line of lines) {
      const text = (heading ? heading[2] : line.replace(/^(> |- )/, '')).replace(/\s+/g,' ').trim();
      if (/<\/?[a-z]/i.test(text) || /\[[^\]]+\]\(/.test(text)) throw new Error('Unsupported MDX: '+text.slice(0,60));
      result.push({ _key: heading?.[1] ?? randomUUID(), _type:'block', style:heading?'h2':line.startsWith('> ')?'blockquote':'normal',
        ...(line.startsWith('- ')?{listItem:'bullet',level:1}:{}), markDefs:[],
        children:[{_type:'span',_key:randomUUID(),text,marks:[]}],
      });
    }
  }
  return result;
}
async function main() {
  const existing = await writeClient.fetch<{_id:string;slug?:string}[]>('*[_type in ["blogPost","siteContent","pageCopy"]]{_id,"slug":slug.current}');
  const docs: Record<string,unknown>[] = [];
  for(const [id,type,fields] of [
    ['singleton-site-content','siteContent',siteFields],
    ['singleton-page-copy','pageCopy',pageCopy],
  ] as const) {
    if (!existing.some(doc=>doc._id===id || doc._id===`drafts.${id}`)) docs.push({_id:id,_type:type,...keyed(fields) as object});
  }
  for(const file of (await readdir('content/blog')).filter(file=>file.endsWith('.mdx'))) {
    const source = await readFile('content/blog/'+file,'utf8');
    const end=source.indexOf('\n};')+3;
    if(end<3) throw new Error('Missing metadata: '+file);
    const metadata = vm.runInNewContext(source.slice(0,end).replace('export const metadata =','result =')) as Record<string,unknown>;
    if(existing.some(doc=>doc.slug===metadata.slug)) { console.log('Preserving existing blog:',metadata.slug); continue; }
    docs.push({_type:'blogPost',title:metadata.title,slug:{_type:'slug',current:metadata.slug},excerpt:metadata.excerpt,
      description:metadata.description,category:metadata.category,publishedAt:metadata.publishedAt+'T00:00:00Z',
      image:metadata.image,keywords:metadata.keywords,featured:metadata.slug==='bengaluru-cafe-rituals-iva',body:blocks(source.slice(end))});
  }
  console.log(JSON.stringify(docs.map(doc=>({type:doc._type,id:doc._id,title:doc.title,blocks:Array.isArray(doc.body)?doc.body.length:undefined})),null,2));
  if(!apply) { console.log('Dry run. Use --apply to create missing content.'); return; }
  if(!writeClient.config().token) throw new Error('Missing SANITY_WRITE_TOKEN');
  let tx=writeClient.transaction();
  for (const [id, fields] of [['singleton-site-content',siteFields],['singleton-page-copy',pageCopy]] as const) {
    if(existing.some(doc=>doc._id===id)) tx=tx.patch(id,patch=>patch.setIfMissing(keyed(fields) as Record<string,unknown>));
  }
  for(const doc of docs) tx=doc._id ? tx.createIfNotExists(doc as {_id:string;_type:string}) : tx.create(doc as {_type:string});
  const extraMedia = Object.fromEntries(Object.entries(mediaKitDefaults).filter(([key])=>!['collaborationMenu','reportingWindow','dashboardWindow','insights','profileSnapshot','collaborationHighlights'].includes(key)));
  tx=tx.patch('singleton-media-kit',patch=>patch.setIfMissing(keyed(extraMedia) as Record<string,unknown>));
  await tx.commit();
  console.log('Created missing CMS content; preserved existing edits.');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
