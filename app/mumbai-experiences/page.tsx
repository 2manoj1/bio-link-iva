import type { Metadata } from "next";

import { CityExperience } from "@/components/site/page-sections";
import { makeMetadata, markets } from "@/lib/brand-data";

const market = markets.find((item) => item.name === "Mumbai")!;

export const metadata: Metadata = makeMetadata({
  title: "Mumbai Experiences",
  description:
    "Mumbai cafés, hospitality, fashion-forward city energy, and selective lifestyle stories from Iva Chatterjee.",
  path: "/mumbai-experiences",
  keywords: market.keywords,
});

export default function MumbaiExperiencesPage() {
  return <CityExperience {...market} />;
}
