import type { Metadata } from "next";
import InstitutionalAccess from "../../institutional-access/institutional-access";

export const metadata: Metadata = {
  title: "Institutional Buyers & Engagements | Global Technology Equity Research",
  description: "AlphaMap leads the launch sequence; Research Desk / Pro, limited Research API access and scoped methodology engagements follow buyer tasks and validated demand.",
  alternates: {
    canonical: "/en/institutional-access",
    languages: { "zh-CN": "/institutional-access", en: "/en/institutional-access" },
  },
};

export default function EnglishInstitutionalAccessPage() {
  return <InstitutionalAccess language="en" />;
}
