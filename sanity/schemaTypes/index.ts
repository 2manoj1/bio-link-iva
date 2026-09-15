import { pageCopyType } from './pageCopyType'
import { siteContentType } from './siteContentType'
import { blogPostType, socialVideoType } from './publishing'
import { creatorProfileType } from './creatorProfileType'
import { type SchemaTypeDefinition } from 'sanity'
import { instagramStatsType } from './instagramStatsType'
import { mediaKitType } from './mediaKitType'
import { premiumExperienceType } from './premiumExperienceType'
import { visualStoryType } from './visualStoryType'
import { trustedBrandType } from './trustedBrandType'
import { marketType } from './marketType'
import { shopQuickLinkType } from './shopQuickLinkType'
import { dailyProductShelfType } from './dailyProductShelfType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    pageCopyType,
    siteContentType,
    creatorProfileType,
    blogPostType,
    socialVideoType,
    instagramStatsType,
    mediaKitType,
    premiumExperienceType,
    visualStoryType,
    trustedBrandType,
    marketType,
    shopQuickLinkType,
    dailyProductShelfType,
  ],
}
