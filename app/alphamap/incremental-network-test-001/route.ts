import { editorialAlphaMapResponse, readEditorialAlphaMap } from "@/lib/editorial-alphamap";

export const dynamic = "force-static";

export async function GET() {
  return editorialAlphaMapResponse(await readEditorialAlphaMap("incremental-network-test-001", "zh"));
}
