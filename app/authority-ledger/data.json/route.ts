import authoritySummary from "@/data/authority/calls_kpi_summary.json";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "@id": "https://lunartuliplab.com/authority-ledger/data.json#dataset",
      name: "Lunartulip Calls & Outcomes Ledger — Aggregate KPI Snapshot",
      publisher: {
        "@type": "Organization",
        "@id": "https://lunartuliplab.com/#organization",
        name: "Lunartulip Lab",
      },
      dateModified: authoritySummary.generated_at,
      temporalCoverage: `..${authoritySummary.as_of}`,
      usageNotice: "Aggregate public methodology snapshot; not investment advice and not a record of client portfolios.",
      data: authoritySummary,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    },
  );
}
