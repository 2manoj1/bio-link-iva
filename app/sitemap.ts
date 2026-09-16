import type { MetadataRoute } from 'next';
import { getCreatorIdentity } from '@/lib/creator-identity';
import { getPublicPages } from '@/lib/public-pages';
import { canonicalUrl } from '@/lib/creator-discovery';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [profile, pages] = await Promise.all([getCreatorIdentity(), getPublicPages()]);
  return pages.map(page=>({url:canonicalUrl(profile,page.path), changeFrequency:page.path==='/'?'weekly':'monthly',priority:page.path==='/'?1:0.8}));
}
export const revalidate = 60;
