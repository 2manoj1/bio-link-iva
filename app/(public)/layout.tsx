import { getAllPageCopy } from "@/lib/page-copy";
import { getSiteContent } from "@/lib/site-content";
import { getMarkets } from "@/lib/brand-data-fetch";
import { ContentProvider } from "@/components/site/content-provider";
import {
  SiteHeader,
  SiteFooter,
  SiteChatbot,
} from "@/components/site/site-chrome";
import { JsonLd } from "@/components/site/json-ld";
import { Analytics } from "@vercel/analytics/react";
import { creatorStructuredData } from '@/lib/creator-discovery';
import { getPageMetadata } from '@/lib/page-metadata';
export async function generateMetadata() { return getPageMetadata('/', {}); }
export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [content, markets, allCopy] = await Promise.all([
    getSiteContent(),
    getMarkets(),
    getAllPageCopy(),
  ]);
  const { creator, navItems, collaborationTypes, amazonAffiliate } = content;
  const pageCopy = Object.fromEntries(
    ["Navigation", "Footer", "InquiryFunnel"].map((section) => [
      section,
      allCopy[section] ?? {},
    ]),
  );
  return (
    <>
      <JsonLd data={creatorStructuredData(creator)} />
      <ContentProvider
        value={{
          creator,
          navItems,
          collaborationTypes,
          amazonAffiliate,
          markets,
          pageCopy,
        }}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
        <SiteChatbot />
        <Analytics />
      </ContentProvider>
    </>
  );
}

export const revalidate = 60;
