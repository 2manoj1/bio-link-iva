import { getCreatorIdentity } from "@/lib/creator-identity";
import { canonicalUrl } from "@/lib/creator-discovery";
import { JsonLd } from "@/components/site/json-ld";
import { getPageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

import { HomeExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

const fallbackMetadata: Metadata = makeMetadata({
  title: "Bangalore Influencer & Digital Creator",
  description:
    "Iva Chatterjee shares beauty, food, travel, lifestyle, cafés, hotels, fashion moments, and city nights through a polished Bangalore lens.",
  keywords: [
    "Iva Chatterjee Bangalore influencer",
    "Bangalore digital creator",
    "beauty food travel lifestyle creator",
    "Bengaluru lifestyle creator",
    "Bengaluru luxury cafés",
    "Bangalore premium experiences",
    "luxury staycation Bangalore",
  ],
});

export default async function HomePage() {
  const creator = await getCreatorIdentity();
  const url = canonicalUrl(creator);
  return <><JsonLd data={{"@context":"https://schema.org","@type":"WebPage","@id":`${url}#webpage`,url,name:creator.name,description:creator.description,about:{"@id":`${url}#person`},isPartOf:{"@id":`${url}#website`}}} /><HomeExperience /></>;
}

export async function generateMetadata(): Promise<Metadata> { return getPageMetadata("/", fallbackMetadata); }
