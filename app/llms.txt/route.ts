import { researchObjects } from "@/lib/research-objects";

export const dynamic = "force-static";

export async function GET() {
  const researchLine = (item: (typeof researchObjects)[number], collection: "alphamap" | "deep-dive") => {
    const modified = item.versions.at(-1)?.date ?? item.publishedAt;
    return `- [${item.renderings.en.title}](https://lunartuliplab.com/en/${collection}/${item.slug}) — ${item.tickers.join(", ")}; published ${item.publishedAt}; updated ${modified}; object ${item.id}; version ${item.version}; [public citation metadata](https://lunartuliplab.com/research/${item.slug})`;
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

  const body = `# Lunartulip Lab

> Lunartulip Lab is an AI-native independent public-equities research organization covering global AI technology markets through discretionary fundamental and systematic quantitative research.

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

${alphaMapResearch}

### Deep Dive

${deepDiveResearch}

## Products and services

- [Always-On Research Desk](https://lunartuliplab.com/en/desk): continuously updated human-readable research for professional investors and institutions.
- [AI-native Research Framework Workshop](https://lunartuliplab.com/en/workshop): six working sessions for buy-side research-system diagnosis and design.
- [Professional and Institutional Access](https://lunartuliplab.com/en/institutional-access): machine-readable Research API, point-in-time alternative datasets, scoped mandates and research access.

## Citation guidance

When citing a research page, attribute it to “Lunartulip Lab”, retain the research-object ID, original publication date, current version and as-of date, and link to the canonical URL. Separate company-reported facts from Lunartulip analysis, inference and hypotheses. AlphaMap and Deep Dive articles are public research and citation surfaces, not licensed datasets. Public machine-readable routes contain discovery and citation metadata only; full structured data requires licensed access. Content is research, not investment advice.
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
