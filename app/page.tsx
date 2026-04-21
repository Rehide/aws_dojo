"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExamSelector } from "@/components/ExamSelector";
import { AdBanner } from "@/components/AdBanner";
import type { ExamId } from "@/constants/exams";

const SUPPORTED_EXAMS = [
  { id: "CLF-C02", name: "AWS Certified Cloud Practitioner" },
  { id: "SAA-C03", name: "AWS Certified Solutions Architect – Associate" },
  { id: "MLA-C01", name: "AWS Certified Machine Learning Engineer – Associate" },
  { id: "AIF-C01", name: "AWS Certified AI Practitioner" },
  { id: "DVA-C02", name: "AWS Certified Developer – Associate" },
  { id: "SOA-C02", name: "AWS Certified SysOps Administrator – Associate" },
  { id: "DEA-C01", name: "AWS Certified Data Engineer – Associate" },
] as const;

const UPDATE_HISTORY = [
  { date: "2026-04", content: "Professional・Specialty試験をComing Soonで追加（SAP-C02・DOP-C02・ANS-C01・MLS-C01・SCS-C02）" },
  { date: "2026-04", content: "試験別個別URLを実装・7試験対応（CLF-C02・SAA-C03・MLA-C01・AIF-C01・DVA-C02・SOA-C02・DEA-C01）" },
  { date: "2026-03", content: "AWS演習道場を公開（MLA-C01・CLF-C02・SAA-C03）" },
];

const BEGINNER_GUIDES = [
  {
    label: "AWSが初めての方",
    description: "まずはクラウドの基礎から",
    examId: "CLF-C02" as ExamId,
  },
  {
    label: "クラウド経験あり",
    description: "アーキテクト資格の定番",
    examId: "SAA-C03" as ExamId,
  },
  {
    label: "AI・生成AIに興味がある方",
    description: "未経験でも始めやすい入門資格",
    examId: "AIF-C01" as ExamId,
  },
] as const;

export default function HomePage() {
  const router = useRouter();

  const handleNavigate = (examId: ExamId) => {
    router.push(`/exam/${examId.toLowerCase()}`);
  };

  return (
    <div className="py-4">
      <div className="mx-auto max-w-xl px-4 py-4 text-center">
        <h1 className="flex items-center justify-center gap-2 text-2xl font-bold" style={{ color: "#1E3A5F" }}>
          AWS演習道場
          <span className="rounded bg-teal-500 px-1.5 py-0.5 text-xs font-medium text-white">
            無料
          </span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          AWS認定試験の無料試験問題集
        </p>
        <p className="mt-1 text-xs text-slate-400">
          ※ 掲載問題はすべてオリジナルで作成したものです
        </p>
      </div>

      {/* 初心者向けガイド */}
      <div className="mx-auto max-w-2xl px-4 pb-2">
        <h2 className="mb-3 text-sm font-bold text-slate-500">
          どの試験から始める？
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {BEGINNER_GUIDES.map(({ label, description, examId }) => (
            <button
              key={examId}
              onClick={() => handleNavigate(examId)}
              className="flex flex-col items-start rounded-lg border border-slate-200 px-4 py-3 text-left hover:border-teal-400 hover:bg-teal-50"
            >
              <span className="text-xs font-semibold text-teal-600">{label}</span>
              <span className="mt-0.5 text-sm font-bold" style={{ color: "#1E3A5F" }}>
                {examId}
              </span>
              <span className="mt-0.5 text-xs text-slate-500">{description}</span>
            </button>
          ))}
        </div>
      </div>

      <ExamSelector onNavigate={handleNavigate} />

      {/* サービスの目的 */}
      <div className="mx-auto max-w-2xl px-4 pt-10">
        <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
          AWS演習道場とは
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          AWS演習道場は、AWS認定試験の合格を目指す方に向けて、オリジナルの練習問題を無料で提供するサービスです。
          試験ごとのドメイン別学習と模擬試験形式の両方に対応しており、学習の進捗に合わせて活用できます。
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          すべての問題はオリジナルで作成しており、AWS公式ドキュメントを根拠とした解説を付記しています。
          各選択肢がなぜ正解・不正解なのかを個別に解説しているため、正解を覚えるだけでなく理解を深めることができます。
        </p>
      </div>

      {/* 問題の品質方針 */}
      <div className="mx-auto max-w-2xl px-4 pt-8">
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
      </div>

      {/* 対応試験 */}
      <div className="mx-auto max-w-2xl px-4 pt-8">
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
      </div>

      {/* 更新履歴 */}
      <div className="mx-auto max-w-2xl px-4 pt-8">
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
      </div>

      {/* 運営者について */}
      <div className="mx-auto max-w-2xl px-4 pt-8 pb-10">
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
      </div>

      <div className="mx-auto max-w-2xl px-4 pb-4">
        <AdBanner adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP ?? ""} />
      </div>
    </div>
  );
}
