import type { Metadata } from "next";

import { CityExperience } from "@/components/site/page-sections";
import { makeMetadata, markets } from "@/lib/brand-data";

const market = markets.find((item) => item.name === "Goa")!;

export const metadata: Metadata = makeMetadata({
  title: "Goa Escapes",
  description:
    "Goa boutique stays, sunset tables, resort days, and softer travel moments through Iva Chatterjee's lens.",
  path: "/goa-escapes",
  keywords: market.keywords,
});

export default function GoaEscapesPage() {
  return <CityExperience {...market} />;
}
