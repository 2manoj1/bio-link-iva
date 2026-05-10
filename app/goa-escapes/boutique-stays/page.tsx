import type { Metadata } from "next";

import { CityExperience } from "@/components/site/page-sections";
import { ivaImages, makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Goa Boutique Stays",
  description:
    "Boutique stays, resort days, sunset tables, and quieter Goa escapes through Iva Chatterjee's lens.",
  path: "/goa-escapes/boutique-stays",
  keywords: ["Goa boutique stays", "premium Goa staycation"],
});

export default function GoaBoutiqueStaysPage() {
  return (
    <CityExperience
      href="/goa-escapes/boutique-stays"
      image={ivaImages.poolsidePink}
      name="Goa Boutique Stays"
      positioning="Boutique escapes, poolside light, sunset tables, and slower stays with a soft luxury mood."
      role="Iva's Goa Picks"
    />
  );
}
