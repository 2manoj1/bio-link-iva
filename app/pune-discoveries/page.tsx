import type { Metadata } from "next";

import { CityExperience } from "@/components/site/page-sections";
import { makeMetadata, markets } from "@/lib/brand-data";

const market = markets.find((item) => item.name === "Pune")!;

export const metadata: Metadata = makeMetadata({
  title: "Pune Discoveries",
  description:
    "Pune cafés, refined weekend discoveries, calm city gems, and lifestyle notes from Iva Chatterjee.",
  path: "/pune-discoveries",
  keywords: market.keywords,
});

export default function PuneDiscoveriesPage() {
  return <CityExperience {...market} />;
}
