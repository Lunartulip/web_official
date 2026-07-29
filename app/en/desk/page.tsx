import type { Metadata } from "next";
import DeskPreview from "../../desk/desk-preview";

export const metadata: Metadata = {
  title: "Always-On Research Desk",
  description: "An invited B2B research workspace connecting an event ledger, hypothesis board, daily priorities and decision memory for institutional active investment teams.",
  alternates: {
    canonical: "/en/desk",
    languages: {
      "zh-CN": "/desk",
      en: "/en/desk",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en/desk",
    title: "Always-On Research Desk | Lunartulip Lab",
    description: "Validate one live research loop through an invited B2B paid pilot.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Research Desk" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://lunartuliplab.com/desk#service",
  name: "Always-On Research Desk",
  url: "https://lunartuliplab.com/en/desk",
  provider: { "@id": "https://lunartuliplab.com/#organization" },
  serviceType: "Continuous institutional investment research collaboration",
  offers: {
    "@type": "Offer",
    description: "Invited B2B paid pilot with custom pricing based on coverage, data, cadence, integration and support.",
    availability: "https://schema.org/LimitedAvailability",
  },
};

export default function EnglishDeskPage() {
  return (
    <>
      <DeskPreview initialLanguage="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
