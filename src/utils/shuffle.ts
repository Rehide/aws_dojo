import type { Choice } from "@/types/question";
import type { DisplayChoice } from "@/types/quiz";

const CHOICE_LABELS = ["ア", "イ", "ウ", "エ"] as const;

function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function shuffleChoices(
  choices: Choice[],
  shouldShuffle: boolean,
): DisplayChoice[] {
  const ordered = shouldShuffle ? fisherYatesShuffle(choices) : [...choices];
  return ordered.map((choice, index) => ({
    id: choice.id,
    label: CHOICE_LABELS[index],
    text: choice.text,
  }));
}
