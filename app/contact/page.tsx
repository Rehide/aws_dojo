import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ | AWS演習道場〜無料試験問題集〜",
  description: "AWS演習道場〜無料試験問題集〜へのお問い合わせはこちらから。問題の誤りのご指摘・ご要望・その他ご連絡をお受けしています。",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-2 text-sm">
        <Link href="/" className="text-slate-500 hover:text-slate-700">
          ← トップに戻る
        </Link>
      </div>

      <h1 className="mt-4 text-xl font-bold" style={{ color: "#1E3A5F" }}>
        お問い合わせ
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        問題の誤りのご指摘・機能のご要望・その他ご不明点はこちらからご連絡ください。
        返信には数日かかる場合があります。
      </p>

      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
