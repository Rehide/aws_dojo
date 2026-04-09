import type { ExamId } from '@/constants/exams';
import type { Question } from '@/types/question';

import mlaC01Questions from '@/data/mla-c01/questions.json';
import clfC02Questions from '@/data/clf-c02/questions.json';
import saaC03Questions from '@/data/saa-c03/questions.json';

const QUESTION_MAP: Record<ExamId, Question[]> = {
  'MLA-C01': mlaC01Questions as Question[],
  'CLF-C02': clfC02Questions as Question[],
  'SAA-C03': saaC03Questions as Question[],
};

export function getQuestions(examId: ExamId): Question[] {
  return QUESTION_MAP[examId];
}
