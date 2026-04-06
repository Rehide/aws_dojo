import type { DomainId } from "@/constants/domains";
import type { Question } from "@/types/question";
import type { AnswerRecord, DomainStat } from "@/types/quiz";

export function calculateDomainStats(
  questions: Question[],
  answers: AnswerRecord[],
): DomainStat[] {
  const map = new Map<
    DomainId,
    { total: number; correct: number }
  >();

  questions.forEach((q, i) => {
    const answer = answers[i];
    const existing = map.get(q.domain) ?? { total: 0, correct: 0 };
    map.set(q.domain, {
      total: existing.total + 1,
      correct:
        existing.correct + (answer?.isCorrect === true ? 1 : 0),
    });
  });

  return Array.from(map.entries())
    .map(([domain, { total, correct }]) => ({
      domain,
      total,
      correct,
      rate: total === 0 ? 0 : correct / total,
    }))
    .sort((a, b) => a.domain - b.domain);
}

export function detectWeakness(stats: DomainStat[]): DomainStat[] {
  if (stats.length <= 1) return [];
  const minRate = Math.min(...stats.map((s) => s.rate));
  const maxRate = Math.max(...stats.map((s) => s.rate));
  if (minRate === maxRate) return [];
  return stats.filter((s) => s.rate === minRate);
}
