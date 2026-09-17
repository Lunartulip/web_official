import { editorialAlphaMapResponse, readEditorialAlphaMap } from "@/lib/editorial-alphamap";

export const dynamic = "force-static";

export async function GET() {
  return editorialAlphaMapResponse(await readEditorialAlphaMap("the-projection-is-part-of-the-signal-001", "zh"));
}
