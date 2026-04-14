export type ExamId =
  | 'MLA-C01'
  | 'CLF-C02'
  | 'SAA-C03'
  | 'AIF-C01'
  | 'DVA-C02'
  | 'SOA-C02'
  | 'DEA-C01'
  // Professional
  | 'SAP-C02'
  | 'DOP-C02'
  // Specialty
  | 'ANS-C01'
  | 'MLS-C01'
  | 'SCS-C02'
  | 'PAS-C01';

export type ExamLevel = 'Foundational' | 'Associate' | 'Professional' | 'Specialty';

export interface ExamConfig {
  id: ExamId;
  name: string;
  fullName: string;
  shortName: string;
  level: ExamLevel;
  domainLabels: Record<number, string>;
  domainIds: number[];
  totalQuestions: number;
  comingSoon?: boolean;
}

export const EXAM_CONFIGS: Record<ExamId, ExamConfig> = {
  'MLA-C01': {
    id: 'MLA-C01',
    name: 'MLA-C01',
    fullName: 'AWS Certified Machine Learning Engineer – Associate',
    shortName: 'Machine Learning',
    level: 'Associate',
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
    level: 'Foundational',
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
    level: 'Associate',
    domainLabels: {
      1: 'セキュアなアーキテクチャの設計',
      2: '弾力性の高いアーキテクチャの設計',
      3: '高パフォーマンスなアーキテクチャの設計',
      4: 'コスト最適化されたアーキテクチャの設計',
    },
    domainIds: [1, 2, 3, 4],
    totalQuestions: 100,
  },
  'AIF-C01': {
    id: 'AIF-C01',
    name: 'AIF-C01',
    fullName: 'AWS Certified AI Practitioner',
    shortName: 'AI Practitioner',
    level: 'Foundational',
    domainLabels: {
      1: 'AIとMLの基礎',
      2: '生成AIの基礎',
      3: '基盤モデルのアプリケーション',
      4: '責任あるAIのガイドライン',
      5: 'AIソリューションのセキュリティ・コンプライアンス・ガバナンス',
    },
    domainIds: [1, 2, 3, 4, 5],
    totalQuestions: 100,
  },
  'DVA-C02': {
    id: 'DVA-C02',
    name: 'DVA-C02',
    fullName: 'AWS Certified Developer – Associate',
    shortName: 'Developer',
    level: 'Associate',
    domainLabels: {
      1: 'AWSサービスによる開発',
      2: 'セキュリティ',
      3: 'デプロイ',
      4: 'トラブルシューティングと最適化',
    },
    domainIds: [1, 2, 3, 4],
    totalQuestions: 100,
  },
  'SOA-C02': {
    id: 'SOA-C02',
    name: 'SOA-C02',
    fullName: 'AWS Certified SysOps Administrator – Associate',
    shortName: 'SysOps Administrator',
    level: 'Associate',
    domainLabels: {
      1: 'モニタリング・ロギング・修復',
      2: '信頼性とビジネス継続性',
      3: 'デプロイ・プロビジョニング・自動化',
      4: 'セキュリティとコンプライアンス',
      5: 'ネットワーキングとコンテンツ配信',
      6: 'コストとパフォーマンスの最適化',
    },
    domainIds: [1, 2, 3, 4, 5, 6],
    totalQuestions: 100,
  },
  'DEA-C01': {
    id: 'DEA-C01',
    name: 'DEA-C01',
    fullName: 'AWS Certified Data Engineer – Associate',
    shortName: 'Data Engineer',
    level: 'Associate',
    domainLabels: {
      1: 'データの取り込みと変換',
      2: 'データストア管理',
      3: 'データ運用とサポート',
      4: 'データセキュリティとガバナンス',
    },
    domainIds: [1, 2, 3, 4],
    totalQuestions: 100,
  },
  // Professional
  'SAP-C02': {
    id: 'SAP-C02',
    name: 'SAP-C02',
    fullName: 'AWS Certified Solutions Architect – Professional',
    shortName: 'Solutions Architect Pro',
    level: 'Professional',
    domainLabels: {},
    domainIds: [],
    totalQuestions: 0,
    comingSoon: true,
  },
  'DOP-C02': {
    id: 'DOP-C02',
    name: 'DOP-C02',
    fullName: 'AWS Certified DevOps Engineer – Professional',
    shortName: 'DevOps Engineer Pro',
    level: 'Professional',
    domainLabels: {},
    domainIds: [],
    totalQuestions: 0,
    comingSoon: true,
  },
  // Specialty
  'ANS-C01': {
    id: 'ANS-C01',
    name: 'ANS-C01',
    fullName: 'AWS Certified Advanced Networking – Specialty',
    shortName: 'Advanced Networking',
    level: 'Specialty',
    domainLabels: {},
    domainIds: [],
    totalQuestions: 0,
    comingSoon: true,
  },
  'MLS-C01': {
    id: 'MLS-C01',
    name: 'MLS-C01',
    fullName: 'AWS Certified Machine Learning – Specialty',
    shortName: 'Machine Learning Spe',
    level: 'Specialty',
    domainLabels: {},
    domainIds: [],
    totalQuestions: 0,
    comingSoon: true,
  },
  'SCS-C02': {
    id: 'SCS-C02',
    name: 'SCS-C02',
    fullName: 'AWS Certified Security – Specialty',
    shortName: 'Security',
    level: 'Specialty',
    domainLabels: {},
    domainIds: [],
    totalQuestions: 0,
    comingSoon: true,
  },
  'PAS-C01': {
    id: 'PAS-C01',
    name: 'PAS-C01',
    fullName: 'AWS Certified SAP on AWS – Specialty',
    shortName: 'SAP on AWS',
    level: 'Specialty',
    domainLabels: {},
    domainIds: [],
    totalQuestions: 0,
    comingSoon: true,
  },
} as const;

export const EXAM_IDS: ExamId[] = [
  'MLA-C01', 'CLF-C02', 'SAA-C03',
  'AIF-C01', 'DVA-C02', 'SOA-C02', 'DEA-C01',
];

export const COMING_SOON_EXAM_IDS: ExamId[] = [
  'SAP-C02', 'DOP-C02',
  'ANS-C01', 'MLS-C01', 'SCS-C02', 'PAS-C01',
];
