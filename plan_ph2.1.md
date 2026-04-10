# AWS 演習道場 Ph.2.1 開発計画書

## 1. プロジェクト概要

Ph.2 で構築したマルチ試験プラットフォームに対して、以下の 2 点を追加する。

### 1.1 解説欄の充実（choiceExplanations）

現状の `explanation` は正解の理由のみを記述した単一文字列である。
これに加え、各選択肢がなぜ正解・不正解なのかを個別に解説する `choiceExplanations` フィールドを追加する。
フィールドはオプショナルとし、既存データを壊さずに段階的に充実できる設計とする。

### 1.2 新規試験の追加

以下 4 試験を追加し、合計 7 試験対応のプラットフォームとする。

| 試験コード | 正式名称 | ドメイン数 |
|------------|----------|------------|
| AIF-C01 | AWS Certified AI Practitioner | 5 |
| DVA-C02 | AWS Certified Developer – Associate | 4 |
| SOA-C02 | AWS Certified SysOps Administrator – Associate | 6 |
| DEA-C01 | AWS Certified Data Engineer – Associate | 4 |

---

## 2. 要件定義

### 2.1 機能要件

| # | 要件 | 詳細 |
|---|------|------|
| F1 | choiceExplanations 表示 | 解説欄に各選択肢の個別解説を表示する（正解・不正解問わず常時表示） |
| F2 | 段階的データ充実 | `choiceExplanations` が未設定の問題では各選択肢解説セクションを非表示にする |
| F3 | 新規試験選択 | トップページの試験選択カードに AIF-C01 / DVA-C02 / SOA-C02 / DEA-C01 を追加 |
| F4 | 新規試験の演習 | 既存機能（分野別学習・模擬試験・結果表示・再挑戦）がすべて動作する |

### 2.2 非機能要件

| # | 要件 | 詳細 |
|---|------|------|
| NF1 | 後方互換性 | 既存試験（MLA-C01 / CLF-C02 / SAA-C03）の動作を変えない |
| NF2 | 5・6ドメイン対応 | AIF-C01（5ドメイン）・SOA-C02（6ドメイン）が既存アーキテクチャで動作する |
| NF3 | 静的サイト維持 | 引き続き静的エクスポート。サーバー・DB は追加しない |

---

## 3. 対象試験とドメイン定義

### 3.1 AWS Certified AI Practitioner（AIF-C01）

| ドメイン | 内容 | 出題比率 | 収録目標 |
|----------|------|----------|----------|
| Domain 1 | AIとMLの基礎 | 20% | 20問 |
| Domain 2 | 生成AIの基礎 | 24% | 24問 |
| Domain 3 | 基盤モデルのアプリケーション | 28% | 28問 |
| Domain 4 | 責任あるAIのガイドライン | 14% | 14問 |
| Domain 5 | AIソリューションのセキュリティ・コンプライアンス・ガバナンス | 14% | 14問 |

合計: **100問**

### 3.2 AWS Certified Developer – Associate（DVA-C02）

| ドメイン | 内容 | 出題比率 | 収録目標 |
|----------|------|----------|----------|
| Domain 1 | AWSサービスによる開発 | 32% | 32問 |
| Domain 2 | セキュリティ | 26% | 26問 |
| Domain 3 | デプロイ | 24% | 24問 |
| Domain 4 | トラブルシューティングと最適化 | 18% | 18問 |

合計: **100問**

### 3.3 AWS Certified SysOps Administrator – Associate（SOA-C02）

| ドメイン | 内容 | 出題比率 | 収録目標 |
|----------|------|----------|----------|
| Domain 1 | モニタリング・ロギング・修復 | 20% | 20問 |
| Domain 2 | 信頼性とビジネス継続性 | 16% | 16問 |
| Domain 3 | デプロイ・プロビジョニング・自動化 | 18% | 18問 |
| Domain 4 | セキュリティとコンプライアンス | 16% | 16問 |
| Domain 5 | ネットワーキングとコンテンツ配信 | 18% | 18問 |
| Domain 6 | コストとパフォーマンスの最適化 | 12% | 12問 |

合計: **100問**

### 3.4 AWS Certified Data Engineer – Associate（DEA-C01）

| ドメイン | 内容 | 出題比率 | 収録目標 |
|----------|------|----------|----------|
| Domain 1 | データの取り込みと変換 | 34% | 34問 |
| Domain 2 | データストア管理 | 26% | 26問 |
| Domain 3 | データ運用とサポート | 22% | 22問 |
| Domain 4 | データセキュリティとガバナンス | 18% | 18問 |

合計: **100問**

---

## 4. 開発フェーズ

### Phase 1: choiceExplanations – 型・バリデーション・UI

- [x] `src/types/question.ts` に `choiceExplanations` を追加（オプショナル）
- [x] `scripts/validate-questions.ts` に `choiceExplanations` のバリデーションを追加
- [x] `FeedbackPanel.tsx` に各選択肢解説セクションを追加
- [x] 結果ページの解説表示にも `choiceExplanations` を反映
- [x] `QuizSettingsPanel.tsx` のドメイン表記を「ドメイン N:」→「DomainN:」に変更
- [x] `Footer.tsx` のコピーライトを「AWS MLA-C01 演習道場」→「AWS 演習道場」に修正
- [x] 型チェック・テスト・ビルド通過確認

### Phase 2: 新規試験定数追加

- [x] `src/constants/exams.ts` に AIF-C01 / DVA-C02 / SOA-C02 / DEA-C01 を追加
- [x] `scripts/validate-questions.ts` の `EXPECTED_DOMAIN_COUNTS` に 4 試験を追加
- [x] 空の `questions.json`（`[]`）を各試験ディレクトリに作成してビルド通過確認
- [x] `ExamSelector.tsx` を 7 試験対応レイアウト（`grid-cols-2 sm:grid-cols-4`）に更新

### Phase 3: 既存問題への choiceExplanations 追加

- [x] MLA-C01（100問）: `choiceExplanations` を追記
- [x] CLF-C02（100問）: `choiceExplanations` を追記
- [x] SAA-C03（100問）: `choiceExplanations` を追記
- [x] バリデーション通過確認

### Phase 4: AIF-C01 問題データ作成

- [x] Domain 1（AIとMLの基礎）: 20問作成（choiceExplanations含む）
- [x] Domain 2（生成AIの基礎）: 24問作成（choiceExplanations含む）
- [x] Domain 3（基盤モデルのアプリケーション）: 28問作成（choiceExplanations含む）
- [x] Domain 4（責任あるAIのガイドライン）: 14問作成（choiceExplanations含む）
- [x] Domain 5（セキュリティ・コンプライアンス・ガバナンス）: 14問作成（choiceExplanations含む）
- [x] 全問レビュー・バリデーション通過確認

### Phase 5: DVA-C02 問題データ作成

- [x] Domain 1（AWSサービスによる開発）: 32問作成（choiceExplanations含む）
- [x] Domain 2（セキュリティ）: 26問作成（choiceExplanations含む）
- [x] Domain 3（デプロイ）: 24問作成（choiceExplanations含む）
- [x] Domain 4（トラブルシューティングと最適化）: 18問作成（choiceExplanations含む）
- [x] 全問レビュー・バリデーション通過確認

### Phase 6: SOA-C02 問題データ作成

- [x] Domain 1（モニタリング・ロギング・修復）: 20問作成（choiceExplanations含む）
- [x] Domain 2（信頼性とビジネス継続性）: 16問作成（choiceExplanations含む）
- [x] Domain 3（デプロイ・プロビジョニング・自動化）: 18問作成（choiceExplanations含む）
- [x] Domain 4（セキュリティとコンプライアンス）: 16問作成（choiceExplanations含む）
- [x] Domain 5（ネットワーキングとコンテンツ配信）: 18問作成（choiceExplanations含む）
- [x] Domain 6（コストとパフォーマンスの最適化）: 12問作成（choiceExplanations含む）
- [x] 全問レビュー・バリデーション通過確認

### Phase 7: DEA-C01 問題データ作成

- [x] Domain 1（データの取り込みと変換）: 34問作成（choiceExplanations含む）
- [x] Domain 2（データストア管理）: 26問作成（choiceExplanations含む）
- [x] Domain 3（データ運用とサポート）: 22問作成（choiceExplanations含む）
- [x] Domain 4（データセキュリティとガバナンス）: 18問作成（choiceExplanations含む）
- [x] 全問レビュー・バリデーション通過確認

### Phase 8: 最終調整・デプロイ

- [ ] 全試験の動作確認（PC / iOS）
- [x] OGP メタデータ更新（タイトル・説明文）
- [ ] Vercel 本番デプロイ・動作確認

---

## 5. 将来的な拡張案（スコープ外）

- SOA-C02（SysOps Administrator – Associate）以外の上位試験（SAP-C02 等）
- 試験ごとの専用 URL 対応
- 学習履歴の localStorage 保存
- ブックマーク機能
- ダークモード
