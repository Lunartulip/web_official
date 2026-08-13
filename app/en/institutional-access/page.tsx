import type { Metadata } from "next";
import InstitutionalAccess from "../../institutional-access/institutional-access";

export const metadata: Metadata = {
  title: "Institutional Research Access | Research Collaboration",
  description: "Research formats for funds, asset managers, professional family offices and research teams seeking verifiable work, continuous monitoring and deep research across global AI technology equities.",
  alternates: {
    canonical: "/en/institutional-access",
    languages: { "zh-CN": "/institutional-access", en: "/en/institutional-access" },
  },
};

export default function EnglishInstitutionalAccessPage() {
  return <InstitutionalAccess language="en" />;
}
