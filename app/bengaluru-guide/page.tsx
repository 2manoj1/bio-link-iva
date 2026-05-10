import type { Metadata } from "next";

import { CityExperience } from "@/components/site/page-sections";
import { makeMetadata, markets } from "@/lib/brand-data";

const market = markets.find((item) => item.name === "Bengaluru")!;

export const metadata: Metadata = makeMetadata({
  title: "Bengaluru Guide",
  description:
    "Iva Chatterjee's Bengaluru guide for cafés, rooftops, couple plans, boutique stays, and beautiful city moments.",
  path: "/bengaluru-guide",
  keywords: market.keywords,
});

export default function BengaluruGuidePage() {
  return <CityExperience {...market} />;
}
