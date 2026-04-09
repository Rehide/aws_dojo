import type { ExamId } from '@/constants/exams';
import type { Question } from '@/types/question';

/**
 * 学習モード
 * - 'practice': 分野指定モード。1問ごとに即時フィードバック（正誤+解説）を表示
 * - 'exam': 模擬試験モード。回答中は正誤を表示せず、全問回答後に一括採点
 */
export type QuizMode = "practice" | "exam";

/** 出題設定 */
export interface QuizSettings {
  examId: ExamId;
  mode: QuizMode;
  domains: number[]; // 選択されたドメイン（1つ以上）
  questionCount: QuestionCount;
  shuffleChoices: boolean;
}

export type QuestionCount = 10 | 20 | 30 | 50 | 100;

/** シャッフル後の表示用選択肢 */
export interface DisplayChoice {
  id: string; // 元の choice.id
  label: string; // "ア" | "イ" | "ウ" | "エ"
  text: string;
}

/** 各問題の回答記録 */
export interface AnswerRecord {
  questionId: number;
  selectedChoiceId: string | null; // null = 未回答
  isCorrect: boolean | null; // null = 未回答、true = 正解、false = 不正解
  displayChoices: DisplayChoice[]; // 出題時のシャッフル順スナップショット
}

/** クイズセッション全体の状態 */
export interface QuizSession {
  settings: QuizSettings;
  questions: Question[]; // このセッションの出題リスト（順序確定済み）
  answers: AnswerRecord[]; // questions と同じインデックスで対応
  currentIndex: number; // 0始まり
  isFinished: boolean;
}

/** ドメイン別統計 */
export interface DomainStat {
  domain: number;
  total: number;
  correct: number;
  rate: number; // 0.0 〜 1.0
}
