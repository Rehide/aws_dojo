"use client";

import {
  EXAM_IDS,
  COMING_SOON_EXAM_IDS,
  EXAM_CONFIGS,
  type ExamId,
  type ExamLevel,
} from "@/constants/exams";
import { ExamCard } from "@/components/ExamCard";

interface Props {
  onNavigate: (examId: ExamId) => void;
}

const LEVEL_LABELS: Record<ExamLevel, string> = {
  Foundational: "Foundational",
  Associate: "Associate",
  Professional: "Professional",
  Specialty: "Specialty",
};

const LEVEL_ORDER: ExamLevel[] = [
  "Foundational",
  "Associate",
  "Professional",
  "Specialty",
];

export function ExamSelector({ onNavigate }: Props) {
  const grouped = LEVEL_ORDER.map((level) => {
    const isPending = level === "Professional" || level === "Specialty";
    const ids = isPending
      ? COMING_SOON_EXAM_IDS.filter((id) => EXAM_CONFIGS[id].level === level)
      : EXAM_IDS.filter((id) => EXAM_CONFIGS[id].level === level);
    return { level, exams: ids };
  }).filter(({ exams }) => exams.length > 0);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-2 pt-4">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold" style={{ color: "#1E3A5F" }}>
          試験を選択
        </h2>
        <div className="space-y-5">
          {grouped.map(({ level, exams }) => (
            <div key={level}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {LEVEL_LABELS[level]}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {exams.map((examId) => (
                  <ExamCard
                    key={examId}
                    exam={EXAM_CONFIGS[examId]}
                    onSelect={onNavigate}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
