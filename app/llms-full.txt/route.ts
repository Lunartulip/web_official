import { researchObjects } from "@/lib/research-objects";

export const dynamic = "force-static";

export async function GET() {
  const objects = researchObjects
    .map((item) => {
      const claims = item.claims
        .map((claim) => `- ${claim.id} [${claim.type}]: ${claim.text.en} Evidence: ${claim.evidenceIds.join(", ") || "none"}.`)
        .join("\n");
      const evidence = item.evidence
        .map((entry) => `- ${entry.id}: ${entry.title}. ${entry.source.publisher}. ${entry.sourceDate}. ${entry.source.url ?? entry.source.document ?? "No public URL recorded."}`)
        .join("\n");
      const falsifiers = item.falsifiers
        .map((entry) => `- ${entry.id}: ${entry.metric} ${entry.operator} ${entry.threshold} ${entry.unit}; horizon ${entry.horizon}. ${entry.rationale.en}`)
        .join("\n");

      return `## ${item.renderings.en.title}

Object ID: ${item.id}
Ticker / coverage: ${item.tickers.join(", ")}
Kind: ${item.kind}
Original publication: ${item.publishedAt}
Information as of: ${item.asOf}
Current version: ${item.version}
Last modified: ${item.versions.at(-1)?.date ?? item.publishedAt}
Canonical English: https://lunartuliplab.com/en/deep-dive/${item.slug}
Canonical Chinese: https://lunartuliplab.com/deep-dive/${item.slug}
Research question: ${item.renderings.en.question}
Abstract: ${item.renderings.en.standfirst}
Consensus view: ${item.renderings.en.consensus}
Lunartulip view: ${item.renderings.en.differentiated}
Valuation framing: ${item.renderings.en.valuation}

Claims:
${claims}

Evidence:
${evidence}

Forward falsifiers:
${falsifiers || "- See the canonical article for its validation calendar."}`;
    })
    .join("\n\n---\n\n");

  const body = `# Lunartulip Lab — Full Research Guide

This file is a machine-oriented companion to the bilingual canonical research archive. The rendered article remains the primary human-readable citation object; https://lunartuliplab.com/research.json is the structured public manifest.

Claim labels are semantic: Fact is source-reported; Derived is calculated from disclosed inputs; Inference is analytical interpretation; Hypothesis is forward-looking and falsifiable. Preserve these distinctions when summarizing or citing the work.

${objects}

## Services

- Always-On Research Desk: https://lunartuliplab.com/en/desk
- AI-native Research Framework Workshop: https://lunartuliplab.com/en/workshop
- Machine-readable Research API and point-in-time alternative datasets: https://lunartuliplab.com/en/institutional-access

Public metadata supports discovery and citation but does not grant a commercial data license. Research is not investment advice.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
