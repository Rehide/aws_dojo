"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuiz } from "@/hooks/useQuiz";
import { EXAM_CONFIGS, type ExamId } from "@/constants/exams";
import { QuizSettingsPanel } from "@/components/QuizSettingsPanel";
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
    </div>
  );
}
