import type { Metadata } from 'next';
import { getSiteContent } from './site-content';
import { canonicalUrl } from './creator-discovery';

export async function getPageMetadata(path: string, fallback: Metadata): Promise<Metadata> {
  const { creator, seo } = await getSiteContent();
  const entry = seo.find(item => item.path === path);
  const defaultTitle = typeof fallback.title === 'string' ? fallback.title.split(' | ')[0] : '';
  const title = path === '/'
    ? `${creator.name} | ${creator.title}${creator.category ? ` & ${creator.category}` : ''}`
    : `${entry?.title || defaultTitle || creator.title} | ${creator.name}`;
  const description = path === '/' || path === '/about' ? creator.description : entry?.description || fallback.description || creator.description;
  const image = fallback.openGraph?.images || [{ url: canonicalUrl(creator,'/opengraph-image'),width:1200,height:630,alt:creator.name }];
  return {
    ...fallback, title: { absolute: title }, description,
    metadataBase: new URL(creator.websiteUrl), alternates: { ...fallback.alternates, canonical:canonicalUrl(creator,path) },
    authors:[{name:creator.name,url:canonicalUrl(creator)}], creator:creator.name,
    keywords:[creator.name,...creator.contentPillars],
    openGraph:{ ...fallback.openGraph,type:'website',title,description,url:canonicalUrl(creator,path),siteName:creator.name,images:image },
    twitter:{card:'summary_large_image',title,description,images:[canonicalUrl(creator,'/opengraph-image')]},
  };
}
