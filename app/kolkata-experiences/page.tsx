import type { Metadata } from "next";

import { CityExperience } from "@/components/site/page-sections";
import { makeMetadata, markets } from "@/lib/brand-data";

const market = markets.find((item) => item.name === "Kolkata")!;

export const metadata: Metadata = makeMetadata({
  title: "Kolkata Experiences",
  description:
    "Kolkata heritage stays, cultural dining, and charming city experiences captured by Iva Chatterjee.",
  path: "/kolkata-experiences",
  keywords: market.keywords,
});

export default function KolkataExperiencesPage() {
  return <CityExperience {...market} />;
}
