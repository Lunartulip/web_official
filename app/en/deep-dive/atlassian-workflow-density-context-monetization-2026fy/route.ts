import { editorialDeepDiveResponse, readEditorialDeepDive } from "@/lib/editorial-deep-dives";

export const dynamic = "force-static";

export async function GET() {
  return editorialDeepDiveResponse(await readEditorialDeepDive("atlassian-workflow-density-context-monetization-2026fy", "en"));
}
