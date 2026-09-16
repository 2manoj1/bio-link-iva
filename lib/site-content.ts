import 'server-only';
import { getCreatorIdentity } from './creator-identity';
import { getSocialMetrics } from './social-metrics';
import { cache } from 'react';
import { fetchContent } from '@/sanity/fetch';
import { mergeContentDefaults } from './content-defaults';
import { siteContentDefaults, mediaKitDefaults, type SiteContent } from './site-content-defaults';

export const getSiteContent = cache(async () => {
  const result = await fetchContent<SiteContent | null>('*[_id=="singleton-site-content"][0]', {}, null);
  // Defaults only bootstrap a missing document; arrays remain empty when editors clear them.
  const [creator, metrics] = await Promise.all([getCreatorIdentity(), getSocialMetrics()]);
  return { ...mergeContentDefaults(siteContentDefaults, result), creator, collaborationTypes: creator.industries,
    otherStats: [
      { label: 'YouTube', value: metrics?.youtubeSubscribers ?? '', note: 'Maniva community' },
      { label: 'Loved Reel', value: metrics?.lovedReelViews ?? '', note: 'Most-loved moment' },
    ].filter(item => item.value),
  };
});
export const getFullMediaKit = cache(async () => {
  const result = await fetchContent<Partial<typeof mediaKitDefaults> | null>('*[_id=="singleton-media-kit"][0]', {}, null);
  const creator = await getCreatorIdentity();
  return { ...mergeContentDefaults(mediaKitDefaults, result), collaborationMenu: creator.services };
});
