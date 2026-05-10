import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CityExperience } from "@/components/site/page-sections";
import { ivaImages, makeMetadata, neighborhoods } from "@/lib/brand-data";

export function generateStaticParams() {
  return neighborhoods.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area: areaSlug } = await params;
  const area = neighborhoods.find((item) => item.slug === areaSlug);

  if (!area) {
    return makeMetadata({
      title: "Bengaluru Guide",
      description:
        "Bengaluru cafés, rooftops, stays, and city nights through Iva Chatterjee's soft luxury lens.",
      path: "/bengaluru-guide",
    });
  }

  return makeMetadata({
    title: area.title,
    description: area.description,
    path: `/bengaluru-guide/${area.slug}`,
    keywords: area.keywords,
  });
}

export default function NeighborhoodPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  return <NeighborhoodLoader params={params} />;
}

async function NeighborhoodLoader({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: areaSlug } = await params;
  const area = neighborhoods.find((item) => item.slug === areaSlug);

  if (!area) notFound();

  return (
    <CityExperience
      href={`/bengaluru-guide/${area.slug}`}
      image={
        area.slug === "indiranagar"
          ? ivaImages.fineDining
          : area.slug === "koramangala"
            ? ivaImages.pinkCafe
            : area.slug === "hsr"
              ? ivaImages.rooftopBlue
              : ivaImages.heritageSaree
      }
      name={area.name}
      positioning={area.description}
      role="Iva's Bengaluru Picks"
    />
  );
}
