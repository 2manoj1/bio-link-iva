import type { MetadataRoute } from "next";

import { editorial, neighborhoods, siteUrl } from "@/lib/brand-data";

const staticRoutes = [
  "",
  "/about",
  "/collaborations",
  "/bengaluru-guide",
  "/goa-escapes",
  "/goa-escapes/boutique-stays",
  "/mumbai-experiences",
  "/mumbai-experiences/cafes",
  "/pune-discoveries",
  "/pune-discoveries/cafes",
  "/media-kit",
  "/contact",
  "/links",
  "/blog",
  "/editorial",
  "/premium-experiences",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    ...staticRoutes,
    ...neighborhoods.map((area) => `/bengaluru-guide/${area.slug}`),
    ...editorial.map((story) => `/editorial/${story.slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("media-kit") ? 0.9 : 0.7,
  }));
}
