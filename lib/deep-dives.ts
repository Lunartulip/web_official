import { researchObjects } from "./research-objects";

export type DeepDive = {
  slug: string;
  tickers: string[];
  publishedAt: string;
  version: string;
  source: string;
  titleCn: string;
  titleEn: string;
  questionCn: string;
  questionEn: string;
  thesisCn: string;
  thesisEn: string;
  standfirstCn: string;
  standfirstEn: string;
  whyItMattersCn: string;
  whyItMattersEn: string;
  consensusCn: string;
  consensusEn: string;
  differentiatedCn: string;
  differentiatedEn: string;
  evidenceCn: string[];
  evidenceEn: string[];
  causalChain: Array<{
    titleCn: string;
    titleEn: string;
    bodyCn: string;
    bodyEn: string;
  }>;
  valuationCn: string;
  valuationEn: string;
  forwardTests: Array<{
    titleCn: string;
    titleEn: string;
    bodyCn: string;
    bodyEn: string;
  }>;
  risksCn: string[];
  risksEn: string[];
  updateCn: string;
  updateEn: string;
};

function projectDeepDive(object: (typeof researchObjects)[number]): DeepDive {
  const zh = object.renderings["zh-CN"];
  const en = object.renderings.en;
  const claims = new Map(object.claims.map((claim) => [claim.id, claim]));
  const evidenceClaims = zh.evidenceClaimIds.map((id) => claims.get(id)).filter((claim) => claim !== undefined);
  const riskClaims = zh.riskClaimIds.map((id) => claims.get(id)).filter((claim) => claim !== undefined);
  const tests = new Map(object.falsifiers.map((test) => [test.id, test]));

  return {
    slug: object.slug,
    tickers: object.tickers,
    publishedAt: object.asOf,
    version: object.version,
    source: object.sourceLabel,
    titleCn: zh.title,
    titleEn: en.title,
    questionCn: zh.question,
    questionEn: en.question,
    thesisCn: zh.differentiated,
    thesisEn: en.differentiated,
    standfirstCn: zh.standfirst,
    standfirstEn: en.standfirst,
    whyItMattersCn: zh.whyItMatters,
    whyItMattersEn: en.whyItMatters,
    consensusCn: zh.consensus,
    consensusEn: en.consensus,
    differentiatedCn: zh.differentiated,
    differentiatedEn: en.differentiated,
    evidenceCn: evidenceClaims.map((claim) => claim.text["zh-CN"]),
    evidenceEn: evidenceClaims.map((claim) => claim.text.en),
    causalChain: zh.causalChain.map((step, index) => ({
      titleCn: step.title,
      titleEn: en.causalChain[index]?.title ?? step.title,
      bodyCn: step.body,
      bodyEn: en.causalChain[index]?.body ?? step.body,
    })),
    valuationCn: zh.valuation,
    valuationEn: en.valuation,
    forwardTests: zh.forwardTestIds.map((id, index) => {
      const test = tests.get(id);
      const enTest = tests.get(en.forwardTestIds[index] ?? id);
      return {
        titleCn: test?.metric ?? id,
        titleEn: enTest?.metric ?? test?.metric ?? id,
        bodyCn: test?.rationale["zh-CN"] ?? "",
        bodyEn: enTest?.rationale.en ?? test?.rationale.en ?? "",
      };
    }),
    risksCn: riskClaims.map((claim) => claim.text["zh-CN"]),
    risksEn: riskClaims.map((claim) => claim.text.en),
    updateCn: zh.update,
    updateEn: en.update,
  };
}

export const deepDives: DeepDive[] = researchObjects
  .filter((object) => object.kind === "company-deep-dive" || object.kind === "theme-study")
  .map(projectDeepDive);

export function getDeepDive(slug: string) {
  return deepDives.find((item) => item.slug === slug);
}
