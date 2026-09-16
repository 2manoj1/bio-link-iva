import 'server-only';
import { cache } from 'react';
import { z } from 'zod';
import { fetchContent } from '@/sanity/fetch';
import { groq } from 'next-sanity';

const market = z.object({ name: z.string(), href: z.string(), positioning: z.string().default('') });
const text = z.string().default('');
const strings = z.array(z.string()).default([]);
export const creatorIdentitySchema = z.object({
  name: z.string().min(1), title: z.string().min(1), description: z.string().min(1), positioning: text,
  longDescription: text, location: text, email: z.string().email(), whatsappNumber: text,
  username: z.string().min(1), instagramUrl: z.string().url(), youtubeUrl: text, facebookPageUrl: text,
  websiteUrl: z.string().url().transform(value => new URL(value).origin), profileImage: text, heroImage: text,
  displayName: text, category: text, profileLine: text, birthday: text, identity: text,
  collaborationCta: text, contentPillars: strings, collaborationHighlights: strings, recentCollaborationSignals: strings,
  threadsHandle: text,
  links: z.array(z.object({ _key: text, label: text, href: text })).default([]),
  featuredReels: z.array(z.object({ _key: text, title: text, description: text, href: text })).default([]),
  primaryMarket: market.nullable().default(null), additionalMarkets: z.array(market.nullable()).default([]).transform(items => items.filter(item => item !== null)),
  industries: strings, services: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
});
export type CreatorIdentity = z.infer<typeof creatorIdentitySchema> & { handle: string };
export const creatorIdentityQuery = groq`*[_id=="singleton-creator-profile"][0]{
  name,title,description,positioning,longDescription,location,email,whatsappNumber,username,
  instagramUrl,youtubeUrl,facebookPageUrl,websiteUrl,profileImage,heroImage,displayName,category,
  profileLine,birthday,identity,collaborationCta,contentPillars,collaborationHighlights,recentCollaborationSignals,
  threadsHandle,links[]{_key,label,href},featuredReels[]{_key,title,description,href},
  "primaryMarket":select(primaryMarket->hidden != true => primaryMarket->{name,href,positioning}),
  "additionalMarkets":additionalMarkets[]->[hidden != true]{name,href,positioning},industries,services[]{title,text}
}`;

export const getCreatorIdentity = cache(async (): Promise<CreatorIdentity> => {
  const doc = await fetchContent<Record<string, unknown> | null>(creatorIdentityQuery, {}, null);
  if (!doc) throw new Error('Published creator identity is unavailable.');
  // GROQ returns null for absent optional fields; allow schema defaults to apply.
  const profile = creatorIdentitySchema.parse(Object.fromEntries(Object.entries(doc).filter(([,v]) => v !== null)));
  return { ...profile, handle: `@${profile.username.replace(/^@/, '')}` };
});
