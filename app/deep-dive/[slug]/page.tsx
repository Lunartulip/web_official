import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isEditorialDeepDive } from "@/lib/editorial-deep-dives";
import { getResearchObject, researchObjects } from "@/lib/research-objects";
import DeepDiveArticle from "../deep-dive-article";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // Editorial Deep Dives are served by an explicit static HTML route at the same path.
  return researchObjects.filter(({ slug }) => !isEditorialDeepDive(slug)).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getResearchObject((await params).slug);
  if (!item) return {};
  const rendering = item.renderings["zh-CN"];
  const modifiedAt = item.versions.at(-1)?.date ?? item.publishedAt;
  return {
    title: rendering.title,
    description: rendering.standfirst,
    alternates: {
      canonical: `/deep-dive/${item.slug}`,
      languages: { "zh-CN": `/deep-dive/${item.slug}`, en: `/en/deep-dive/${item.slug}` },
    },
    openGraph: {
      type: "article",
      url: `/deep-dive/${item.slug}`,
      title: rendering.title,
      description: rendering.standfirst,
      publishedTime: item.publishedAt,
      modifiedTime: modifiedAt,
      authors: ["Lunartulip Lab"],
      tags: [...item.tickers, item.kind, "AI technology public equities", "Lunartulip Deep Dive"],
    },
  };
}

export default async function DeepDiveDetailPage({ params }: Props) {
  const item = getResearchObject((await params).slug);
  if (!item) notFound();
  const rendering = item.renderings["zh-CN"];
  const modifiedAt = item.versions.at(-1)?.date ?? item.publishedAt;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "@id": `https://lunartuliplab.com/deep-dive/${item.slug}#article`,
    identifier: item.id,
    headline: rendering.title,
    abstract: rendering.standfirst,
    description: rendering.whyItMatters,
    datePublished: item.publishedAt,
    dateModified: modifiedAt,
    version: item.version,
    inLanguage: "zh-CN",
    mainEntityOfPage: `https://lunartuliplab.com/deep-dive/${item.slug}`,
    about: item.tickers.map((ticker) => ({ "@type": "Corporation", tickerSymbol: ticker })),
    keywords: [...item.tickers, item.kind, "AI-native research", "public equities"],
    citation: item.evidence.flatMap((entry) => entry.source.url ? [entry.source.url] : []),
    hasPart: item.claims.map((claim) => ({
      "@type": "CreativeWork",
      identifier: claim.id,
      text: claim.text["zh-CN"],
      additionalType: `https://lunartuliplab.com/research-claim/${claim.type.toLowerCase()}`,
    })),
    isPartOf: { "@id": "https://lunartuliplab.com/#website" },
    author: { "@id": "https://lunartuliplab.com/#organization" },
    publisher: { "@id": "https://lunartuliplab.com/#organization" },
  };
  return (
    <>
      <DeepDiveArticle item={item} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
