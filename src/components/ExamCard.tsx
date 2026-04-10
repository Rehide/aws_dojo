"use client";

import type { ExamConfig, ExamId } from "@/constants/exams";

interface Props {
  exam: ExamConfig;
  isSelected: boolean;
  onSelect: (examId: ExamId) => void;
}

export function ExamCard({ exam, isSelected, onSelect }: Props) {
  return (
    <button
      onClick={() => onSelect(exam.id)}
      className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 text-center transition-colors ${
        isSelected
          ? "border-teal-500 bg-teal-50"
          : "border-slate-200 bg-white hover:border-teal-300"
      }`}
    >
      <span
        className="text-sm font-bold"
        style={{ color: isSelected ? "#0D9488" : "#1E3A5F" }}
      >
        {exam.name}
      </span>
      <span className="text-xs text-slate-500">{exam.shortName}</span>

    </button>
  );
}
