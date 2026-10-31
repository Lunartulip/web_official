import { redirect } from "next/navigation";

export const dynamic = "force-static";

export function GET() {
  redirect("/alphamap/finllm-kg-to-tradable-quant-factors-000");
}
