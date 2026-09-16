import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jobs.trax.ng";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/", "/jobs/get-started/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Applebot-Extended",
          "Google-Extended",
          "CCBot",
          "cohere-ai",
        ],
        allow: "/",
        disallow: ["/api/", "/studio/", "/jobs/get-started/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
