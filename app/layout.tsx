import type { Metadata, Viewport } from "next";
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
    "AWS認定試験（MLA-C01・CLF-C02・SAA-C03）の試験対策サイト。各試験のドメイン別に練習問題で学習できます。",
  openGraph: {
    title: "AWS 演習道場",
    description:
      "AWS認定試験（MLA-C01・CLF-C02・SAA-C03）の試験対策。ドメイン別の練習問題で学習できます。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: "AWS 演習道場",
    description:
      "AWS認定試験（MLA-C01・CLF-C02・SAA-C03）の試験対策。ドメイン別の練習問題で学習できます。",
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
  return (
    <html lang="ja">
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
