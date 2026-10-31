import type { Metadata } from "next";
import { alphaMapWhitepapers } from "@/lib/alphamap-whitepapers";
import { alphaMapStudies } from "@/lib/research-objects";
import AlphaMapIndex from "./alphamap-index";

export const metadata: Metadata = {
  title: "AlphaMap｜将 FinLLM-KG 转化为可交易的科技股量化因子",
  description: "AlphaMap 研究大模型金融知识图谱的经济语义、时间与状态迁移，以及图结构如何映射为面向全球科技股趋势成长与轮动的中低频量化因子。",
  alternates: {
    canonical: "/alphamap",
    languages: { en: "/en/alphamap", "zh-CN": "/alphamap", "x-default": "/en/alphamap" },
  },
};

export default function AlphaMapPage() {
  const whitepapers = alphaMapWhitepapers.map((item) => ({
    "@type": "ListItem",
    position: Number(item.number),
    item: {
      "@type": "Article",
      "@id": `https://lunartuliplab.com/alphamap/${item.slug}#article`,
      url: `https://lunartuliplab.com/alphamap/${item.slug}`,
      name: item.title,
      headline: item.title,
      alternativeHeadline: item.subtitle,
      datePublished: item.publishedAt,
      inLanguage: "zh-CN",
    },
  }));
  const items = alphaMapStudies.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "ScholarlyArticle",
      "@id": `https://lunartuliplab.com/alphamap/${item.slug}#article`,
      url: `https://lunartuliplab.com/alphamap/${item.slug}`,
      name: `${item.sourceLabel}: ${item.renderings["zh-CN"].title}`,
      identifier: item.doi
        ? [
            item.id,
            { "@type": "PropertyValue", propertyID: "DOI", value: item.doi },
          ]
        : item.id,
      sameAs: item.doi ? `https://doi.org/${item.doi}` : undefined,
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
    mainEntity: [
      {
        "@type": "CreativeWorkSeries",
        "@id": "https://lunartuliplab.com/alphamap#whitepaper-series",
        name: "AlphaMap Whitepaper Series",
        description: "From FinLLM-KG and economic networks to tradable medium- and low-frequency factors for global technology equities.",
        hasPart: {
          "@type": "ItemList",
          itemListElement: whitepapers,
        },
      },
      {
        "@type": "CreativeWorkSeries",
        "@id": "https://lunartuliplab.com/alphamap#series",
        name: "Lunartulip AlphaMap DOI Empirical Research Series",
        hasPart: {
          "@type": "ItemList",
          itemListElement: items,
        },
      },
    ],
    publisher: { "@id": "https://lunartuliplab.com/#organization" },
  };
  return (
    <>
      <AlphaMapIndex />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
