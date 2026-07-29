import type { Metadata } from "next";
import WorkshopPreview from "../../workshop/workshop-preview";

export const metadata: Metadata = {
  title: "AI-native Research System Deployment",
  description: "Six working sessions to install a traceable research operating system, risk gates, decision memory and a 90-day roadmap for active investment teams.",
  alternates: {
    canonical: "/en/workshop",
    languages: {
      "zh-CN": "/workshop",
      en: "/en/workshop",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en/workshop",
    title: "AI-native Research System Deployment | Lunartulip Lab",
    description: "A six-session institutional deployment starting at US$15,000.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lunartulip Lab Workshop" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://lunartuliplab.com/workshop#service",
  name: "AI-native Research System Deployment",
  url: "https://lunartuliplab.com/en/workshop",
  provider: { "@id": "https://lunartuliplab.com/#organization" },
  serviceType: "Institutional investment research system deployment",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "15000",
    description: "Starting price for six working sessions; customization, taxes and travel quoted separately.",
    availability: "https://schema.org/LimitedAvailability",
  },
};

export default function EnglishWorkshopPage() {
  return (
    <>
      <WorkshopPreview initialLanguage="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
