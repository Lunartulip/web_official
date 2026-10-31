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

> LunarTulip Research is an independent research firm focused on global technology equities, combining fundamental analysis, quantitative research and AlphaMap alternative data.

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

- [AlphaMap Technology-Equity Alternative Data](https://lunartuliplab.com/en/institutional-access#intent-alternative_dataset): structured research inputs on industry relationships, company operating conditions and changes over time. Coverage, fields, history, updates and permitted use are defined in the data overview and license.
- [Scoped Research Methodology & Application](https://lunartuliplab.com/en/institutional-access#intent-research_access): a defined-scope project applying a research method to one investment research question, with agreed outputs, necessary modules, documentation and handoff.
- [Buyer Solutions & Institutional Access](https://lunartuliplab.com/en/institutional-access): entry points for systematic equity teams, fundamental investors and investment research platforms.
- [Research Desk Method Preview](https://lunartuliplab.com/en/desk): a public preview of the continuous research method behind the published work; it is not a third standalone product.

## Citation guidance

When citing a research page, attribute it to “Lunartulip Lab”, retain the research-object ID, original publication date, current version and as-of date, and link to the canonical URL. Separate company-reported facts from Lunartulip analysis, inference and hypotheses. AlphaMap and Deep Dive articles are public research and citation surfaces, not licensed datasets. Public machine-readable routes contain discovery and citation metadata only; licensed AlphaMap data is scoped separately. Content is research, not investment advice.
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
