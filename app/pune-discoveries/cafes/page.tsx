import type { Metadata } from "next";

import { CityExperience } from "@/components/site/page-sections";
import { ivaImages, makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Pune Café Discoveries",
  description:
    "Pune cafés, calm neighborhood discoveries, and refined weekend experiences through Iva Chatterjee's personal style.",
  path: "/pune-discoveries/cafes",
  keywords: ["Pune hidden cafés", "Pune cafés"],
});

export default function PuneCafesPage() {
  return (
    <CityExperience
      href="/pune-discoveries/cafes"
      image={ivaImages.pinkCafe}
      name="Pune Café Discoveries"
      positioning="Calm café culture, quiet neighborhood finds, and easy weekend moments with an elegant visual rhythm."
      role="Quiet Weekend Edit"
    />
  );
}
