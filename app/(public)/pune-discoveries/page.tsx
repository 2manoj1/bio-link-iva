import { getMarkets } from '@/lib/brand-data-fetch';
import { notFound } from 'next/navigation';
import { getPageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

import { CityExperience } from "@/components/site/page-sections";
import { makeMetadata, markets } from "@/lib/brand-data";

const market = markets.find((item) => item.name === "Pune")!;

const fallbackMetadata: Metadata = makeMetadata({
  title: "Pune Discoveries",
  description:
    "Pune cafés, calm weekend discoveries, city gems, and lifestyle notes from Iva Chatterjee.",
  path: "/pune-discoveries",
  keywords: market.keywords,
});

export default async function PuneDiscoveriesPage() {
  const market = (await getMarkets()).find((item: {name: string}) => item.name === "Pune");
  if (!market) notFound();
  return <CityExperience {...market} />;
}

export async function generateMetadata(): Promise<Metadata> { return getPageMetadata("/pune-discoveries", fallbackMetadata); }
