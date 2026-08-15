import type { Metadata } from "next";
import { researchObjects } from "@/lib/research-objects";
import DeepDiveIndex from "./deep-dive-index";

export const metadata: Metadata = {
  title: "Lunartulip Deep Dive｜泛 AI 科技权益深度研究",
  description: "围绕全球泛 AI 科技公司与产业问题的版本化深度研究，保留核心论点、关键证据、风险边界、as-of 日期与更新记录。",
  alternates: {
    canonical: "/deep-dive",
    languages: { "zh-CN": "/deep-dive", en: "/en/deep-dive" },
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
      itemListElement: researchObjects.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://lunartuliplab.com/deep-dive/${item.slug}`,
        name: item.renderings["zh-CN"].title,
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
