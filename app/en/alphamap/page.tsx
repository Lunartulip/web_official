import type { Metadata } from "next";
import { alphaMapStudies } from "@/lib/research-objects";
import AlphaMapIndex from "../../alphamap/alphamap-index";

export const metadata: Metadata = {
  title: "Lunartulip AlphaMap | Graph Signals and Cross-Sectional Stock Factors",
  description: "Lunartulip AlphaMap fixes dated graph vintages, samples and observation windows to test whether semantic networks add information to cross-sectional stock rankings.",
  alternates: {
    canonical: "/en/alphamap",
    languages: { en: "/en/alphamap", "zh-CN": "/alphamap", "x-default": "/en/alphamap" },
  },
};

export default function EnglishAlphaMapPage() {
  const items = alphaMapStudies.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "ScholarlyArticle",
      "@id": `https://lunartuliplab.com/en/alphamap/${item.slug}#article`,
      url: `https://lunartuliplab.com/en/alphamap/${item.slug}`,
      name: `${item.sourceLabel}: ${item.renderings.en.title}`,
      identifier: item.doi
        ? [
            item.id,
            { "@type": "PropertyValue", propertyID: "DOI", value: item.doi },
          ]
        : item.id,
      sameAs: item.doi ? `https://doi.org/${item.doi}` : undefined,
      headline: item.renderings.en.title,
      datePublished: item.publishedAt,
      dateModified: item.versions.at(-1)?.date ?? item.publishedAt,
    },
  }));
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://lunartuliplab.com/en/alphamap#collection",
    name: "Lunartulip AlphaMap",
    inLanguage: "en",
    mainEntity: {
      "@type": "CreativeWorkSeries",
      "@id": "https://lunartuliplab.com/alphamap#series",
      name: "Lunartulip AlphaMap",
      hasPart: {
        "@type": "ItemList",
        itemListElement: items,
      },
    },
    publisher: { "@id": "https://lunartuliplab.com/#organization" },
  };
  return (
    <>
      <AlphaMapIndex language="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
