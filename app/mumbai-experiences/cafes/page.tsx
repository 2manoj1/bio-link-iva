import type { Metadata } from "next";

import { CityExperience } from "@/components/site/page-sections";
import { ivaImages, makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Mumbai Café Edit",
  description:
    "Mumbai cafés, fashion-forward hospitality, and city energy through Iva Chatterjee's personal style.",
  path: "/mumbai-experiences/cafes",
  keywords: ["Mumbai luxury cafés", "Mumbai cafés"],
});

export default function MumbaiCafesPage() {
  return (
    <CityExperience
      href="/mumbai-experiences/cafes"
      image={ivaImages.rooftopBar}
      name="Mumbai Café Edit"
      positioning="Polished cafés, fashion-forward hospitality, and sharper city energy for select stories."
      role="Fashion-Forward City Edit"
    />
  );
}
