import type { Metadata } from "next";
import { deepDiveResearchObjects } from "@/lib/research-objects";
import DeepDiveIndex from "./deep-dive-index";

export const metadata: Metadata = {
  title: "Lunartulip Deep Dive｜Research Models 的公开证据层",
  description: "Research Models 的版本化公开证据，先呈现科技股 Theme Studies，再进入 Company Deep Dives，并保留核心论点、风险边界、as-of 日期与更新记录。",
  alternates: {
    canonical: "/deep-dive",
    languages: { "zh-CN": "/deep-dive", en: "/en/deep-dive" },
    types: { "application/rss+xml": "/deep-dive/feed.xml" },
  },
  openGraph: {
    type: "website",
    url: "/deep-dive",
    title: "Lunartulip Deep Dive",
    description: "Versioned public research samples across global AI technology equities.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Deep Dive" }],
  },
};

export default function DeepDivePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://lunartuliplab.com/deep-dive#collection",
    name: "Lunartulip Deep Dive",
    inLanguage: "zh-CN",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [...deepDiveResearchObjects]
        .sort((a, b) => (b.versions.at(-1)?.date ?? b.publishedAt).localeCompare(a.versions.at(-1)?.date ?? a.publishedAt))
        .map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "ScholarlyArticle",
          "@id": `https://lunartuliplab.com/deep-dive/${item.slug}#article`,
          url: `https://lunartuliplab.com/deep-dive/${item.slug}`,
          headline: item.renderings["zh-CN"].title,
          datePublished: item.publishedAt,
          dateModified: item.versions.at(-1)?.date ?? item.publishedAt,
          about: item.tickers,
        },
      })),
    },
    publisher: { "@id": "https://lunartuliplab.com/#organization" },
  };
  return (
    <>
      <DeepDiveIndex />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
