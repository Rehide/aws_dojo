"use client";

import { useRouter } from "next/navigation";
import { useQuiz } from "@/hooks/useQuiz";
import { QuizSettingsPanel } from "@/components/QuizSettingsPanel";
import questionsData from "@/data/questions.json";
import type { Question } from "@/types/question";
import type { QuizSettings } from "@/types/quiz";

const questions = questionsData as Question[];

export default function HomePage() {
  const router = useRouter();
  const { startQuiz } = useQuiz();

  const handleStart = (settings: QuizSettings) => {
    startQuiz(settings);
    router.push("/quiz");
  };

  return (
    <div className="py-4">
      <div className="mx-auto max-w-xl px-4 py-4 text-center">
        <h1 className="text-2xl font-bold" style={{ color: "#1E3A5F" }}>
          AWS MLA-C01 演習道場
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          AWS Certified Machine Learning Engineer – Associate 試験対策
        </p>
        <p className="mt-1 text-xs text-slate-400">
          ※ 掲載問題はすべてオリジナルで作成したものです
        </p>
      </div>
      <QuizSettingsPanel allQuestions={questions} onStart={handleStart} />
    </div>
  );
}
