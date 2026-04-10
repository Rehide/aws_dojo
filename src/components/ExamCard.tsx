"use client";

import type { ExamConfig, ExamId } from "@/constants/exams";

interface Props {
  exam: ExamConfig;
  onSelect: (examId: ExamId) => void;
}

export function ExamCard({ exam, onSelect }: Props) {
  return (
    <button
      onClick={() => onSelect(exam.id)}
      className="flex flex-col items-center gap-1 rounded-xl border-2 border-slate-200 bg-white p-3 text-center transition-colors hover:border-teal-300"
    >
      <span className="text-sm font-bold" style={{ color: "#1E3A5F" }}>
        {exam.name}
      </span>
      <span className="text-xs text-slate-500">{exam.shortName}</span>
    </button>
  );
}
