import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Research Access",
  robots: { index: false, follow: false },
};

export default function EnglishWorkshopPage() {
  redirect("/en/institutional-access");
}
