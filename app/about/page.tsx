import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";

const BASE_URL = "https://aws-exam-dojo.com";

export const metadata: Metadata = {
  title: "AWS演習道場〜無料試験問題集〜について | AWS演習道場〜無料試験問題集〜",
  description:
    "AWS演習道場〜無料試験問題集〜はAWS認定試験のオリジナル練習問題を無料で提供するサービスです。問題の品質方針・サービスの目的・更新履歴をご紹介します。",
};

const UPDATE_HISTORY = [
  { date: "2026-04", content: "Professional・Specialty試験をComing Soonで追加（SAP-C02・DOP-C02・ANS-C01・MLS-C01・SCS-C02・PAS-C01）" },
  { date: "2026-04", content: "試験別個別URLを実装・7試験対応（CLF-C02・SAA-C03・MLA-C01・AIF-C01・DVA-C02・SOA-C02・DEA-C01）" },
  { date: "2026-03", content: "AWS演習道場〜無料試験問題集〜を公開（MLA-C01・CLF-C02・SAA-C03）" },
];

const SUPPORTED_EXAMS = [
  { id: "CLF-C02", name: "AWS Certified Cloud Practitioner" },
  { id: "SAA-C03", name: "AWS Certified Solutions Architect – Associate" },
  { id: "MLA-C01", name: "AWS Certified Machine Learning Engineer – Associate" },
  { id: "AIF-C01", name: "AWS Certified AI Practitioner" },
  { id: "DVA-C02", name: "AWS Certified Developer – Associate" },
  { id: "SOA-C02", name: "AWS Certified SysOps Administrator – Associate" },
  { id: "DEA-C01", name: "AWS Certified Data Engineer – Associate" },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AWS演習道場〜無料試験問題集〜について",
  url: `${BASE_URL}/about`,
  description:
    "AWS演習道場〜無料試験問題集〜はAWS認定試験のオリジナル練習問題を無料で提供するサービスです。",
  inLanguage: "ja",
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageSchema} />
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-2 text-sm">
          <Link href="/" className="text-slate-500 hover:text-slate-700">
            ← トップに戻る
          </Link>
        </div>

        <h1 className="mt-4 text-xl font-bold" style={{ color: "#1E3A5F" }}>
          AWS演習道場〜無料試験問題集〜について
        </h1>

        {/* サービスの目的 */}
        <section className="mt-8">
          <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
            サービスの目的
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            AWS演習道場〜無料試験問題集〜は、AWS認定試験の合格を目指す方に向けて、オリジナルの練習問題を無料で提供するサービスです。
            試験ごとのドメイン別学習と模擬試験形式の両方に対応しており、学習の進捗に合わせて活用できます。
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            すべての問題はオリジナルで作成しており、AWS公式ドキュメントを根拠とした解説を付記しています。
            各選択肢がなぜ正解・不正解なのかの個別解説も用意しており、正解を覚えるだけでなく理解を深めることができます。
          </p>
        </section>

        {/* 問題の品質方針 */}
        <section className="mt-8">
          <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
            問題の品質方針
          </h2>
          <ul className="space-y-2">
            {[
              "すべてオリジナルで作成（既存資料の転載・引用なし）",
              "AWS公式ドキュメントを根拠とした解説を付記",
              "各選択肢の正解・不正解理由を個別に解説",
              "試験のドメイン比率に沿った問題数配分",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-600">
                <span className="mt-0.5 shrink-0 text-teal-500">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 対応試験 */}
        <section className="mt-8">
          <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
            対応試験
          </h2>
          <ul className="space-y-2">
            {SUPPORTED_EXAMS.map(({ id, name }) => (
              <li key={id} className="text-sm">
                <Link
                  href={`/exam/${id.toLowerCase()}`}
                  className="font-medium text-teal-600 hover:underline"
                >
                  {id}
                </Link>
                <span className="ml-2 text-slate-600">{name}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 更新履歴 */}
        <section className="mt-8">
          <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
            更新履歴
          </h2>
          <table className="w-full text-sm">
            <tbody>
              {UPDATE_HISTORY.map((item, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-2 pr-6 font-mono text-slate-500 whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="py-2 text-slate-600">{item.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 運営者について */}
        <section className="mt-8">
          <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
            運営者について
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex gap-4">
              <dt className="w-28 shrink-0 font-medium text-slate-700">運営者</dt>
              <dd className="text-slate-600">
                Rehide（
                <a
                  href="https://github.com/Rehide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline"
                >
                  @Rehide
                </a>
                ）
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-28 shrink-0 font-medium text-slate-700">開設の目的</dt>
              <dd className="leading-relaxed text-slate-600">
                AWS 認定試験の合格を目指す方に、無料で質の高い練習問題を提供したいと考え開設しました。
                公式ドキュメントを根拠にした解説付きの問題で、正解を覚えるだけでなく理解を深める学習をサポートします。
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-28 shrink-0 font-medium text-slate-700">お問い合わせ</dt>
              <dd className="text-slate-600">
                <Link href="/contact" className="text-teal-600 hover:underline">
                  お問い合わせフォーム
                </Link>
                よりご連絡ください。
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  );
}
