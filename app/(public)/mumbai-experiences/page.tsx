import { getMarkets } from '@/lib/brand-data-fetch';
import { notFound } from 'next/navigation';
import { getPageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

import { CityExperience } from "@/components/site/page-sections";
import { makeMetadata, markets } from "@/lib/brand-data";

const market = markets.find((item) => item.name === "Mumbai")!;

const fallbackMetadata: Metadata = makeMetadata({
  title: "Mumbai Experiences",
  description:
    "Mumbai cafés, hotel moments, fashion-forward city energy, and selective lifestyle stories from Iva Chatterjee.",
  path: "/mumbai-experiences",
  keywords: market.keywords,
});

export default async function MumbaiExperiencesPage() {
  const market = (await getMarkets()).find((item: {name: string}) => item.name === "Mumbai");
  if (!market) notFound();
  return <CityExperience {...market} />;
}

export async function generateMetadata(): Promise<Metadata> { return getPageMetadata("/mumbai-experiences", fallbackMetadata); }
