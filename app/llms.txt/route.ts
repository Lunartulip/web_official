import { researchObjects } from "@/lib/research-objects";

export const dynamic = "force-static";

export async function GET() {
  const researchLine = (item: (typeof researchObjects)[number], collection: "alphamap" | "deep-dive") => {
    const modified = item.versions.at(-1)?.date ?? item.publishedAt;
    const doi = item.doi ? `; DOI ${item.doi}` : "";
    const title = collection === "alphamap"
      ? `${item.sourceLabel.split(" · ")[0]}: ${item.renderings.en.title}`
      : item.renderings.en.title;
    return `- [${title}](https://lunartuliplab.com/en/${collection}/${item.slug}) — ${item.tickers.join(", ")}; published ${item.publishedAt}; updated ${modified}; object ${item.id}; version ${item.version}${doi}; [public citation metadata](https://lunartuliplab.com/research/${item.slug})`;
  };
  const alphaMapResearch = researchObjects
    .filter((item) => String(item.kind) === "alphamap-study")
    .map((item) => researchLine(item, "alphamap"))
    .join("\n");
  const deepDiveResearch = researchObjects
    .filter((item) => String(item.kind) !== "alphamap-study")
    .map((item) => {
      return researchLine(item, "deep-dive");
    })
    .join("\n");

  const body = `# LunarTulip Research

> LunarTulip Research builds independent research models, alternative datasets and investment strategies for global technology equities.

Official canonical domain: https://lunartuliplab.com/
Alternate spelling: LunarTulip Lab
Publisher entity: https://lunartuliplab.com/#organization

## Canonical research

- [Bilingual Deep Dive archive](https://lunartuliplab.com/en/deep-dive)
- [Bilingual AlphaMap archive](https://lunartuliplab.com/en/alphamap)
- [Public citation-metadata manifest](https://lunartuliplab.com/research.json)
- [Detailed public citation guide](https://lunartuliplab.com/llms-full.txt)
- [Research citation and use terms](https://lunartuliplab.com/research-usage)
- [Calls & Outcomes / Authority Ledger](https://lunartuliplab.com/en/authority-ledger)

### AlphaMap

- [AlphaMap Whitepaper #000 — From Fundamental Judgment to Quantitative Strategy](https://lunartuliplab.com/alphamap/finllm-kg-to-tradable-quant-factors-000): Chinese-language prologue on turning FinLLM-KG (large-model financial knowledge graphs) into tradable quantitative factors for medium- and low-frequency global technology-equity growth and rotation strategies. It focuses on economic graph semantics, time and state transitions, and Alpha Mechanics rather than entity-triple extraction alone.

${alphaMapResearch}

### Deep Dive

${deepDiveResearch}

## Products and services

- [Research Models](https://lunartuliplab.com/en/institutional-access#intent-research_model_sample): ongoing variables, scenarios, judgment and revisions around a defined investment question. [Deep Dive](https://lunartuliplab.com/en/deep-dive) is the public evidence layer; [Research Desk](https://lunartuliplab.com/en/desk) is the human-readable showroom and continuous delivery surface.
- [AlphaMap Alternative Data](https://lunartuliplab.com/en/institutional-access#intent-alternative_dataset): callable point-in-time industry relationships, company operating states, evidence and alternative features. Coverage, fields, history, updates and permitted use are defined in the license.
- [LunarTulip Strategies](https://lunartuliplab.com/en/strategy): model portfolios and institutional strategy collaboration grounded in validated signals, risk budgets, out-of-sample evidence and PnL attribution.
- Delivery layers: Desk and dashboards for human use; API, CSV and JSON for programmatic use; MCP and skills for agentic use. Delivery rights are scoped within the product agreement and do not form a fourth top-level product.
- [Institutional Access](https://lunartuliplab.com/en/institutional-access): structured inquiry routes for all three products.

## Citation guidance

When citing a research page, attribute it to “Lunartulip Lab”, retain the research-object ID, original publication date, current version and as-of date, and link to the canonical URL. Separate company-reported facts from Lunartulip analysis, inference and hypotheses. AlphaMap and Deep Dive articles are public research and citation surfaces, not licensed datasets. Public machine-readable routes contain discovery and citation metadata only. Research Models, AlphaMap Data and Strategy share point-in-time, evidence-linked research state, while product rights and delivery layers are scoped separately. No public page or standard license grants the complete internal system. Content is research, not investment advice.
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
