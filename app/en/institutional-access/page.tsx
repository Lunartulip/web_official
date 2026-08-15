import type { Metadata } from "next";
import InstitutionalAccess from "../../institutional-access/institutional-access";

export const metadata: Metadata = {
  title: "Institutional Research Access | Defined Research Engagements",
  description: "Request a sample, apply for fixed-term Research Access, submit an in-coverage commissioned mandate or discuss a six-session AI-native Research System Diagnostic.",
  alternates: {
    canonical: "/en/institutional-access",
    languages: { "zh-CN": "/institutional-access", en: "/en/institutional-access" },
  },
};

export default function EnglishInstitutionalAccessPage() {
  return <InstitutionalAccess language="en" />;
}
