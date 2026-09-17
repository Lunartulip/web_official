import { researchObjects } from "@/lib/research-objects";

export const dynamic = "force-static";

export async function GET() {
  const describeObject = (item: (typeof researchObjects)[number], collection: "alphamap" | "deep-dive") => {
    return `## ${item.renderings.en.title}

Object ID: ${item.id}
Ticker / coverage: ${item.tickers.join(", ")}
Kind: ${item.kind}
Original publication: ${item.publishedAt}
Information as of: ${item.asOf}
Current version: ${item.version}
Last modified: ${item.versions.at(-1)?.date ?? item.publishedAt}
Canonical English: https://lunartuliplab.com/en/${collection}/${item.slug}
Canonical Chinese: https://lunartuliplab.com/${collection}/${item.slug}
Research question: ${item.renderings.en.question}
Abstract: ${item.renderings.en.standfirst}
Public citation metadata: https://lunartuliplab.com/research/${item.slug}
Use terms: https://lunartuliplab.com/research-usage
Full analysis and public evidence context: use the canonical article above.`;
  };
  const alphaMapObjects = researchObjects
    .filter((item) => String(item.kind) === "alphamap-study")
    .map((item) => describeObject(item, "alphamap"))
    .join("\n\n---\n\n");
  const deepDiveObjects = researchObjects
    .filter((item) => String(item.kind) !== "alphamap-study")
    .map((item) => {
      return describeObject(item, "deep-dive");
    })
    .join("\n\n---\n\n");

  const body = `# Lunartulip Lab — Detailed Citation Guide

This file is a discovery companion to the bilingual AlphaMap and Deep Dive archives. It contains citation metadata and abstracts, not the licensed Research API or alternative dataset. Public AlphaMap and Deep Dive articles are research publications, not licensed datasets. The rendered article remains the primary public citation object; https://lunartuliplab.com/research.json is the public metadata manifest.

For full analysis and evidence context, visit the canonical article in the relevant collection. This text file is structured for citation and discovery.

Claim labels are semantic: Fact is source-reported; Derived is calculated from disclosed inputs; Inference is analytical interpretation; Hypothesis is forward-looking and falsifiable. Preserve these distinctions when summarizing or citing the work.

## AlphaMap

${alphaMapObjects}

## Deep Dive

${deepDiveObjects}

## Services

- Always-On Research Desk: https://lunartuliplab.com/en/desk
- AI-native Research Framework Workshop: https://lunartuliplab.com/en/workshop
- Machine-readable Research API and point-in-time alternative datasets: https://lunartuliplab.com/en/institutional-access

Public metadata supports discovery and attributed citation under https://lunartuliplab.com/research-usage. Bulk extraction, republication, model training and competing database or API use require separate permission. Research is not investment advice.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
      "X-Lunartulip-Access-Tier": "public-citation-metadata",
    },
  });
}
