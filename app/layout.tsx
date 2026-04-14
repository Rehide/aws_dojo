import type { Metadata, Viewport } from "next";
import "./globals.css";
import { QuizProvider } from "@/contexts/QuizContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

const BASE_URL = "https://awsdojo.vercel.app";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AWS無料試験問題集",
  url: BASE_URL,
  description:
    "AWS認定試験7種（CLF-C02・SAA-C03・MLA-C01・AIF-C01・DVA-C02・SOA-C02・DEA-C01）のオリジナル練習問題を無料で提供するサイトです。",
  inLanguage: "ja",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AWS無料試験問題集",
  url: BASE_URL,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://awsdojo.vercel.app"),
  verification: {
    google: "2r5ytV3xEQ7clzHxlWzewW-n56AXj__BGijJVHE4xkE",
  },
  title: "AWS無料試験問題集",
  description:
    "AWS認定試験（CLF-C02・SAA-C03・MLA-C01・AIF-C01・DVA-C02・SOA-C02・DEA-C01）の試験対策サイト。各試験のドメイン別に練習問題で学習できます。",
  openGraph: {
    title: "AWS無料試験問題集",
    description:
      "AWS認定試験7種（CLF-C02・SAA-C03・MLA-C01・AIF-C01・DVA-C02・SOA-C02・DEA-C01）の試験対策。ドメイン別の練習問題で学習できます。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: "AWS無料試験問題集",
    description:
      "AWS認定試験7種（CLF-C02・SAA-C03・MLA-C01・AIF-C01・DVA-C02・SOA-C02・DEA-C01）の試験対策。ドメイン別の練習問題で学習できます。",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

  return (
    <html lang="ja">
      <head>
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        {pubId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="flex min-h-screen flex-col">
        <QuizProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </QuizProvider>
      </body>
    </html>
  );
}
