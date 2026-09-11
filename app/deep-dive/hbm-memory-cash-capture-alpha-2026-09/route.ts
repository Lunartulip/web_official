import { editorialDeepDiveResponse, readEditorialDeepDive } from "@/lib/editorial-deep-dives";

export const dynamic = "force-static";

export async function GET() {
  return editorialDeepDiveResponse(await readEditorialDeepDive("hbm-memory-cash-capture-alpha-2026-09", "zh"));
}
