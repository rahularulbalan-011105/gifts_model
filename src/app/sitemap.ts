import type { MetadataRoute } from "next";

const routes = [
  "",
  "/services",
  "/how-it-works",
  "/gift-as-a-service",
  "/shopping-as-a-service",
  "/pricing",
  "/faq",
  "/contact",
  "/request",
  "/track",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://giftpartner.in";
  return routes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
