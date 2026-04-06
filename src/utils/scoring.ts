import type { AnswerRecord } from "@/types/quiz";

export function calculateScore(answers: AnswerRecord[]): {
  correct: number;
  incorrect: number;
  unanswered: number;
  total: number;
  rate: number;
} {
  const correct = answers.filter((a) => a.isCorrect === true).length;
  const incorrect = answers.filter((a) => a.isCorrect === false).length;
  const unanswered = answers.filter((a) => a.isCorrect === null).length;
  const total = answers.length;
  const rate = total === 0 ? 0 : correct / total;
  return { correct, incorrect, unanswered, total, rate };
}
