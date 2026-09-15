import { getAllPageCopy } from '@/lib/page-copy';
import { getSiteContent } from '@/lib/site-content';
import { getMarkets } from '@/lib/brand-data-fetch';
import { ContentProvider } from '@/components/site/content-provider';
import { SiteHeader, SiteFooter, SiteChatbot } from '@/components/site/site-chrome';
import { JsonLd } from '@/components/site/json-ld';
import { Analytics } from '@vercel/analytics/react';
import { siteUrl } from '@/lib/brand-data';
export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [content, markets, allCopy] = await Promise.all([getSiteContent(), getMarkets(), getAllPageCopy()]);
  const { creator, navItems, collaborationTypes, amazonAffiliate } = content;
  const pageCopy = Object.fromEntries(["Navigation","Footer","InquiryFunnel"].map(section => [section, allCopy[section] ?? {}]));
  return (
    <>
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Person",
              name: creator.name,
              alternateName: creator.handle,
              url: siteUrl,
              image: new URL(creator.profileImage, siteUrl).href,
              description: creator.description,
              jobTitle: "Bangalore Influencer and Digital Creator",
              knowsAbout: [
                "Beauty",
                "Food",
                "Travel",
                "Lifestyle",
                "Fine Dining",
                "Fashion",
                "Bangalore Culture",
                "Boutique Hospitality",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bengaluru",
                addressRegion: "Karnataka",
                addressCountry: "IN",
              },
              sameAs: [
                creator.instagramUrl,
                creator.youtubeUrl,
                creator.facebookPageUrl,
                creator.websiteUrl
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Iva Chatterjee",
              url: siteUrl,
              description: creator.description,
              publisher: {
                "@type": "Person",
                name: creator.name,
              },
            }
          ]}
        />
          <ContentProvider value={{ creator, navItems, collaborationTypes, amazonAffiliate, markets, pageCopy }}>
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
