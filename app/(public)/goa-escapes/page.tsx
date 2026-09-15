import { getMarkets } from '@/lib/brand-data-fetch';
import { notFound } from 'next/navigation';
import { getPageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

import { CityExperience } from "@/components/site/page-sections";
import { makeMetadata, markets } from "@/lib/brand-data";

const market = markets.find((item) => item.name === "Goa")!;

const fallbackMetadata: Metadata = makeMetadata({
  title: "Goa Escapes",
  description:
    "Goa boutique stays, sunset tables, resort days, and softer travel moments through Iva Chatterjee's lens.",
  path: "/goa-escapes",
  keywords: market.keywords,
});

export default async function GoaEscapesPage() {
  const market = (await getMarkets()).find((item: {name: string}) => item.name === "Goa");
  if (!market) notFound();
  return <CityExperience {...market} />;
}

export async function generateMetadata(): Promise<Metadata> { return getPageMetadata("/goa-escapes", fallbackMetadata); }
