"use client";

import { useState, useMemo } from "react";
import { DOMAIN_LABELS, type DomainId } from "@/constants/domains";
import type { QuizMode, QuizSettings, QuestionCount } from "@/types/quiz";
import type { Question } from "@/types/question";

const QUESTION_COUNTS: QuestionCount[] = [10, 20, 30, 50, 100];

interface Props {
  allQuestions: Question[];
  onStart: (settings: QuizSettings) => void;
}

export function QuizSettingsPanel({ allQuestions, onStart }: Props) {
  const [mode, setMode] = useState<QuizMode>("practice");
  const [selectedDomains, setSelectedDomains] = useState<Set<DomainId>>(
    new Set([1, 2, 3, 4]),
  );
  const [questionCount, setQuestionCount] = useState<QuestionCount>(20);
  const [shuffleChoices, setShuffleChoices] = useState(true);

  const isExam = mode === "exam";

  const availableCount = useMemo(() => {
    const domains = isExam ? ([1, 2, 3, 4] as DomainId[]) : [...selectedDomains];
    return allQuestions.filter((q) => domains.includes(q.domain)).length;
  }, [allQuestions, isExam, selectedDomains]);

  const effectiveDomains = isExam
    ? ([1, 2, 3, 4] as DomainId[])
    : [...selectedDomains];

  const canStart = effectiveDomains.length > 0;

  const handleDomainChange = (domain: DomainId, checked: boolean) => {
    setSelectedDomains((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(domain);
      } else {
        next.delete(domain);
      }
      return next;
    });
  };

  const handleStart = () => {
    const domains = isExam ? ([1, 2, 3, 4] as DomainId[]) : [...selectedDomains];
    const actualCount = Math.min(
      questionCount,
      availableCount,
    ) as QuestionCount;
    onStart({
      mode,
      domains,
      questionCount: actualCount,
      shuffleChoices,
    });
  };

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-8">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-bold" style={{ color: "#1E3A5F" }}>
          出題設定
        </h2>

        {/* モードタブ */}
        <div className="mb-6 flex rounded-lg border border-slate-200 p-1">
          {(["practice", "exam"] as QuizMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                mode === m
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-800"
              }`}
              style={
                mode === m ? { backgroundColor: "#1E3A5F" } : undefined
              }
            >
              {m === "practice" ? "分野別学習" : "模擬試験"}
            </button>
          ))}
        </div>

        {/* モード説明 */}
        <p className="mb-6 text-sm text-slate-500">
          {mode === "practice"
            ? "1問ごとに正解と解説を確認できます"
            : "全問回答後にまとめて採点します"}
        </p>

        {/* ドメイン選択 */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">
            出題ドメイン
          </h3>
          <div className="space-y-2">
            {([1, 2, 3, 4] as DomainId[]).map((domain) => (
              <label
                key={domain}
                className={`flex items-center gap-3 rounded-lg border p-3 text-sm transition-colors ${
                  isExam
                    ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400"
                    : "cursor-pointer border-slate-200 hover:border-teal-300"
                }`}
              >
                <input
                  type="checkbox"
                  disabled={isExam}
                  checked={isExam || selectedDomains.has(domain)}
                  onChange={(e) => handleDomainChange(domain, e.target.checked)}
                  className="h-4 w-4 accent-teal-600"
                />
                <span>
                  ドメイン {domain}: {DOMAIN_LABELS[domain]}
                </span>
              </label>
            ))}
          </div>
          {!isExam && selectedDomains.size === 0 && (
            <p className="mt-2 text-xs text-red-500">
              1つ以上のドメインを選択してください
            </p>
          )}
        </div>

        {/* シャッフル */}
        <div className="mb-6">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={shuffleChoices}
              onChange={(e) => setShuffleChoices(e.target.checked)}
              className="h-4 w-4 accent-teal-600"
            />
            選択肢をランダムに並べ替える
          </label>
        </div>

        {/* 問題数 */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">問題数</h3>
          <div className="flex flex-wrap gap-2">
            {QUESTION_COUNTS.map((n) => (
              <label key={n} className="cursor-pointer">
                <input
                  type="radio"
                  name="questionCount"
                  value={n}
                  checked={questionCount === n}
                  onChange={() => setQuestionCount(n)}
                  className="sr-only"
                />
                <span
                  className={`flex h-10 w-14 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                    questionCount === n
                      ? "border-teal-500 bg-teal-50 text-teal-700"
                      : "border-slate-200 text-slate-600 hover:border-teal-300"
                  }`}
                >
                  {n}問
                </span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-400">
            最大 {availableCount} 問出題可能
            {questionCount > availableCount && availableCount > 0 && (
              <span className="ml-1 text-amber-600">
                → {availableCount}問で出題します
              </span>
            )}
          </p>
        </div>

        {/* 開始ボタン */}
        <button
          onClick={handleStart}
          disabled={!canStart}
          className="w-full rounded-xl py-3 text-base font-bold text-white transition-opacity disabled:opacity-40"
          style={{ backgroundColor: "#0D9488" }}
        >
          出題開始
        </button>
      </div>
    </div>
  );
}
