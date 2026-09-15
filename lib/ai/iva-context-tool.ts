import 'server-only';
import { fetchContent } from '@/sanity/fetch';

export type IvaContextToolResult = {
  mode: 'rag'; answer: null; confidence: number; retrievalScore: number; intentId: null;
  knowledge: string; faqFallback: { answer: string; confidence: number; intentId: string } | null;
};
export async function getIvaContextToolResult(query: string, limit: number): Promise<IvaContextToolResult> {
  const docs = await fetchContent<Record<string, unknown>[]>(`*[
    _type in ["creatorProfile","instagramStats","mediaKit","siteContent","trustedBrand","market","premiumExperience","blogPost","socialVideo"]
    && hidden!=true && (!defined(publishedAt) || dateTime(publishedAt)<=dateTime(now()))
  ]{_type,title,name,description,excerpt,category,views,followers,posts,following,
    displayName,profileLine,collaborationCta,collaborationHighlights,recentCollaborationSignals,
    creator,assistantKnowledge,collaborationTypes,brandFit,collaborationMenu,reportingWindow,
    interactions,contentShared,demographicsAge,demographicsGender,
    "slug":slug.current,"articleText":pt::text(body),url,href,positioning,focus,metric}`, {}, []);
  const words = query.toLowerCase().split(/\W+/).filter(word=>word.length>2);
  const ranked = docs.map(doc=>({doc, score:words.reduce((score,word)=>score+(JSON.stringify(doc).toLowerCase().includes(word)?1:0),0)})).sort((a,b)=>b.score-a.score);
  const core = docs.filter(doc=>['siteContent','creatorProfile','instagramStats','mediaKit'].includes(String(doc._type)));
  const selected = [...core,...ranked.filter(item=>!core.includes(item.doc)).slice(0,limit).map(item=>item.doc)];
  return {mode:'rag',answer:null,intentId:null,confidence:docs.length?0.9:0,retrievalScore:ranked[0]?.score ?? 0,
    knowledge:JSON.stringify(selected).slice(0,22000),faqFallback:null};
}
export async function getContentRevision() {
  const revisions = await fetchContent<string[]>(`*[_type in ["creatorProfile","instagramStats","mediaKit","siteContent","trustedBrand","market","premiumExperience","blogPost","socialVideo"] && hidden!=true && (!defined(publishedAt) || dateTime(publishedAt)<=dateTime(now()))] | order(_id asc)._rev`, {}, []);
  const { createHash } = await import('node:crypto');
  return createHash('sha256').update(revisions.join('|')).digest('hex').slice(0,20);
}
