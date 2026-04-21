"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuiz } from "@/hooks/useQuiz";
import { EXAM_CONFIGS, type ExamId } from "@/constants/exams";
import { EXAM_CONTENTS } from "@/constants/examContent";
import { QuizSettingsPanel } from "@/components/QuizSettingsPanel";
import { FaqSection } from "@/components/FaqSection";
import { AdBanner } from "@/components/AdBanner";
import type { QuizSettings } from "@/types/quiz";

export function ExamTopPage() {
  const params = useParams<{ examId: string }>();
  const router = useRouter();
  const { selectExam, startQuiz } = useQuiz();

  const examId = params.examId.toUpperCase() as ExamId;
  const examConfig = EXAM_CONFIGS[examId];

  useEffect(() => {
    if (!examConfig) {
      router.replace("/");
      return;
    }
    selectExam(examId);
  }, [examId, examConfig, selectExam, router]);

  if (!examConfig) return null;

  const content = EXAM_CONTENTS[examId];

  const handleStart = (settings: QuizSettings) => {
    startQuiz(settings);
    router.push(`/exam/${params.examId}/quiz`);
  };

  return (
    <div className="py-4">
      <div className="mx-auto max-w-xl px-4 pt-4">
        <button
          onClick={() => router.push("/")}
          className="mb-4 text-sm text-slate-500 hover:text-slate-700"
        >
          ← 試験一覧に戻る
        </button>
        <div className="text-center">
          <h1 className="text-xl font-bold" style={{ color: "#1E3A5F" }}>
            {examConfig.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{examConfig.fullName}</p>
          <span
            className="mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-medium text-white"
            style={{ backgroundColor: "#1E3A5F" }}
          >
            {examConfig.level}
          </span>
        </div>
      </div>
      <QuizSettingsPanel selectedExamId={examId} onStart={handleStart} />

      {/* コンテンツセクション */}
      <div className="mx-auto max-w-xl px-4 pb-12">
        {/* 試験概要 */}
        <section className="mt-8">
          <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
            この試験について
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">{content.summary}</p>
          <table className="mt-4 w-full text-sm">
            <tbody>
              <tr className="border-b border-slate-100">
                <th className="py-2 pr-4 text-left font-medium text-slate-500 w-24">対象者</th>
                <td className="py-2 text-slate-700">{content.targetAudience}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <th className="py-2 pr-4 text-left font-medium text-slate-500 w-24">前提知識</th>
                <td className="py-2 text-slate-700">{content.prerequisites}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <th className="py-2 pr-4 text-left font-medium text-slate-500 w-24">総問題数</th>
                <td className="py-2 text-slate-700">{examConfig.totalQuestions}問</td>
              </tr>
              <tr className="border-b border-slate-100">
                <th className="py-2 pr-4 text-left font-medium text-slate-500 w-24">試験時間</th>
                <td className="py-2 text-slate-700">{content.examDetail.duration}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <th className="py-2 pr-4 text-left font-medium text-slate-500 w-24">出題数</th>
                <td className="py-2 text-slate-700">{content.examDetail.questionCount}問</td>
              </tr>
              <tr className="border-b border-slate-100">
                <th className="py-2 pr-4 text-left font-medium text-slate-500 w-24">合格スコア</th>
                <td className="py-2 text-slate-700">{content.examDetail.passingScore}点（1000点満点）</td>
              </tr>
              <tr className="border-b border-slate-100">
                <th className="py-2 pr-4 text-left font-medium text-slate-500 w-24">受験料</th>
                <td className="py-2 text-slate-700">{content.examDetail.fee}</td>
              </tr>
              <tr>
                <th className="py-2 pr-4 text-left font-medium text-slate-500 w-24">出題形式</th>
                <td className="py-2 text-slate-700">{content.examDetail.format}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 学習ステップ */}
        <section className="mt-8">
          <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
            おすすめ学習ステップ
          </h2>
          <ol className="space-y-2">
            {content.studyOrder.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: "#1E3A5F" }}
                >
                  {i + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 攻略ポイント */}
        <section className="mt-8">
          <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
            ドメイン別攻略ポイント
          </h2>
          <ul className="space-y-3">
            {content.keyPoints.map((point, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-600">
                <span className="mt-1 shrink-0 text-teal-500">▶</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <FaqSection faqs={content.faq} />

        {/* 広告 */}
        <AdBanner adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_EXAM ?? ""} />

        {/* 次のステップ */}
        {content.nextExams.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-base font-bold" style={{ color: "#1E3A5F" }}>
              この試験の次におすすめ
            </h2>
            <div className="flex flex-wrap gap-2">
              {content.nextExams.map((nextId) => (
                <button
                  key={nextId}
                  onClick={() => router.push(`/exam/${nextId.toLowerCase()}`)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-teal-400 hover:text-teal-600"
                >
                  {nextId} →
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
