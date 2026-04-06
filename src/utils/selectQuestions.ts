import type { Question } from "@/types/question";
import type { QuizSettings } from "@/types/quiz";

function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function selectQuestions(
  allQuestions: Question[],
  settings: QuizSettings,
): Question[] {
  const filtered = allQuestions.filter((q) =>
    settings.domains.includes(q.domain),
  );
  const shuffled = fisherYatesShuffle(filtered);
  return shuffled.slice(0, Math.min(settings.questionCount, shuffled.length));
}
