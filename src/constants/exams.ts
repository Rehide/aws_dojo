export type ExamId = 'MLA-C01' | 'CLF-C02' | 'SAA-C03';

export interface ExamConfig {
  id: ExamId;
  name: string;
  fullName: string;
  shortName: string;
  domainLabels: Record<number, string>;
  domainIds: number[];
  totalQuestions: number;
}

export const EXAM_CONFIGS: Record<ExamId, ExamConfig> = {
  'MLA-C01': {
    id: 'MLA-C01',
    name: 'MLA-C01',
    fullName: 'AWS Certified Machine Learning Engineer – Associate',
    shortName: 'Machine Learning',
    domainLabels: {
      1: 'ML向けデータエンジニアリング',
      2: 'MLモデル開発',
      3: 'MLモデルのデプロイと運用化',
      4: 'MLソリューションの監視とメンテナンス',
    },
    domainIds: [1, 2, 3, 4],
    totalQuestions: 100,
  },
  'CLF-C02': {
    id: 'CLF-C02',
    name: 'CLF-C02',
    fullName: 'AWS Certified Cloud Practitioner',
    shortName: 'Cloud Practitioner',
    domainLabels: {
      1: 'クラウドの概念',
      2: 'セキュリティとコンプライアンス',
      3: 'クラウドテクノロジーとサービス',
      4: '請求・料金・サポート',
    },
    domainIds: [1, 2, 3, 4],
    totalQuestions: 100,
  },
  'SAA-C03': {
    id: 'SAA-C03',
    name: 'SAA-C03',
    fullName: 'AWS Certified Solutions Architect – Associate',
    shortName: 'Solutions Architect',
    domainLabels: {
      1: 'セキュアなアーキテクチャの設計',
      2: '弾力性の高いアーキテクチャの設計',
      3: '高パフォーマンスなアーキテクチャの設計',
      4: 'コスト最適化されたアーキテクチャの設計',
    },
    domainIds: [1, 2, 3, 4],
    totalQuestions: 100,
  },
} as const;

export const EXAM_IDS: ExamId[] = ['MLA-C01', 'CLF-C02', 'SAA-C03'];
