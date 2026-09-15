import { getMarkets } from '@/lib/brand-data-fetch';
import { notFound } from 'next/navigation';
import { getPageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

import { CityExperience } from "@/components/site/page-sections";
import { makeMetadata, markets } from "@/lib/brand-data";

const market = markets.find((item) => item.name === "Bengaluru")!;

const fallbackMetadata: Metadata = makeMetadata({
  title: "Bengaluru Guide",
  description:
    "Iva Chatterjee's Bengaluru guide for cafés, rooftops, couple plans, boutique stays, and city nights worth saving.",
  path: "/bengaluru-guide",
  keywords: market.keywords,
});

export default async function BengaluruGuidePage() {
  const market = (await getMarkets()).find((item: {name: string}) => item.name === "Bengaluru");
  if (!market) notFound();
  return <CityExperience {...market} />;
}

export async function generateMetadata(): Promise<Metadata> { return getPageMetadata("/bengaluru-guide", fallbackMetadata); }
