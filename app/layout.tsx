import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { QuizProvider } from "@/contexts/QuizContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  verification: {
    google: "2r5ytV3xEQ7clzHxlWzewW-n56AXj__BGijJVHE4xkE",
  },
  title: "AWS 演習道場",
  description:
    "AWS認定試験（CLF-C02・SAA-C03・MLA-C01・AIF-C01・DVA-C02・SOA-C02・DEA-C01）の試験対策サイト。各試験のドメイン別に練習問題で学習できます。",
  openGraph: {
    title: "AWS 演習道場",
    description:
      "AWS認定試験7種（CLF-C02・SAA-C03・MLA-C01・AIF-C01・DVA-C02・SOA-C02・DEA-C01）の試験対策。ドメイン別の練習問題で学習できます。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: "AWS 演習道場",
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
      <body className="flex min-h-screen flex-col">
        {pubId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <QuizProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </QuizProvider>
      </body>
    </html>
  );
}
