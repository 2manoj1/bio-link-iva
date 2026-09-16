import { getCreatorIdentity } from './creator-identity';
import { getSocialMetrics } from './social-metrics';
import { unstable_rethrow } from 'next/navigation';
import { getSiteContent } from './site-content';
import type { MediaKit, PremiumExperience } from '../types/cms';
import { cache } from 'react';
import { client } from '../sanity/client';
import { mediaKitQuery, premiumExperiencesQuery } from '../sanity/queries';
import {
  mediaKit,
  topContent,
  visualStories,
  trustedBrands,
  markets,
  shopQuickLinks,
  dailyProductShelves,
} from './brand-data';
import {
  visualStoriesQuery,
  trustedBrandsQuery,
  marketsQuery,
  shopQuickLinksQuery,
  dailyProductShelvesQuery,
} from '../sanity/queries';

export async function getInstagramStats() {
  const metrics = await getSocialMetrics();
  return {
    followers: metrics?.followers || '—', posts: metrics?.posts || '—', following: metrics?.following || '—',
    views: metrics?.views || '—', demographicsAge: metrics?.demographicsAge ?? [],
    demographicsGender: metrics?.demographicsGender ?? [], metricsUpdatedAt: metrics?.metricsUpdatedAt,
  };
}

export async function getMediaKitData() {
  try {
    const sanityMediaKit = await client.fetch<MediaKit | null>(
      mediaKitQuery,
      {},
      { next: { revalidate: 60, tags: ['sanity-content'] } }
    );

    const fallbackInteractions = mediaKit.insights.find(i => i.label === "Interactions")?.value ?? "36.5K";
    const fallbackContentShared = mediaKit.insights.find(i => i.label === "Content shared")?.value ?? "107";

    if (!sanityMediaKit) {
      return {
        reportingWindow: mediaKit.reportingWindow,
        dashboardWindow: mediaKit.dashboardWindow,
        interactions: fallbackInteractions,
        contentShared: fallbackContentShared,
      };
    }

    return {
      reportingWindow: sanityMediaKit.reportingWindow ?? mediaKit.reportingWindow,
      dashboardWindow: sanityMediaKit.dashboardWindow ?? mediaKit.dashboardWindow,
      interactions: sanityMediaKit.interactions ?? fallbackInteractions,
      contentShared: sanityMediaKit.contentShared ?? fallbackContentShared,
    };
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching Media Kit data from Sanity:", error);
    const fallbackInteractions = mediaKit.insights.find(i => i.label === "Interactions")?.value ?? "36.5K";
    const fallbackContentShared = mediaKit.insights.find(i => i.label === "Content shared")?.value ?? "107";
    return {
      reportingWindow: mediaKit.reportingWindow,
      dashboardWindow: mediaKit.dashboardWindow,
      interactions: fallbackInteractions,
      contentShared: fallbackContentShared,
    };
  }
}

export async function getPremiumExperiences() {
  try {
    const sanityExperiences = await client.fetch<PremiumExperience[]>(
      premiumExperiencesQuery,
      {},
      { next: { revalidate: 60, tags: ['sanity-content'] } }
    );

    if (Array.isArray(sanityExperiences)) {
      return sanityExperiences.map((item, index) => {
        const fallback = topContent[index % topContent.length];
        return {
          title: item.title ?? fallback.title,
          category: item.category ?? fallback.category,
          views: item.views ?? fallback.views,
          href: item.href ?? item.link ?? fallback.href,
          image: item.image ?? fallback.image,
          city: item.city ?? fallback.city ?? "Bengaluru",
        };
      });
    }

    return topContent;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching Premium Experiences from Sanity:", error);
    return topContent;
  }
}

export async function getVisualStories() {
  try {
    const sanityData = await client.fetch<typeof visualStories>(visualStoriesQuery, {}, { next: { revalidate: 60, tags: ['sanity-content'] } });
    if (Array.isArray(sanityData)) {
      return sanityData;
    }
    return visualStories;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching Visual Stories from Sanity:", error);
    return visualStories;
  }
}

export async function getTrustedBrands() {
  try {
    const sanityData = await client.fetch<typeof trustedBrands>(trustedBrandsQuery, {}, { next: { revalidate: 60, tags: ['sanity-content'] } });
    if (Array.isArray(sanityData)) {
      return sanityData;
    }
    return [];
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching Trusted Brands from Sanity:", error);
    return [];
  }
}

export async function getMarkets() {
  try {
    const sanityData = await client.fetch<typeof markets>(marketsQuery, {}, { next: { revalidate: 60, tags: ['sanity-content'] } });
    if (Array.isArray(sanityData)) {
      return sanityData;
    }
    return markets;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching Markets from Sanity:", error);
    return markets;
  }
}

export async function getShopQuickLinks() {
  try {
    const sanityData = await client.fetch<typeof shopQuickLinks>(shopQuickLinksQuery, {}, { next: { revalidate: 60, tags: ['sanity-content'] } });
    if (Array.isArray(sanityData)) {
      return sanityData;
    }
    return shopQuickLinks;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching Shop Quick Links from Sanity:", error);
    return shopQuickLinks;
  }
}

export async function getDailyProductShelves() {
  try {
    const sanityData = await client.fetch<typeof dailyProductShelves>(dailyProductShelvesQuery, {}, { next: { revalidate: 60, tags: ['sanity-content'] } });
    if (Array.isArray(sanityData)) {
      return sanityData;
    }
    return dailyProductShelves;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching Daily Product Shelves from Sanity:", error);
    return dailyProductShelves;
  }
}

export async function getLiveStats() {
  const instaStats = await getInstagramStats();
  const { otherStats } = await getSiteContent();
  return [
    { label: "Instagram", value: instaStats.followers, note: "Followers" },
    { label: "Posts", value: instaStats.posts, note: "Always-on creator" },
    ...otherStats,
  ];
}


export const getCreatorProfile = cache(async () => {
  const [profile, stats] = await Promise.all([getCreatorIdentity(), getInstagramStats()]);
  return { ...profile, ...stats };
});
