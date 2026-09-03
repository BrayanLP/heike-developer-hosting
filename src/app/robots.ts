import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://proiso.pe";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/libro-de-reclamaciones", "/politica-de-privacidad"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "cohere-ai",
        ],
        allow: ["/", "/blog", "/llms.txt", "/llms-full.txt"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
