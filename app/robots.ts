import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://lunartuliplab.com/sitemap.xml",
    host: "https://lunartuliplab.com",
  };
}
