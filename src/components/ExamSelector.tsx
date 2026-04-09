"use client";

import { EXAM_IDS, EXAM_CONFIGS, type ExamId } from "@/constants/exams";
import { ExamCard } from "@/components/ExamCard";

interface Props {
  selectedExamId: ExamId;
  onSelect: (examId: ExamId) => void;
}

export function ExamSelector({ selectedExamId, onSelect }: Props) {
  return (
    <div className="mx-auto w-full max-w-xl px-4 pb-2 pt-4">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold" style={{ color: "#1E3A5F" }}>
          試験を選択
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {EXAM_IDS.map((examId) => (
            <ExamCard
              key={examId}
              exam={EXAM_CONFIGS[examId]}
              isSelected={selectedExamId === examId}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
