import catalog from "@/content/research-objects/catalog.json";
import type { ResearchObject } from "./types";

export type {
  Claim,
  ClaimType,
  Evidence,
  EvidenceRole,
  FinancialBridgeRow,
  LocaleRendering,
  LocalizedText,
  QuantitativeFalsifier,
  ResearchLocale,
  ResearchObject,
  ResearchObjectKind,
  ValuationScenario,
  VersionEntry,
} from "./types";

export const researchObjects = catalog as unknown as readonly ResearchObject[];

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
