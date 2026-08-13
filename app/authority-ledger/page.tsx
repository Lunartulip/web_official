import type { Metadata } from "next";
import ledger from "@/data/authority/calls_kpi_summary.json";
import AuthorityLedger from "./authority-ledger";

export const metadata: Metadata = {
  title: "Authority Ledger｜判断命中率与更正记录",
  description: "Lunartulip Lab 聚合判断账本：回溯期与纪律期分列，公开方向性命中率、双基准、样本口径、as-of 日期与版本来源。",
  alternates: {
    canonical: "/authority-ledger",
    languages: { "zh-CN": "/authority-ledger", en: "/en/authority-ledger" },
  },
  openGraph: {
    type: "website",
    url: "/authority-ledger",
    title: "Lunartulip Authority Ledger",
    description: "Aggregate, timestamped and methodology-disclosed outcomes from the canonical calls ledger.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Authority Ledger" }],
  },
};

export default function AuthorityLedgerPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Lunartulip Aggregate Calls Outcome Ledger",
    description: "Aggregate outcome statistics for timestamped public-equity research calls, with reconstructed and ex-ante discipline cohorts kept separate.",
    url: "https://lunartuliplab.com/authority-ledger",
    dateModified: ledger.generated_at,
    temporalCoverage: `${ledger.first_call_date}/${ledger.as_of}`,
    creator: { "@id": "https://lunartuliplab.com/#organization" },
    measurementTechnique: "Directional hit rate with ±5% threshold; expired-flat excluded from the denominator; invalidated observations excluded.",
  };
  return (
    <>
      <AuthorityLedger />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
