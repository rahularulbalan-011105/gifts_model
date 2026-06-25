import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/checkout", "/order-confirmation", "/api"],
    },
    sitemap: "https://giftpartner.in/sitemap.xml",
  };
}
