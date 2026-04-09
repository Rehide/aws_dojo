"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/hooks/useQuiz";
import { EXAM_CONFIGS } from "@/constants/exams";
import { calculateScore } from "@/utils/scoring";
import { calculateDomainStats, detectWeakness } from "@/utils/domainStats";

export default function ResultPage() {
  const router = useRouter();
  const { session, selectedExamId, retryIncorrect, retryUnanswered, restartWithSameSettings, reset } =
    useQuiz();

  const [filter, setFilter] = useState<"all" | "incorrect" | "unanswered">(
    "all",
  );
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (session === null) {
      router.replace("/");
    }
  }, [session, router]);

  if (!session || !session.isFinished) return null;

  const { questions, answers } = session;
  const score = calculateScore(answers);
  const domainStats = calculateDomainStats(questions, answers);
  const weakDomains = detectWeakness(domainStats);

  const incorrectCount = answers.filter((a) => a.isCorrect === false).length;
  const unansweredCount = answers.filter((a) => a.isCorrect === null).length;

  const filteredIndices = questions
    .map((_, i) => i)
    .filter((i) => {
      if (filter === "incorrect") return answers[i].isCorrect === false;
      if (filter === "unanswered") return answers[i].isCorrect === null;
      return true;
    });

  const handleRetryIncorrect = () => {
    retryIncorrect();
    router.push("/quiz");
  };

  const handleRetryUnanswered = () => {
    retryUnanswered();
    router.push("/quiz");
  };

  const handleRestart = () => {
    restartWithSameSettings();
    router.push("/quiz");
  };

  const handleHome = () => {
    reset();
    router.push("/");
  };

  const ratePercent = (rate: number) => (rate * 100).toFixed(1) + "%";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* 総合スコア */}
      <div className="mb-6 rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-bold" style={{ color: "#1E3A5F" }}>
          総合スコア
        </h2>
        <div className="text-center">
          <p className="text-4xl font-bold" style={{ color: "#1E3A5F" }}>
            {score.correct} / {score.total}{" "}
            <span className="text-2xl text-slate-600">正解</span>
          </p>
          <p className="mt-2 text-2xl font-semibold" style={{ color: "#0D9488" }}>
            {ratePercent(score.rate)}
          </p>
          {score.unanswered > 0 && (
            <p className="mt-2 text-sm text-slate-500">
              未回答: {score.unanswered}問
            </p>
          )}
        </div>
      </div>

      {/* ドメイン別サマリ */}
      <div className="mb-6 rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-bold" style={{ color: "#1E3A5F" }}>
          ドメイン別サマリ
        </h2>
        <div className="space-y-4">
          {domainStats.map((stat) => (
            <div key={stat.domain}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">
                  Domain {stat.domain}: {EXAM_CONFIGS[selectedExamId].domainLabels[stat.domain]}
                </span>
                <span className="text-slate-600">
                  {stat.correct}/{stat.total}正解 （{ratePercent(stat.rate)}）
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: ratePercent(stat.rate),
                    backgroundColor:
                      stat.rate >= 0.7
                        ? "#0D9488"
                        : stat.rate >= 0.5
                          ? "#f59e0b"
                          : "#ef4444",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 弱点アラート */}
        {weakDomains.length > 0 && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <p className="text-sm font-medium text-amber-800">
              ⚠ 弱点:{" "}
              {weakDomains
                .map((s) => `Domain ${s.domain}`)
                .join("、")}{" "}
              の正答率が最も低くなっています
            </p>
          </div>
        )}
      </div>

      {/* アクションボタン */}
      <div className="mb-6 rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-bold" style={{ color: "#1E3A5F" }}>
          アクション
        </h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleRetryIncorrect}
            disabled={incorrectCount === 0}
            className="rounded-xl border-2 py-3 text-sm font-bold transition-colors disabled:opacity-40"
            style={{ borderColor: "#ef4444", color: "#ef4444" }}
          >
            不正解のみ再挑戦（{incorrectCount}問）
          </button>
          {unansweredCount > 0 && (
            <button
              onClick={handleRetryUnanswered}
              className="rounded-xl border-2 py-3 text-sm font-bold transition-colors"
              style={{ borderColor: "#f59e0b", color: "#b45309" }}
            >
              未回答のみ再挑戦（{unansweredCount}問）
            </button>
          )}
          <button
            onClick={handleRestart}
            className="rounded-xl py-3 text-sm font-bold text-white transition-opacity"
            style={{ backgroundColor: "#0D9488" }}
          >
            同じ設定でもう一度
          </button>
          <button
            onClick={handleHome}
            className="rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            トップに戻る
          </button>
        </div>
      </div>

      {/* 問題一覧 */}
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold" style={{ color: "#1E3A5F" }}>
            問題一覧
          </h2>
          <div className="flex gap-1 text-xs">
            {(["all", "incorrect", "unanswered"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
                  filter === f
                    ? "text-white"
                    : "border border-slate-200 text-slate-600"
                }`}
                style={filter === f ? { backgroundColor: "#1E3A5F" } : undefined}
              >
                {f === "all" ? "全問" : f === "incorrect" ? "不正解のみ" : "未回答のみ"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {filteredIndices.map((i) => {
            const q = questions[i];
            const a = answers[i];
            const isExpanded = expandedIndex === i;
            const statusIcon =
              a.isCorrect === true
                ? "✅"
                : a.isCorrect === false
                  ? "❌"
                  : "—";

            const userChoice = a.selectedChoiceId
              ? a.displayChoices.find((c) => c.id === a.selectedChoiceId)
              : null;
            const correctChoice = a.displayChoices.find(
              (c) => c.id === q.correctChoiceId,
            );

            return (
              <div key={i} className="rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 p-3">
                  <span className="text-lg">{statusIcon}</span>
                  <span className="text-sm font-medium text-slate-700">
                    問{i + 1}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                    style={{ backgroundColor: "#1E3A5F" }}
                  >
                    D{q.domain}
                  </span>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-xs text-slate-500">
                      {q.question.slice(0, 50)}…
                    </p>
                  </div>
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    className="shrink-0 text-xs font-medium"
                    style={{ color: "#0D9488" }}
                  >
                    {isExpanded ? "閉じる" : "解説を見る"}
                  </button>
                </div>

                {isExpanded && (
                  <div className="border-t border-slate-200 p-4">
                    <p className="mb-3 text-sm text-slate-800">{q.question}</p>
                    {userChoice && (
                      <p className="mb-1 text-sm">
                        <span className="text-slate-500">あなたの回答: </span>
                        <span
                          className={`font-medium ${a.isCorrect ? "text-green-700" : "text-red-700"}`}
                        >
                          {userChoice.label}. {userChoice.text}
                        </span>
                      </p>
                    )}
                    {!a.isCorrect && correctChoice && (
                      <p className="mb-1 text-sm">
                        <span className="text-slate-500">正解: </span>
                        <span className="font-medium text-green-700">
                          {correctChoice.label}. {correctChoice.text}
                        </span>
                      </p>
                    )}
                    <div className="mt-3 rounded-lg bg-slate-50 p-3">
                      <p className="mb-1 text-xs font-semibold text-slate-600">
                        【解説】
                      </p>
                      <p className="whitespace-pre-wrap text-sm text-slate-600">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredIndices.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-400">
              該当する問題はありません
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
