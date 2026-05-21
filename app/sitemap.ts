import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/blog";
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
  "/shop",
  "/blog",
  "/premium-experiences",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    ...staticRoutes,
    ...neighborhoods.map((area) => `/bengaluru-guide/${area.slug}`),
    ...blogPosts.map((story) => `/blog/${story.slug}`),
    ...editorial.map((story) => `/editorial/${story.slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
