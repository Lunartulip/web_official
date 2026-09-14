import { editorialDeepDiveResponse, readEditorialDeepDive } from "@/lib/editorial-deep-dives";

export const dynamic = "force-static";

export async function GET() {
  return editorialDeepDiveResponse(await readEditorialDeepDive("snowflake-agentic-data-cloud-2026-09", "en"));
}
