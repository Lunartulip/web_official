import type { Metadata } from "next";
import DeskPreview from "./desk-preview";

export const metadata: Metadata = {
  title: "Always-On Research Desk",
  description:
    "面向机构持续共研的 AI-native Research Desk：连接事件账本、假设看板、每日简报与决策记忆。",
  alternates: {
    canonical: "/desk",
    languages: {
      "zh-CN": "/desk",
      en: "/en/desk",
    },
  },
  openGraph: {
    type: "website",
    url: "/desk",
    title: "Always-On Research Desk | Lunartulip Lab",
    description:
      "An always-on research collaboration environment connecting evidence, hypotheses, daily briefs and decision memory.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Research Desk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Always-On Research Desk | Lunartulip Lab",
    description: "Continuous AI-native research collaboration for institutional investors.",
    images: ["/opengraph-image"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://lunartuliplab.com/desk#service",
      name: "Always-On Research Desk",
      url: "https://lunartuliplab.com/desk",
      provider: { "@id": "https://lunartuliplab.com/#organization" },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Institutional active investment teams",
      },
      serviceType: "Continuous institutional investment research collaboration",
      description: "An invited B2B research collaboration that connects an event ledger, hypothesis board, daily priorities and decision memory.",
      offers: {
        "@type": "Offer",
        description: "Invited paid pilot with custom pricing based on coverage, data, cadence, integration and support.",
        availability: "https://schema.org/LimitedAvailability",
        url: "https://lunartuliplab.com/desk",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://lunartuliplab.com/desk#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is the Research Desk self-serve software?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The current entry point is an invited B2B paid pilot with jointly agreed coverage, data boundaries, cadence, human review and support.",
          },
        },
        {
          "@type": "Question",
          name: "Is the Workshop required before a Research Desk pilot?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Workshop is the default path. Mature institutions may enter directly after a readiness assessment.",
          },
        },
        {
          "@type": "Question",
          name: "How is the Research Desk priced?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pilot and annual pricing depends on research coverage, data sources, cadence, integration, seats and support.",
          },
        },
      ],
    },
  ],
};

export default function DeskPage() {
  return (
    <>
      <DeskPreview />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
