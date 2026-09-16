import type { MetadataRoute } from 'next';
import { getCreatorIdentity } from '@/lib/creator-identity';
import { canonicalUrl } from '@/lib/creator-discovery';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const profile = await getCreatorIdentity();
  return { rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/studio', '/api/'] }, sitemap:canonicalUrl(profile,'/sitemap.xml') };
}
export const revalidate = 60;
