import { editorialAlphaMapResponse, readEditorialAlphaMap } from "@/lib/editorial-alphamap";

export const dynamic = "force-static";

export async function GET() {
  return editorialAlphaMapResponse(await readEditorialAlphaMap("ai-infrastructure-cash-flow-first-case-2026-11", "en"));
}
