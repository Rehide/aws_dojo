"use client";

import { useRouter } from "next/navigation";
import { ExamSelector } from "@/components/ExamSelector";
import { AdBanner } from "@/components/AdBanner";
import type { ExamId } from "@/constants/exams";

export default function HomePage() {
  const router = useRouter();

  const handleNavigate = (examId: ExamId) => {
    router.push(`/exam/${examId.toLowerCase()}`);
  };

  return (
    <div className="py-4">
      <div className="mx-auto max-w-xl px-4 py-4 text-center">
        <h1 className="text-2xl font-bold" style={{ color: "#1E3A5F" }}>
          AWS 演習道場
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          AWS認定試験の試験対策
        </p>
        <p className="mt-1 text-xs text-slate-400">
          ※ 掲載問題はすべてオリジナルで作成したものです
        </p>
      </div>
      <ExamSelector onNavigate={handleNavigate} />
      <div className="mx-auto max-w-2xl px-4">
        <AdBanner adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP ?? ""} />
      </div>
    </div>
  );
}
