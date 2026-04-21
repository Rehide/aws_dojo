import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | AWS演習道場〜無料試験問題集〜",
  description:
    "AWS演習道場〜無料試験問題集〜のプライバシーポリシーです。個人情報の取り扱い・Cookie・Google AdSenseについて説明します。",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-2 text-sm">
        <Link href="/" className="text-slate-500 hover:text-slate-700">
          ← トップに戻る
        </Link>
      </div>

      <h1 className="mt-4 text-xl font-bold" style={{ color: "#1E3A5F" }}>
        プライバシーポリシー
      </h1>
      <p className="mt-2 text-xs text-slate-400">最終更新日: 2026年4月21日</p>

      {/* 1. 個人情報の収集について */}
      <section className="mt-8">
        <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
          1. 個人情報の収集について
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          当サイト（AWS演習道場〜無料試験問題集〜）では、お問い合わせフォームを通じてお名前・メールアドレスを収集する場合があります。
          収集した情報はお問い合わせへの返答のみに使用し、それ以外の目的には使用しません。
        </p>
      </section>

      {/* 2. Google AdSense / Cookie について */}
      <section className="mt-8">
        <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
          2. Google AdSense / Cookie について
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          当サイトでは Google AdSense を使用しており、Google が Cookie を使用して広告を配信しています。
          Google が Cookie を使用することにより、当サイトや他サイトへのアクセス情報に基づいて適切な広告が表示されます。
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          ユーザーは{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:underline"
          >
            Google の広告設定ページ
          </a>
          {" "}から、Cookie を使用したパーソナライズ広告を無効化することができます。
          また、{" "}
          <a
            href="https://www.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:underline"
          >
            www.aboutads.info
          </a>
          {" "}からも第三者配信事業者の Cookie の無効化が可能です。
        </p>
      </section>

      {/* 3. アクセス解析について */}
      <section className="mt-8">
        <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
          3. アクセス解析について
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          当サイトはサービス改善のためアクセス解析ツール（Google Analytics 等）を使用する場合があります。
          アクセス解析ツールは Cookie を使用しますが、個人を特定しない統計情報のみを収集します。
          収集されたデータはサービスの改善・運営のために使用されます。
        </p>
      </section>

      {/* 4. 第三者への提供について */}
      <section className="mt-8">
        <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
          4. 第三者への提供について
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          当サイトで収集した個人情報は、法令に基づく場合を除き、本人の同意なく第三者に提供することはありません。
        </p>
      </section>

      {/* 5. お問い合わせ窓口 */}
      <section className="mt-8">
        <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
          5. お問い合わせ窓口
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          個人情報の取り扱いに関するご質問・ご要望は、
          <Link href="/contact" className="text-teal-600 hover:underline">
            お問い合わせページ
          </Link>
          よりご連絡ください。
        </p>
      </section>

      {/* 6. プライバシーポリシーの変更 */}
      <section className="mt-8">
        <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
          6. プライバシーポリシーの変更
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          当サイトは必要に応じてプライバシーポリシーを変更する場合があります。
          変更後の内容は本ページに掲載します。重要な変更がある場合はサイト上でお知らせします。
        </p>
      </section>
    </div>
  );
}
