import { getPageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

import { CityExperience } from "@/components/site/page-sections";
import { ivaImages, makeMetadata } from "@/lib/brand-data";

const fallbackMetadata: Metadata = makeMetadata({
  title: "Pune Café Discoveries",
  description:
    "Pune cafés, calm neighborhood finds, and easy weekend plans through Iva Chatterjee's personal style.",
  path: "/pune-discoveries/cafes",
  keywords: ["Pune hidden cafés", "Pune cafés"],
});

export default function PuneCafesPage() {
  return (
    <CityExperience
      href="/pune-discoveries/cafes"
      image={ivaImages.pinkCafe}
      name="Pune Café Discoveries"
      positioning="Calm cafés, quiet neighborhood finds, and easy weekend moments with an elegant rhythm."
      role="Quiet Weekend Edit"
    />
  );
}

export async function generateMetadata(): Promise<Metadata> { return getPageMetadata("/pune-discoveries/cafes", fallbackMetadata); }
