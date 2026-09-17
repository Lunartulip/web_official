import catalog from "@/content/research-objects/catalog.json";
import type { ResearchObject } from "./types";

export type {
  AlphaMapArtifact,
  AlphaMapDiagnostic,
  AlphaMapLimitation,
  AlphaMapLocaleRendering,
  AlphaMapSample,
  AlphaMapStudy,
  AlphaMapStudyDesign,
  Claim,
  ClaimType,
  Evidence,
  EvidenceRole,
  DeepDiveLocaleRendering,
  DeepDiveResearchObject,
  FinancialBridgeRow,
  LocaleRendering,
  LocalizedText,
  QuantitativeFalsifier,
  ResearchLocale,
  ResearchObject,
  ResearchObjectKind,
  TemporalAnchor,
  ValuationScenario,
  VersionEntry,
} from "./types";

export const researchObjects = catalog as unknown as readonly ResearchObject[];
export const deepDiveResearchObjects = researchObjects.filter(
  (object): object is Extract<ResearchObject, { kind: "company-deep-dive" | "theme-study" | "methodology" }> =>
    object.kind !== "alphamap-study",
);
export const alphaMapStudies = researchObjects.filter(
  (object): object is Extract<ResearchObject, { kind: "alphamap-study" }> => object.kind === "alphamap-study",
);

const byId = new Map(researchObjects.map((object) => [object.id, object]));
const bySlug = new Map(researchObjects.map((object) => [object.slug, object]));

export function getResearchObject(idOrSlug: string) {
  return byId.get(idOrSlug as ResearchObject["id"]) ?? bySlug.get(idOrSlug);
}

export function getResearchObjectsByKind(kind: ResearchObject["kind"]) {
  return researchObjects.filter((object) => object.kind === kind);
}

export function getResearchObjectRendering(idOrSlug: string, locale: "zh-CN" | "en") {
  return getResearchObject(idOrSlug)?.renderings[locale];
}
