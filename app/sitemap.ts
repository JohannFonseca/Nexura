import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nexuracr.dev";
  const locales = ["es", "en"];
  const lastModified = new Date();

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/portafolio", priority: 0.8, changeFrequency: "weekly" as const },
  ];

  return locales.flatMap((lang) =>
    routes.map(({ path, priority, changeFrequency }) => ({
      url: `${baseUrl}/${lang}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }))
  );
}
