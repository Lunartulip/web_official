export const researchObjectKinds = [
  "company-deep-dive",
  "theme-study",
  "methodology",
] as const;

export type ResearchObjectKind = (typeof researchObjectKinds)[number];
export type ResearchLocale = "zh-CN" | "en";
export type ClaimType = "Fact" | "Derived" | "Inference" | "Hypothesis";
export type EvidenceRole = "primary" | "supporting";
export type Confidence = "high" | "medium" | "low";

export type LocalizedText = Record<ResearchLocale, string>;

export interface Claim {
  id: `CL-${string}`;
  type: ClaimType;
  text: LocalizedText;
  evidenceIds: `EV-${string}`[];
}

export interface Evidence {
  id: `EV-${string}`;
  title: string;
  source: {
    publisher: string;
    url?: string;
    document?: string;
  };
  sourceDate: string;
  dataAsOf: string;
  calculation: string | null;
  confidence: Confidence;
  counterevidence: string | null;
  lastVerified: string;
  role: EvidenceRole;
}

export interface FinancialBridgeRow {
  label: LocalizedText;
  period: string;
  value: number;
  unit: "USDm" | "percent" | "count";
  evidenceIds: `EV-${string}`[];
}

export interface ValuationScenario {
  id: string;
  label: LocalizedText;
  revenueBaseUsdM: number;
  revenueGrowthPct: number;
  forwardRevenueUsdM: number;
  salesMultiple: number;
  impliedEnterpriseValueUsdM: number;
  calculation: string;
  interpretation: LocalizedText;
}

export interface QuantitativeFalsifier {
  id: string;
  metric: string;
  operator: "<" | "<=" | ">" | ">=";
  threshold: number;
  unit: "percent" | "USDm" | "count" | "multiple";
  horizon: string;
  claimIds: `CL-${string}`[];
  rationale: LocalizedText;
}

export interface LocaleRendering {
  locale: ResearchLocale;
  siblingLocale: ResearchLocale;
  title: string;
  question: string;
  standfirst: string;
  whyItMatters: string;
  consensus: string;
  differentiated: string;
  valuation: string;
  update: string;
  evidenceClaimIds: `CL-${string}`[];
  causalChain: Array<{ title: string; body: string; claimIds: `CL-${string}`[] }>;
  riskClaimIds: `CL-${string}`[];
  forwardTestIds: string[];
}

export interface VersionEntry {
  version: string;
  date: string;
  diff: LocalizedText;
}

export interface ResearchObject {
  id: `RO-${string}`;
  slug: string;
  kind: ResearchObjectKind;
  tickers: string[];
  publishedAt: string;
  asOf: string;
  version: string;
  sourceLabel: string;
  claims: Claim[];
  evidence: Evidence[];
  financialBridge: FinancialBridgeRow[];
  valuationScenarios: ValuationScenario[];
  counterevidenceClaimIds: `CL-${string}`[];
  falsifiers: QuantitativeFalsifier[];
  versions: VersionEntry[];
  renderings: Record<ResearchLocale, LocaleRendering>;
  dataGaps: LocalizedText[];
}
