import type { Metadata } from "next";
import InstitutionalAccess from "../../institutional-access/institutional-access";

export const metadata: Metadata = {
  title: "Research Products & Services | Professional and Institutional Access",
  description: "Request a sample, subscribe to thematic investment intelligence for AI technology, or discuss machine-readable APIs, quant alternative datasets, scoped mandates and a six-session institutional research-system workshop.",
  alternates: {
    canonical: "/en/institutional-access",
    languages: { "zh-CN": "/institutional-access", en: "/en/institutional-access" },
  },
};

export default function EnglishInstitutionalAccessPage() {
  return <InstitutionalAccess language="en" />;
}
