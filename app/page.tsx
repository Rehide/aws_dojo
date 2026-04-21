"use client";

import { useRouter } from "next/navigation";
import { ExamSelector } from "@/components/ExamSelector";
import { AdBanner } from "@/components/AdBanner";
import type { ExamId } from "@/constants/exams";

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
      <div className="mx-auto max-w-2xl px-4 pt-8 pb-10">
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

      <div className="mx-auto max-w-2xl px-4">
        <AdBanner adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP ?? ""} />
      </div>
    </div>
  );
}
