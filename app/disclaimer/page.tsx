import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "免責事項 | AWS無料試験問題集",
  description:
    "AWS無料試験問題集の免責事項です。コンテンツの正確性・AWS商標・外部リンク・損害に関する方針を説明します。",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-2 text-sm">
        <Link href="/" className="text-slate-500 hover:text-slate-700">
          ← トップに戻る
        </Link>
      </div>

      <h1 className="mt-4 text-xl font-bold" style={{ color: "#1E3A5F" }}>
        免責事項
      </h1>
      <p className="mt-2 text-xs text-slate-400">最終更新日: 2026年4月21日</p>

      {/* 1. コンテンツの正確性について */}
      <section className="mt-8">
        <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
          1. コンテンツの正確性について
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          当サイト（AWS無料試験問題集）の問題・解説はすべてオリジナルで作成したものであり、AWS 公式試験の問題とは異なります。
          内容の正確性・最新性には最善を尽くしていますが、完全な正確性を保証するものではありません。
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          AWS のサービス内容・仕様は予告なく変更されることがあります。
          最新の正確な情報は{" "}
          <a
            href="https://aws.amazon.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:underline"
          >
            AWS 公式サイト
          </a>
          {" "}および AWS 公式ドキュメントをご確認ください。
        </p>
      </section>

      {/* 2. 合格・成果の保証について */}
      <section className="mt-8">
        <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
          2. 合格・成果の保証について
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          当サイトの利用が AWS 認定試験の合格を保証するものではありません。
          試験対策の一つとしてご活用いただき、AWS 公式の学習教材や公式サンプル問題も併せてご利用ください。
        </p>
      </section>

      {/* 3. AWS 商標について */}
      <section className="mt-8">
        <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
          3. AWS 商標について
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          AWS、Amazon Web Services、および関連するロゴ・サービス名は Amazon.com, Inc. またはその関連会社の商標です。
          当サイトは Amazon Web Services, Inc. と提携・承認された関係にはなく、公式の AWS サービスではありません。
        </p>
      </section>

      {/* 4. 外部リンクについて */}
      <section className="mt-8">
        <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
          4. 外部リンクについて
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          当サイトから外部サイトへのリンクを掲載している場合がありますが、リンク先のコンテンツ・サービスについて当サイトは責任を負いません。
          外部サイトの利用はご自身の判断と責任のもとで行ってください。
        </p>
      </section>

      {/* 5. 損害に関する免責 */}
      <section className="mt-8">
        <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
          5. 損害に関する免責
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          当サイトのコンテンツをご利用いただいたことにより生じたいかなる損害（試験の不合格・機会損失・その他）についても、
          当サイト運営者は責任を負いません。
        </p>
      </section>

      {/* 6. 予告なき変更・廃止について */}
      <section className="mt-8">
        <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
          6. 予告なき変更・廃止について
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          当サイトのコンテンツ・サービスは予告なく変更・削除・廃止される場合があります。
          あらかじめご了承ください。
        </p>
      </section>

      <div className="mt-10 border-t border-slate-100 pt-6">
        <p className="text-xs text-slate-400">
          お問い合わせは{" "}
          <Link href="/contact" className="text-teal-600 hover:underline">
            お問い合わせページ
          </Link>
          {" "}からご連絡ください。
        </p>
      </div>
    </div>
  );
}
