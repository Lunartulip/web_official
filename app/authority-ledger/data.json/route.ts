import authoritySummary from "@/data/authority/calls_kpi_summary.json";
import {
  publicResearchCreator,
  publicResearchLicense,
  RESEARCH_USAGE_URL,
} from "@/lib/public-research";

export const dynamic = "force-static";

const publicAuthoritySummary = {
  ...authoritySummary,
  source: "Lunartulip Calls Ledger — public aggregate projection",
};

export async function GET() {
  return Response.json(
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "@id": "https://lunartuliplab.com/authority-ledger/data.json#dataset",
      name: "Lunartulip Calls & Outcomes Ledger — Aggregate KPI Snapshot",
      description: "Aggregate methodology and KPI snapshot for timestamped Lunartulip public-equity research calls. It contains summary outcomes, cohort boundaries and evidence-link coverage, not client portfolios or the licensed alternative dataset.",
      creator: publicResearchCreator,
      publisher: publicResearchCreator,
      license: publicResearchLicense,
      usageInfo: RESEARCH_USAGE_URL,
      isAccessibleForFree: true,
      dateModified: authoritySummary.generated_at,
      temporalCoverage: `..${authoritySummary.as_of}`,
      url: "https://lunartuliplab.com/authority-ledger/data.json",
      measurementTechnique: "Directional hit rate with a ±5% threshold. expired_flat is excluded from the denominator; invalidated observations are excluded; avoid and trim directions are inverted.",
      distribution: {
        "@type": "DataDownload",
        name: "Lunartulip Authority Ledger public aggregate snapshot",
        description: "Public aggregate KPI and cohort snapshot without call-level records, client data or internal workspace paths.",
        encodingFormat: "application/json",
        contentUrl: "https://lunartuliplab.com/authority-ledger/data.json",
        license: publicResearchLicense,
      },
      usageNotice: "Aggregate public methodology snapshot; not investment advice and not a record of client portfolios.",
      data: publicAuthoritySummary,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "X-Content-Type-Options": "nosniff",
        "X-Lunartulip-Access-Tier": "public-aggregate-proof",
      },
    },
  );
}
