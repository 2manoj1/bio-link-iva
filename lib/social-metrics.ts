import 'server-only';
import { cache } from 'react';
import { fetchContent } from '@/sanity/fetch';
import type { InstagramStats } from '@/types/cms';

export type SocialMetrics = InstagramStats & { youtubeSubscribers?: string; lovedReelViews?: string; metricsUpdatedAt?: string };
export const getSocialMetrics = cache(async (): Promise<SocialMetrics | null> => fetchContent<SocialMetrics | null>(
  '*[_id=="singleton-instagram-stats"][0]{followers,posts,following,views,demographicsAge,demographicsGender,youtubeSubscribers,lovedReelViews,metricsUpdatedAt}', {}, null,
));
