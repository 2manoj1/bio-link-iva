import 'server-only';
import { cache } from 'react';
import { fetchContent } from '@/sanity/fetch';
import { mergeContentDefaults } from './content-defaults';
import { siteContentDefaults, mediaKitDefaults, type SiteContent } from './site-content-defaults';

export const getSiteContent = cache(async () => {
  const result = await fetchContent<SiteContent | null>('*[_id=="singleton-site-content"][0]', {}, null);
  // Defaults only bootstrap a missing document; arrays remain empty when editors clear them.
  return mergeContentDefaults(siteContentDefaults, result);
});
export const getFullMediaKit = cache(async () => {
  const result = await fetchContent<Partial<typeof mediaKitDefaults> | null>('*[_id=="singleton-media-kit"][0]', {}, null);
  return mergeContentDefaults(mediaKitDefaults, result);
});
