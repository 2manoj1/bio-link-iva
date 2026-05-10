import type { Metadata } from "next";

import { CityExperience } from "@/components/site/page-sections";
import { ivaImages, makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Goa Boutique Stays",
  description:
    "Boutique stays, resort days, sunset tables, and quieter Goa escapes from Iva Chatterjee.",
  path: "/goa-escapes/boutique-stays",
  keywords: ["Goa boutique stays", "premium Goa staycation"],
});

export default function GoaBoutiqueStaysPage() {
  return (
    <CityExperience
      href="/goa-escapes/boutique-stays"
      image={ivaImages.poolsidePink}
      name="Goa Boutique Stays"
      positioning="Boutique escapes, resort textures, sunset tables, and slow-living hospitality stories with restraint."
      role="Iva's Goa Picks"
    />
  );
}
