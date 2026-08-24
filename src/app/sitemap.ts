import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

/**
 * Карта сайту. Поки сторінка одна — коли з'являться окремі сторінки послуг
 * або блог, додайте їх у масив.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
