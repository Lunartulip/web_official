import { editorialAlphaMapResponse, readEditorialAlphaMap } from "@/lib/editorial-alphamap";

export const dynamic = "force-static";

export async function GET() {
  return editorialAlphaMapResponse(
    await readEditorialAlphaMap("finllm-kg-to-tradable-quant-factors-000", "zh"),
  );
}
