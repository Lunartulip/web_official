import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { deepDives, getDeepDive } from "@/lib/deep-dives";
import DeepDiveArticle from "../../../deep-dive/deep-dive-article";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return deepDives.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getDeepDive((await params).slug);
  if (!item) return {};
  return {
    title: item.titleEn,
    description: item.thesisEn,
    alternates: {
      canonical: `/en/deep-dive/${item.slug}`,
      languages: { "zh-CN": `/deep-dive/${item.slug}`, en: `/en/deep-dive/${item.slug}` },
    },
    openGraph: {
      type: "article",
      url: `/en/deep-dive/${item.slug}`,
      title: item.titleEn,
      description: item.thesisEn,
      publishedTime: item.publishedAt,
      modifiedTime: "2026-08-08",
      authors: ["Lunartulip Lab"],
      tags: [...item.tickers, "AI technology public equities", "Lunartulip Deep Dive"],
    },
  };
}

export default async function EnglishDeepDiveDetailPage({ params }: Props) {
  const item = getDeepDive((await params).slug);
  if (!item) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: item.titleEn,
    description: item.thesisEn,
    datePublished: item.publishedAt,
    dateModified: "2026-08-08",
    version: item.version,
    inLanguage: "en",
    mainEntityOfPage: `https://lunartuliplab.com/en/deep-dive/${item.slug}`,
    about: item.tickers.map((ticker) => ({ "@type": "Corporation", tickerSymbol: ticker })),
    author: { "@id": "https://lunartuliplab.com/#organization" },
    publisher: { "@id": "https://lunartuliplab.com/#organization" },
  };
  return (
    <>
      <DeepDiveArticle item={item} language="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
