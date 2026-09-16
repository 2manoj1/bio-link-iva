import seo from '@/sanity/data/page-seo.json';
import { amazonAffiliate, navItems, ivaImages, experiencePillars, neighborhoods, editorial, mediaKit } from './brand-data';
export const siteContentDefaults = { seo, assistantKnowledge: "Use the published profile, media kit, blog and video records for current facts. Direct booking, rates and availability questions to the contact page.", amazonAffiliate, navItems, ivaImages, experiencePillars, neighborhoods, editorial };
export const mediaKitDefaults = mediaKit;
export type SiteContent = typeof siteContentDefaults;
