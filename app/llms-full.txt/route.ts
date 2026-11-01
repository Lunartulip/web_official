import { researchObjects } from "@/lib/research-objects";

export const dynamic = "force-static";

export async function GET() {
  const describeObject = (item: (typeof researchObjects)[number], collection: "alphamap" | "deep-dive") => {
    return `## ${item.renderings.en.title}

Object ID: ${item.id}
${collection === "alphamap" ? `Series label: ${item.sourceLabel.split(" · ")[0]}\n` : ""}Ticker / coverage: ${item.tickers.join(", ")}
Kind: ${item.kind}
Original publication: ${item.publishedAt}
Information as of: ${item.asOf}
Current version: ${item.version}
Last modified: ${item.versions.at(-1)?.date ?? item.publishedAt}
${item.doi ? `DOI: https://doi.org/${item.doi}\n` : ""}Canonical English: https://lunartuliplab.com/en/${collection}/${item.slug}
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

This file is a discovery companion to the bilingual AlphaMap and Deep Dive archives. It contains citation metadata and abstracts, not licensed AlphaMap data. Public AlphaMap and Deep Dive articles are research publications, not licensed datasets. The rendered article remains the primary public citation object; https://lunartuliplab.com/research.json is the public metadata manifest.

For full analysis and evidence context, visit the canonical article in the relevant collection. This text file is structured for citation and discovery.

Claim labels are semantic: Fact is source-reported; Derived is calculated from disclosed inputs; Inference is analytical interpretation; Hypothesis is forward-looking and falsifiable. Preserve these distinctions when summarizing or citing the work.

## AlphaMap

### AlphaMap Whitepaper #000 — From Fundamental Judgment to Quantitative Strategy

Canonical Chinese: https://lunartuliplab.com/alphamap/finllm-kg-to-tradable-quant-factors-000
Series: AlphaMap Whitepaper Series
Position: Prologue 000
Published: 2026-10-31
Focus: Turning FinLLM-KG (large-model financial knowledge graphs) into tradable quantitative factors for medium- and low-frequency global technology-equity growth and rotation strategies.
Research distinction: The central problem is not entity-triple extraction alone. It is the graph's economic meaning, the modeling of time and state transitions, and the Alpha Mechanics that connect graph structure to excess-return generation.

${alphaMapObjects}

## Deep Dive

${deepDiveObjects}

## Institutional products and engagements

- AlphaMap Technology-Equity Alternative Data — the current go-to-market spearhead, licensed by defined coverage, fields, history, updates and use: https://lunartuliplab.com/en/institutional-access#intent-alternative_dataset
- Research Desk / Pro — the B2P continuous-research product line for PMs, CIOs, fund founders and professional investors. It follows AlphaMap in the launch sequence and may include theme-first Decision Objects, maintained coverage, structured exports and a limited API within the agreed scope: https://lunartuliplab.com/en/desk
- Research API / Power — a machine-delivery surface of the same canonical research state. Some licensed AlphaMap delivery may use Desk APIs. Higher limits, bulk history and event streams remain demand-led roadmap surfaces: https://lunartuliplab.com/en/institutional-access#intent-machine_readable_research
- Scoped Research Methodology & Application — one defined investment research question with agreed outputs and handoff: https://lunartuliplab.com/en/institutional-access#intent-research_access
- Buyer Solutions & Institutional Access — for systematic equity teams, fundamental investors and investment research platforms: https://lunartuliplab.com/en/institutional-access

Public metadata supports discovery and attributed citation under https://lunartuliplab.com/research-usage. Public research is not licensed Desk or API access, and no public page or standard license grants the complete internal system. Bulk extraction, republication, model training and competing database or API use require separate permission. Research is not investment advice.
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
