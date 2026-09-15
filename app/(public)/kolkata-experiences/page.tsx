import { getMarkets } from '@/lib/brand-data-fetch';
import { notFound } from 'next/navigation';
import { getPageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

import { CityExperience } from "@/components/site/page-sections";
import { makeMetadata, markets } from "@/lib/brand-data";

const market = markets.find((item) => item.name === "Kolkata")!;

const fallbackMetadata: Metadata = makeMetadata({
  title: "Kolkata Experiences",
  description:
    "Kolkata heritage stays, cultural dining, and charming city experiences captured by Iva Chatterjee.",
  path: "/kolkata-experiences",
  keywords: market.keywords,
});

export default async function KolkataExperiencesPage() {
  const market = (await getMarkets()).find((item: {name: string}) => item.name === "Kolkata");
  if (!market) notFound();
  return <CityExperience {...market} />;
}

export async function generateMetadata(): Promise<Metadata> { return getPageMetadata("/kolkata-experiences", fallbackMetadata); }
