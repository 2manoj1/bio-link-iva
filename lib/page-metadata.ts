import type { Metadata } from 'next';
import { getSiteContent } from './site-content';
export async function getPageMetadata(path: string, fallback: Metadata): Promise<Metadata> {
  const { seo } = await getSiteContent();
  const entry = seo.find(item => item.path === path);
  if(!entry) return fallback;
  return {
    ...fallback,
    title: entry.title || fallback.title,
    description: entry.description || fallback.description,
    openGraph: {...fallback.openGraph, title:entry.title || fallback.openGraph?.title,description:entry.description || fallback.openGraph?.description},
    twitter: {...fallback.twitter,title:entry.title || fallback.twitter?.title,description:entry.description || fallback.twitter?.description},
  };
}
