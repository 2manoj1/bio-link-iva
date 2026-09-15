import seo from '@/sanity/data/page-seo.json';
import { creator, amazonAffiliate, navItems, ivaImages, collaborationTypes, experiencePillars, neighborhoods, editorial, mediaKit } from './brand-data';
export const siteContentDefaults = { seo, assistantKnowledge: "Use the published profile, media kit, blog and video records for current facts. Direct booking, rates and availability questions to the contact page.", creator: { ...creator, whatsappNumber: "918431716703" }, otherStats: [{ label: "YouTube", value: "16K+", note: "Maniva community" }, { label: "Loved Reel", value: "319K", note: "Most-loved moment" }], amazonAffiliate, navItems, ivaImages, collaborationTypes, experiencePillars, neighborhoods, editorial };
export const mediaKitDefaults = mediaKit;
export type SiteContent = typeof siteContentDefaults;
