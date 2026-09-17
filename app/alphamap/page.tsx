import type { Metadata } from "next";
import { alphaMapStudies } from "@/lib/research-objects";
import AlphaMapIndex from "./alphamap-index";

export const metadata: Metadata = {
  title: "AlphaMap｜图谱信号与横截面测量研究",
  description: "固定图谱版本、样本和观察窗口，复核语义投影如何进入图分数与股票横截面诊断。",
  alternates: {
    canonical: "/alphamap",
    languages: { en: "/en/alphamap", "zh-CN": "/alphamap", "x-default": "/en/alphamap" },
  },
};

export default function AlphaMapPage() {
  const items = alphaMapStudies.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "ScholarlyArticle",
      "@id": `https://lunartuliplab.com/alphamap/${item.slug}#article`,
      url: `https://lunartuliplab.com/alphamap/${item.slug}`,
      identifier: item.id,
      headline: item.renderings["zh-CN"].title,
      datePublished: item.publishedAt,
      dateModified: item.versions.at(-1)?.date ?? item.publishedAt,
    },
  }));
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://lunartuliplab.com/alphamap#collection",
    name: "Lunartulip AlphaMap",
    inLanguage: "zh-CN",
    mainEntity: {
      "@type": "CreativeWorkSeries",
      "@id": "https://lunartuliplab.com/alphamap#series",
      name: "AlphaMap Methods Research",
      hasPart: {
        "@type": "ItemList",
        itemListElement: items,
      },
    },
    publisher: { "@id": "https://lunartuliplab.com/#organization" },
  };
  return (
    <>
      <AlphaMapIndex />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
