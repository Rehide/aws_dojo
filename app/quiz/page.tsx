"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/hooks/useQuiz";
import { DOMAIN_LABELS } from "@/constants/domains";
import { ChoiceButton, type ChoiceButtonState } from "@/components/ChoiceButton";
import { FeedbackPanel } from "@/components/FeedbackPanel";
import { ProgressBar } from "@/components/ProgressBar";
import type { DisplayChoice } from "@/types/quiz";

export default function QuizPage() {
  const router = useRouter();
  const { session, answerQuestion, goToQuestion, finishQuiz } = useQuiz();

  useEffect(() => {
    if (session === null) {
      router.replace("/");
    }
  }, [session, router]);

  if (!session) return null;

  const { questions, answers, currentIndex, settings } = session;
  const question = questions[currentIndex];
  const answer = answers[currentIndex];
  const isPractice = settings.mode === "practice";

  const isAnswered = answer.selectedChoiceId !== null;
  const isLastQuestion = currentIndex === questions.length - 1;

  const getChoiceState = (choice: DisplayChoice): ChoiceButtonState => {
    if (isPractice) {
      if (answer.isCorrect === null) return "default";
      if (choice.id === question.correctChoiceId) return "correct";
      if (choice.id === answer.selectedChoiceId) return "incorrect";
      return "disabled";
    } else {
      // exam mode
      if (answer.selectedChoiceId === choice.id) return "selected";
      return "default";
    }
  };

  const isChoiceDisabled = (choice: DisplayChoice): boolean => {
    if (isPractice) {
      return answer.isCorrect !== null;
    } else {
      // exam: same choice → no action
      return answer.selectedChoiceId === choice.id;
    }
  };

  const handleChoiceClick = (choiceId: string) => {
    if (isPractice && answer.isCorrect !== null) return;
    answerQuestion(question.id, choiceId);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      goToQuestion(currentIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleFinish = () => {
    if (!isLastQuestion) return;
    if (isPractice && !isAnswered) return;

    const unansweredCount = answers.filter(
      (a) => a.selectedChoiceId === null,
    ).length;

    if (!isPractice && unansweredCount > 0) {
      if (
        !window.confirm(
          `未回答の問題が ${unansweredCount} 問あります。採点しますか？`,
        )
      ) {
        return;
      }
    }

    finishQuiz();
    router.push("/quiz/result");
  };

  const correctChoice = answer.displayChoices.find(
    (c) => c.id === question.correctChoiceId,
  )!;

  const answeredCount = answers.filter((a) => a.selectedChoiceId !== null).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      {/* 進捗 */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
          <span>
            問 {currentIndex + 1} / {questions.length}
          </span>
          <span
            className="rounded-full px-3 py-0.5 text-xs font-medium text-white"
            style={{ backgroundColor: "#1E3A5F" }}
          >
            Domain {question.domain}: {DOMAIN_LABELS[question.domain]}
          </span>
        </div>
        <ProgressBar current={currentIndex} total={questions.length} />
        {!isPractice && (
          <p className="mt-1 text-right text-xs text-slate-400">
            回答済み: {answeredCount} / {questions.length}
          </p>
        )}
      </div>

      {/* 問題カード */}
      <div className="mb-6 rounded-2xl bg-white p-6 shadow-md">
        <p className="mb-6 whitespace-pre-wrap text-base leading-relaxed text-slate-800">
          {question.question}
        </p>

        <div className="space-y-3">
          {answer.displayChoices.map((choice) => (
            <ChoiceButton
              key={choice.id}
              choice={choice}
              state={getChoiceState(choice)}
              onClick={() => handleChoiceClick(choice.id)}
              disabled={isChoiceDisabled(choice)}
            />
          ))}
        </div>
      </div>

      {/* フィードバック（practiceモードのみ） */}
      {isPractice && answer.isCorrect !== null && (
        <div className="mb-6">
          <FeedbackPanel
            isCorrect={answer.isCorrect}
            correctChoice={correctChoice}
            explanation={question.explanation}
          />
        </div>
      )}

      {/* ナビゲーション */}
      <div className="flex gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40"
        >
          ← 前の問題
        </button>

        <div className="flex-1" />

        {!isLastQuestion && (
          <button
            onClick={handleNext}
            className="rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-opacity"
            style={{ backgroundColor: "#0D9488" }}
          >
            次の問題 →
          </button>
        )}

        {isLastQuestion && (
          <button
            onClick={handleFinish}
            disabled={isPractice && !isAnswered}
            className="rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-opacity disabled:opacity-40"
            style={{ backgroundColor: "#1E3A5F" }}
          >
            {isPractice ? "結果を見る" : "採点する"}
          </button>
        )}
      </div>
    </div>
  );
}
