import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";

const BASE_URL = "https://awsdojo.vercel.app";

export const metadata: Metadata = {
  title: "AWS無料試験問題集について | AWS無料試験問題集",
  description:
    "AWS無料試験問題集はAWS認定試験のオリジナル練習問題を無料で提供するサービスです。問題の品質方針・サービスの目的・更新履歴をご紹介します。",
};

const UPDATE_HISTORY = [
  { date: "2026-04", content: "Professional・Specialty試験をComing Soonで追加（SAP-C02・DOP-C02・ANS-C01・MLS-C01・SCS-C02・PAS-C01）" },
  { date: "2026-04", content: "試験別個別URLを実装・7試験対応（CLF-C02・SAA-C03・MLA-C01・AIF-C01・DVA-C02・SOA-C02・DEA-C01）" },
  { date: "2026-03", content: "AWS無料試験問題集を公開（MLA-C01・CLF-C02・SAA-C03）" },
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
  name: "AWS無料試験問題集について",
  url: `${BASE_URL}/about`,
  description:
    "AWS無料試験問題集はAWS認定試験のオリジナル練習問題を無料で提供するサービスです。",
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
          AWS無料試験問題集について
        </h1>

        {/* サービスの目的 */}
        <section className="mt-8">
          <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
            サービスの目的
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            AWS無料試験問題集は、AWS認定試験の合格を目指す方に向けて、オリジナルの練習問題を無料で提供するサービスです。
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
      </div>
    </>
  );
}
