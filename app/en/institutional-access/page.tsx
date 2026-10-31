import type { Metadata } from "next";
import InstitutionalAccess from "../../institutional-access/institutional-access";

export const metadata: Metadata = {
  title: "Institutional Buyers & Engagements | Global Technology Equity Research",
  description: "AlphaMap alternative data and scoped research-methodology engagements for systematic equity teams, fundamental investors and investment platforms.",
  alternates: {
    canonical: "/en/institutional-access",
    languages: { "zh-CN": "/institutional-access", en: "/en/institutional-access" },
  },
};

export default function EnglishInstitutionalAccessPage() {
  return <InstitutionalAccess language="en" />;
}
