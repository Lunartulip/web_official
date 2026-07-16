import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lunartuliplab.com"),
  title: {
    default: "LunarTulip Lab — AI-native Research & Decision Systems",
    template: "%s | LunarTulip Lab",
  },
  description: "从机构投研基础系统、产业因果研究到决策闭环，为主动管理构建可持续演化的 AI-native 研究系统。",
  keywords: [
    "AI-native research",
    "active management",
    "investment research systems",
    "decision systems",
    "产业因果研究",
    "主动管理",
  ],
  authors: [{ name: "LunarTulip Lab", url: "/" }],
  creator: "LunarTulip Lab",
  publisher: "LunarTulip Lab",
  category: "Technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    url: "/",
    siteName: "LunarTulip Lab",
    title: "LunarTulip Lab — AI-native Research & Decision Systems",
    description: "AI-native research and decision systems for active management.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "LunarTulip Lab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LunarTulip Lab — AI-native Research & Decision Systems",
    description: "Build the system behind conviction.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LunarTulip Lab",
  url: "https://lunartuliplab.com",
  logo: "https://lunartuliplab.com/lunartulip-silver-emblem.png",
  email: "t.stephanie@lunartuliplab.com",
  description: "AI-native research and decision systems for active management.",
  sameAs: ["https://github.com/Lunartulip"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
