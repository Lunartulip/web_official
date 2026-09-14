import { editorialDeepDiveResponse, readEditorialDeepDive } from "@/lib/editorial-deep-dives";

export const dynamic = "force-static";

export async function GET() {
  return editorialDeepDiveResponse(await readEditorialDeepDive("palantir-ai-application-commercialization-2026q2", "zh"));
}
