import type { ExamId } from '@/constants/exams';
import type { Question } from '@/types/question';

import mlaC01Questions from '@/data/mla-c01/questions.json';
import clfC02Questions from '@/data/clf-c02/questions.json';
import saaC03Questions from '@/data/saa-c03/questions.json';
import aifC01Questions from '@/data/aif-c01/questions.json';
import dvaC02Questions from '@/data/dva-c02/questions.json';
import soaC02Questions from '@/data/soa-c02/questions.json';
import deaC01Questions from '@/data/dea-c01/questions.json';

const QUESTION_MAP: Record<ExamId, Question[]> = {
  'MLA-C01': mlaC01Questions as Question[],
  'CLF-C02': clfC02Questions as Question[],
  'SAA-C03': saaC03Questions as Question[],
  'AIF-C01': aifC01Questions as Question[],
  'DVA-C02': dvaC02Questions as Question[],
  'SOA-C02': soaC02Questions as Question[],
  'DEA-C01': deaC01Questions as Question[],
  // Coming Soon（問題なし）
  'SAP-C02': [],
  'DOP-C02': [],
  'ANS-C01': [],
  'MLS-C01': [],
  'SCS-C02': [],
};

export function getQuestions(examId: ExamId): Question[] {
  return QUESTION_MAP[examId];
}
