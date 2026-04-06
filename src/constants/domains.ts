export const DOMAIN_LABELS: Record<1 | 2 | 3 | 4, string> = {
  1: "ML向けデータエンジニアリング",
  2: "MLモデル開発",
  3: "MLモデルのデプロイと運用化",
  4: "MLソリューションの監視とメンテナンス",
} as const;

export type DomainId = 1 | 2 | 3 | 4;
