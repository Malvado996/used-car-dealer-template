import type { MetadataRoute } from "next";
import { getAllVehicles, vehicleSlug } from "@/lib/inventory";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const vehicles = await getAllVehicles();
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    ...vehicles.map((v) => ({
      url: absoluteUrl(`/inventory/${vehicleSlug(v)}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
