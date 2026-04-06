import type { Metadata, Viewport } from "next";
import "./globals.css";
import { QuizProvider } from "@/contexts/QuizContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import questionsData from "@/data/questions.json";
import type { Question } from "@/types/question";

const questions = questionsData as Question[];

export const metadata: Metadata = {
  title: "AWS MLA-C01 演習道場",
  description:
    "AWS Certified Machine Learning Engineer – Associate（MLA-C01）の試験対策サイト。100問の練習問題でドメイン別に学習できます。",
  openGraph: {
    title: "AWS MLA-C01 演習道場",
    description:
      "AWS Certified Machine Learning Engineer – Associate 試験対策。100問の練習問題でドメイン別に学習できます。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: "AWS MLA-C01 演習道場",
    description:
      "AWS Certified Machine Learning Engineer – Associate 試験対策。100問の練習問題でドメイン別に学習できます。",
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
        <QuizProvider allQuestions={questions}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </QuizProvider>
      </body>
    </html>
  );
}
