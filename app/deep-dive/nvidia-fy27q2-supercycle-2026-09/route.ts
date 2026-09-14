import { editorialDeepDiveResponse, readEditorialDeepDive } from "@/lib/editorial-deep-dives";

export const dynamic = "force-static";

export async function GET() {
  return editorialDeepDiveResponse(await readEditorialDeepDive("nvidia-fy27q2-supercycle-2026-09", "zh"));
}
