import type { Metadata } from "next";
import ledger from "@/data/authority/calls_kpi_summary.json";
import AuthorityLedger from "../../authority-ledger/authority-ledger";

export const metadata: Metadata = {
  title: "Authority Ledger | Aggregate Research Outcomes",
  description: "Aggregate, timestamped outcomes from the Lunartulip calls ledger, with reconstructed and ex-ante discipline cohorts kept separate.",
  alternates: {
    canonical: "/en/authority-ledger",
    languages: { "zh-CN": "/authority-ledger", en: "/en/authority-ledger" },
  },
};

export default function EnglishAuthorityLedgerPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Lunartulip Aggregate Calls Outcome Ledger",
    description: "Aggregate outcome statistics for timestamped public-equity research calls, with reconstructed and ex-ante discipline cohorts kept separate.",
    url: "https://lunartuliplab.com/en/authority-ledger",
    dateModified: ledger.generated_at,
    temporalCoverage: `${ledger.first_call_date}/${ledger.as_of}`,
    creator: { "@id": "https://lunartuliplab.com/#organization" },
    measurementTechnique: "Directional hit rate with ±5% threshold; expired-flat excluded from the denominator; invalidated observations excluded.",
    inLanguage: "en",
  };

  return (
    <>
      <AuthorityLedger language="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
