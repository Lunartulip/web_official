import type { Metadata } from "next";
import InstitutionalAccess from "../../institutional-access/institutional-access";

export const metadata: Metadata = {
  title: "Research Products & Services | Professional and Institutional Access",
  description: "Request a sample, apply for Always-On Research Desk, or discuss the machine-readable Research API, quant alternative datasets, scoped mandates and the six-session AI-native research-framework workshop.",
  alternates: {
    canonical: "/en/institutional-access",
    languages: { "zh-CN": "/institutional-access", en: "/en/institutional-access" },
  },
};

export default function EnglishInstitutionalAccessPage() {
  return <InstitutionalAccess language="en" />;
}
