export const researchObjectKinds = [
  "company-deep-dive",
  "theme-study",
  "methodology",
  "alphamap-study",
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
  displayValue?: LocalizedText;
  evidenceIds: `EV-${string}`[];
}

export interface ValuationMetric {
  label: LocalizedText;
  value: LocalizedText;
}

export interface ValuationScenario {
  id: string;
  label: LocalizedText;
  revenueBaseUsdM?: number;
  revenueGrowthPct?: number;
  forwardRevenueUsdM?: number;
  salesMultiple?: number;
  impliedEnterpriseValueUsdM?: number;
  metrics?: ValuationMetric[];
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

export interface DeepDiveLocaleRendering {
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
  narrativeSections?: Array<{ id: string; title: string; body: string }>;
  riskClaimIds: `CL-${string}`[];
  forwardTestIds: string[];
}

export interface AlphaMapLocaleRendering {
  locale: ResearchLocale;
  siblingLocale: ResearchLocale;
  title: string;
  question: string;
  standfirst: string;
  whyItMatters: string;
  methodology: string;
  findings: string;
  limitations: string;
  update: string;
  evidenceClaimIds: `CL-${string}`[];
  riskClaimIds: `CL-${string}`[];
}

export type LocaleRendering = DeepDiveLocaleRendering | AlphaMapLocaleRendering;

export interface VersionEntry {
  version: string;
  date: string;
  diff: LocalizedText;
}

interface ResearchObjectIdentity {
  id: `RO-${string}`;
  slug: string;
  tickers: string[];
  publishedAt: string;
  asOf: string;
  version: string;
  sourceLabel: string;
  claims: Claim[];
  evidence: Evidence[];
  versions: VersionEntry[];
}

export interface DeepDiveResearchObject extends ResearchObjectIdentity {
  kind: "company-deep-dive" | "theme-study" | "methodology";
  financialBridge: FinancialBridgeRow[];
  valuationScenarios: ValuationScenario[];
  counterevidenceClaimIds: `CL-${string}`[];
  falsifiers: QuantitativeFalsifier[];
  renderings: Record<ResearchLocale, DeepDiveLocaleRendering>;
  dataGaps: LocalizedText[];
}

export interface TemporalAnchor {
  id: string;
  type: "graph-vintage" | "return-window" | "price-retrieval";
  date?: string;
  startDate?: string;
  endDate?: string;
  retrospective: boolean;
  description: LocalizedText;
}

export interface AlphaMapStudyDesign {
  design: "retrospective-post-outcome";
  objective: LocalizedText;
  projection: LocalizedText;
  outcome: LocalizedText;
}

export interface AlphaMapSample {
  graphIssuers: number;
  pricedStocks: number;
  historicalGraphVintages: number;
  inclusion: LocalizedText;
}

export interface AlphaMapDiagnostic {
  id: string;
  metric: string;
  value: number;
  unit: "percent" | "count" | "ratio";
  scope: LocalizedText;
  interpretation: LocalizedText;
  evidenceIds: `EV-${string}`[];
  claimIds: `CL-${string}`[];
}

export interface AlphaMapLimitation {
  id: string;
  text: LocalizedText;
  claimIds: `CL-${string}`[];
}

export interface AlphaMapArtifact {
  id: string;
  label: LocalizedText;
  mediaType: string;
  url: string;
  evidenceIds: `EV-${string}`[];
}

export interface AlphaMapStudy extends ResearchObjectIdentity {
  kind: "alphamap-study";
  renderings: Record<ResearchLocale, AlphaMapLocaleRendering>;
  temporalAnchors: TemporalAnchor[];
  studyDesign: AlphaMapStudyDesign;
  sample: AlphaMapSample;
  diagnostics: AlphaMapDiagnostic[];
  limitations: AlphaMapLimitation[];
  artifacts: AlphaMapArtifact[];
}

export type ResearchObject = DeepDiveResearchObject | AlphaMapStudy;
