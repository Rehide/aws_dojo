# AWS 演習道場 Ph.2 仕様書

| Key | Value |
|-----|-------|
| Version | 1.0.0 |
| Status | Draft |
| Last Updated | 2026-04-09 |
| Source Plan | plan_ph2.md |

> **本ドキュメントは仕様駆動開発のマスタードキュメントである。**
> すべての実装は本仕様に準拠すること。仕様と実装の乖離が生じた場合、仕様の変更を先に行う。
> Ph.1 仕様（spec.md）を継承し、Ph.2 で追加・変更される部分のみを定義する。

---

## 1. システム概要

### 1.1 目的

Ph.1（MLA-C01 特化）で構築した演習サイトを、**複数の AWS 試験に対応できるマルチ試験プラットフォーム**へ拡張する。
手始めに AWS Cloud Practitioner（CLF-C02）と AWS Solutions Architect – Associate（SAA-C03）を追加し、ユーザーがトップページで試験を選択してから演習を開始できるようにする。

### 1.2 スコープ

- 試験選択 UI の追加（トップページを試験選択 → 出題設定の 2 ステップに変更）
- 試験定数・型定義のマルチ試験対応
- 問題データのディレクトリ構成を試験別に変更
- CLF-C02（100問）・SAA-C03（100問）の問題データ追加
- サイト名・ヘッダーの更新

### 1.3 対象ユーザー

- AWS 認定試験（MLA-C01 / CLF-C02 / SAA-C03）の受験を予定している日本語話者
- PC（Chrome / Safari）または iOS（Safari / Chrome）で利用

### 1.4 名称変更

| 対象 | 変更前 | 変更後 |
|------|--------|--------|
| サイト名 | AWS MLA-C01 問題道場 | AWS 演習道場 |
| GitHub リポジトリ名 | aws_mla_c01_dojo | aws_dojo |
| ローカルディレクトリ名 | aws_mla_c01_dojo | aws_dojo |

---

## 2. 要件定義

### 2.1 機能要件

| # | 要件 | 詳細 |
|---|------|------|
| F1 | 試験選択 | トップページで受験対象の試験（MLA-C01 / CLF-C02 / SAA-C03）を選択できる |
| F2 | 動的ドメイン表示 | 選択した試験のドメイン一覧を出題設定に反映する |
| F3 | 試験別問題データ | 各試験の問題データを独立した JSON ファイルで管理する |
| F4 | 既存機能の維持 | Ph.1 の全機能（分野別学習・模擬試験・結果表示・再挑戦など）をすべて引き継ぐ |

### 2.2 非機能要件

| # | 要件 | 詳細 |
|---|------|------|
| NF1 | 後方互換性 | MLA-C01 の既存動作を一切変えない |
| NF2 | 拡張性 | 将来の試験追加が試験定数と問題 JSON の追加だけで完結する設計にする |
| NF3 | 静的サイト維持 | 引き続き静的エクスポート。サーバー・DB は追加しない |

---

## 3. データ仕様

### 3.1 試験定数テーブル

**ファイル:** `src/constants/exams.ts`

```typescript
export type ExamId = 'MLA-C01' | 'CLF-C02' | 'SAA-C03';

export interface ExamConfig {
  id: ExamId;
  name: string;          // 試験コード（例: "MLA-C01"）
  fullName: string;      // 正式名称
  shortName: string;     // カード表示用短縮名
  domainLabels: Record<number, string>;
  domainIds: number[];   // 有効なドメイン番号
  totalQuestions: number;
}

export const EXAM_CONFIGS: Record<ExamId, ExamConfig> = {
  'MLA-C01': {
    id: 'MLA-C01',
    name: 'MLA-C01',
    fullName: 'AWS Certified Machine Learning Engineer – Associate',
    shortName: 'Machine Learning',
    domainLabels: {
      1: 'Data Engineering for ML',
      2: 'ML Model Development',
      3: 'ML Model Deployment and Operationalization',
      4: 'ML Solution Monitoring and Maintenance',
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
```

> **Ph.1 の `DOMAIN_LABELS`（`src/constants/domains.ts`）は廃止し、`EXAM_CONFIGS` に統合する。**
> 既存コードの `DOMAIN_LABELS` 参照は `EXAM_CONFIGS[examId].domainLabels` に移行する。

### 3.2 型定義の変更

#### `src/types/question.ts`

```typescript
import type { ExamId } from '@/constants/exams';

/** 選択肢。IDは固定、表示ラベルはレンダリング時に付与 */
export interface Choice {
  id: string;   // "c1" | "c2" | "c3" | "c4"
  text: string;
}

/** 問題 */
export interface Question {
  id: number;                                  // 1〜100、一意（試験内）
  domain: number;                              // 試験固有のドメイン番号
  question: string;
  choices: [Choice, Choice, Choice, Choice];
  correctChoiceId: string;
  explanation: string;
}
```

**変更点（Ph.2）:** `domain` の型を `DomainId`（`1 | 2 | 3 | 4` の固定ユニオン型）から `number` に汎用化する。各試験のドメイン検証はバリデーションスクリプトで行う。

#### `src/types/quiz.ts`

```typescript
import type { ExamId } from '@/constants/exams';

export type QuizMode = 'practice' | 'exam';

/** 出題設定 */
export interface QuizSettings {
  examId: ExamId;              // Ph.2 追加: 選択中の試験
  mode: QuizMode;
  domains: number[];           // 選択されたドメイン番号（1つ以上）
  questionCount: QuestionCount;
  shuffleChoices: boolean;
}

export type QuestionCount = 10 | 20 | 30 | 50 | 100;

// AnswerRecord, DisplayChoice, QuizSession, DomainStat は Ph.1 から変更なし
```

**変更点（Ph.2）:**
- `QuizSettings.examId` を追加
- `QuizSettings.domains` の型を `DomainId[]` → `number[]` に汎用化

### 3.3 問題データファイル構成

**Ph.1（変更前）:**
```
src/data/questions.json
```

**Ph.2（変更後）:**
```
src/data/
  mla-c01/
    questions.json    // MLA-C01 の問題データ（既存を移動）
  clf-c02/
    questions.json    // CLF-C02 の問題データ（新規）
  saa-c03/
    questions.json    // SAA-C03 の問題データ（新規）
```

**取り込み方法:** 試験 ID に応じて動的に import する。

```typescript
// src/lib/questions.ts
import type { ExamId } from '@/constants/exams';
import type { Question } from '@/types/question';

import mlaCo1Questions from '@/data/mla-c01/questions.json';
import clfC02Questions from '@/data/clf-c02/questions.json';
import saaC03Questions from '@/data/saa-c03/questions.json';

const QUESTION_MAP: Record<ExamId, Question[]> = {
  'MLA-C01': mlaCo1Questions as Question[],
  'CLF-C02': clfC02Questions as Question[],
  'SAA-C03': saaC03Questions as Question[],
};

export function getQuestions(examId: ExamId): Question[] {
  return QUESTION_MAP[examId];
}
```

### 3.4 CLF-C02 ドメイン定義とバリデーションルール

| ドメイン | 内容 | 出題比率 | 収録問題数 |
|----------|------|----------|----------|
| Domain 1 | クラウドの概念 | 24% | 24問 |
| Domain 2 | セキュリティとコンプライアンス | 30% | 30問 |
| Domain 3 | クラウドテクノロジーとサービス | 34% | 34問 |
| Domain 4 | 請求・料金・サポート | 12% | 12問 |

**バリデーションルール（clf-c02/questions.json）:**

| ルール | 詳細 |
|--------|------|
| 件数 | 配列要素が100件ちょうど |
| ID一意性 | `id` が1〜100で重複なし |
| 選択肢数 | 各問題の `choices` が4要素 |
| 選択肢ID | 各問題内で `"c1"`, `"c2"`, `"c3"`, `"c4"` |
| 正解参照 | `correctChoiceId` が `"c1"` 〜 `"c4"` のいずれか |
| ドメイン分布 | Domain 1: 24問、Domain 2: 30問、Domain 3: 34問、Domain 4: 12問 |
| 空文字禁止 | `question`, `choices[].text`, `explanation` が空文字でない |

### 3.5 SAA-C03 ドメイン定義とバリデーションルール

| ドメイン | 内容 | 出題比率 | 収録問題数 |
|----------|------|----------|----------|
| Domain 1 | セキュアなアーキテクチャの設計 | 30% | 30問 |
| Domain 2 | 弾力性の高いアーキテクチャの設計 | 26% | 26問 |
| Domain 3 | 高パフォーマンスなアーキテクチャの設計 | 24% | 24問 |
| Domain 4 | コスト最適化されたアーキテクチャの設計 | 20% | 20問 |

**バリデーションルール（saa-c03/questions.json）:**

| ルール | 詳細 |
|--------|------|
| 件数 | 配列要素が100件ちょうど |
| ID一意性 | `id` が1〜100で重複なし |
| 選択肢数 | 各問題の `choices` が4要素 |
| 選択肢ID | 各問題内で `"c1"`, `"c2"`, `"c3"`, `"c4"` |
| 正解参照 | `correctChoiceId` が `"c1"` 〜 `"c4"` のいずれか |
| ドメイン分布 | Domain 1: 30問、Domain 2: 26問、Domain 3: 24問、Domain 4: 20問 |
| 空文字禁止 | `question`, `choices[].text`, `explanation` が空文字でない |

### 3.6 バリデーションスクリプト更新

**ファイル:** `scripts/validate-questions.ts`

全試験の問題データを一括検証する。コマンドは変更なし（`npx tsx scripts/validate-questions.ts`）。
試験ごとのルールは `EXAM_CONFIGS` から動的に取得する。

---

## 4. 状態管理アーキテクチャ

### 4.1 QuizContext の変更

**ファイル:** `src/contexts/QuizContext.tsx`

```typescript
interface QuizContextValue {
  selectedExamId: ExamId;                       // Ph.2 追加: 現在選択中の試験
  selectExam: (examId: ExamId) => void;         // Ph.2 追加: 試験選択
  session: QuizSession | null;
  startQuiz: (settings: QuizSettings) => void;
  answerQuestion: (questionId: number, choiceId: string) => void;
  goToQuestion: (index: number) => void;
  finishQuiz: () => void;
  retryIncorrect: () => void;
  retryUnanswered: () => void;
  restartWithSameSettings: () => void;
  reset: () => void;
}
```

**初期値:** `selectedExamId` は `'MLA-C01'`

| メソッド | 動作 |
|----------|------|
| `selectExam` | `selectedExamId` を更新する。`session` は変更しない（設定パネルの再レンダリングのみ） |
| `startQuiz` | `settings.examId` に対応する問題データを `getQuestions(examId)` で取得しセッション初期化 |

その他のメソッドは Ph.1 から変更なし。

### 4.2 画面間の状態フロー

```
トップページ (/)
  ① 試験選択カードをクリック
      → selectExam(examId) 呼び出し
      → 出題設定パネルが選択した試験のドメインで更新される

  ② 出題設定を行い「出題開始」クリック
      → startQuiz(settings) 呼び出し（settings.examId を含む）
      → 問題フィルタリング・サンプリング・シャッフル実行
      → QuizSession を Context に格納
      → router.push('/quiz')

出題ページ (/quiz) ・ 結果ページ (/quiz/result) は Ph.1 から変更なし
```

---

## 5. 画面仕様

### 5.1 トップページ

Ph.2 では試験選択 UI を追加し、出題設定パネルは選択した試験に応じて動的に更新される。

| 項目 | 値 |
|------|-----|
| ルート | `/` |
| ファイル | `src/app/page.tsx` |
| ガード | なし |

#### ローカルState

| State | 型 | 初期値 | 変更点 |
|-------|-----|--------|--------|
| `mode` | `QuizMode` | `'practice'` | 変更なし |
| `selectedDomains` | `Set<number>` | 選択試験の全ドメイン | Ph.2: 試験切替時にリセット |
| `questionCount` | `QuestionCount` | `20` | 変更なし |
| `shuffleChoices` | `boolean` | `true` | 変更なし |

> `selectedExamId` は QuizContext が保持。ローカルStateには持たない。

#### コンポーネントツリー

```
page.tsx
├── ExamSelector                         // Ph.2 追加: 試験選択カード群
│   └── ExamCard x 3                    // MLA-C01 / CLF-C02 / SAA-C03
└── QuizSettingsPanel                    // 選択試験に応じてドメインを動的表示
    ├── ModeTabSelector
    ├── DomainCheckboxGroup              // 選択試験のドメインラベルを使用
    │   └── DomainCheckbox x N
    ├── ShuffleToggle
    ├── QuestionCountSelector
    │   └── CountRadio x 5
    ├── QuestionAvailabilityHint
    └── StartButton
```

#### ExamSelector

| 項目 | 詳細 |
|------|------|
| ファイル | `src/components/ExamSelector.tsx` |
| 表示 | 試験カードを横並び（PC: 3列、モバイル: 縦並び）で表示 |
| 選択状態 | 選択中のカードをハイライト（ボーダー: teal-500、背景: teal-50） |
| 非選択状態 | ボーダー: slate-200、背景: white |

#### ExamCard

| Props | 型 | 説明 |
|-------|----|------|
| `exam` | `ExamConfig` | 試験設定 |
| `isSelected` | `boolean` | 選択中フラグ |
| `onSelect` | `(examId: ExamId) => void` | 選択時コールバック |

| 表示項目 | 内容 |
|---------|------|
| 試験コード | `exam.name`（例: "MLA-C01"） |
| 短縮名 | `exam.shortName`（例: "Machine Learning"） |
| 問題数 | `exam.totalQuestions` + "問" |

#### インタラクション仕様

| 操作 | 動作 |
|------|------|
| 試験カードクリック | `selectExam(examId)` 呼び出し。`selectedDomains` を選択試験の全ドメインにリセット |
| 「分野別学習」タブクリック | `mode` を `'practice'` に設定。ドメインチェックボックスを有効化 |
| 「模擬試験」タブクリック | `mode` を `'exam'` に設定。全ドメインを強制選択、チェックボックスを無効化 |
| ドメインチェックボックス切替 | `selectedDomains` に追加/削除。0個になった場合は開始ボタンを無効化 |
| 問題数ラジオ選択 | `questionCount` を更新 |
| シャッフルトグル切替 | `shuffleChoices` を反転 |
| 「出題開始」クリック | `startQuiz({ examId: selectedExamId, ...settings })` → `/quiz` に遷移 |

#### エッジケース

| 条件 | 処理 |
|------|------|
| 選択ドメイン0個 | 開始ボタン無効化。メッセージ「1つ以上のドメインを選択してください」表示 |
| 要求数 > 利用可能問題数 | 利用可能数に自動調整。メッセージ「選択ドメインの問題数が不足しているため、N問で出題します」表示 |
| 試験切替時 | `selectedDomains` を切替先試験の全ドメインにリセット |

#### レスポンシブ

| 画面幅 | ExamSelector | QuizSettingsPanel |
|--------|-------------|-------------------|
| >= 768px | 3列グリッド | 中央配置、max-width 640px |
| < 768px | 縦1列 | フル幅、左右16pxパディング |

#### 画面レイアウト（ワイヤーフレーム）

```
┌─────────────────────────────────────────┐
│  [ヘッダー] AWS 演習道場                 │
├─────────────────────────────────────────┤
│                                         │
│  ┌─ 試験を選択 ───────────────────────┐ │
│  │                                     │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────┐│ │
│  │  │ MLA-C01  │ │ CLF-C02  │ │SAA-C3││ │
│  │  │ Machine  │ │  Cloud   │ │ Sol. ││ │
│  │  │ Learning │ │ Practit. │ │ Arch.││ │
│  │  └──────────┘ └──────────┘ └──────┘│ │
│  │                                     │ │
│  └─────────────────────────────────────┘ │
│                                         │
│  ┌─ 出題設定 ─────────────────────────┐ │
│  │  （選択した試験のドメインが表示）     │ │
│  │                                     │ │
│  │  [タブ: 分野別学習 | 模擬試験]      │ │
│  │                                     │ │
│  │  □ ドメイン 1: xxxxxxxx             │ │
│  │  □ ドメイン 2: xxxxxxxx             │ │
│  │  □ ドメイン 3: xxxxxxxx             │ │
│  │  □ ドメイン 4: xxxxxxxx             │ │
│  │                                     │ │
│  │  ☑ 選択肢をランダムに並べ替える     │ │
│  │                                     │ │
│  │  ○10 ○20 ○30 ○50 ○100            │ │
│  │                                     │ │
│  │  [ 出題開始 ]                       │ │
│  └─────────────────────────────────────┘ │
│                                         │
├─────────────────────────────────────────┤
│  [フッター]                              │
└─────────────────────────────────────────┘
```

### 5.2 出題ページ（変更点のみ）

Ph.1 から変更なし。以下の点のみ Ph.2 で動的化する:

| 要素 | Ph.1 | Ph.2 |
|------|------|------|
| DomainBadge のラベル | `DOMAIN_LABELS[domain]` | `EXAM_CONFIGS[examId].domainLabels[domain]` |
| Header のサイト名 | AWS MLA-C01 問題道場 | AWS 演習道場 |

### 5.3 結果ページ（変更点のみ）

Ph.1 から変更なし。以下の点のみ Ph.2 で動的化する:

| 要素 | Ph.1 | Ph.2 |
|------|------|------|
| DomainLabel のラベル | `DOMAIN_LABELS[domain]` | `EXAM_CONFIGS[examId].domainLabels[domain]` |

---

## 6. コンポーネント仕様

### 6.1 共通コンポーネント変更

#### Header（`src/components/Header.tsx`）

| 項目 | Ph.1 | Ph.2 |
|------|------|------|
| サイトタイトル | AWS MLA-C01 問題道場 | AWS 演習道場 |
| その他 | 変更なし | - |

### 6.2 追加コンポーネント

#### ExamSelector（`src/components/ExamSelector.tsx`）

| Props | 型 | 説明 |
|-------|----|------|
| `selectedExamId` | `ExamId` | 現在選択中の試験ID |
| `onSelect` | `(examId: ExamId) => void` | 試験選択コールバック |

#### ExamCard（`src/components/ExamCard.tsx`）

| Props | 型 | 説明 |
|-------|----|------|
| `exam` | `ExamConfig` | 試験設定オブジェクト |
| `isSelected` | `boolean` | 選択中フラグ |
| `onSelect` | `(examId: ExamId) => void` | クリックコールバック |

---

## 7. 問題データ作成方針

Ph.1 と同方針（オリジナル作成・AWS 公式ドキュメントを根拠に独自執筆）を継承する。

### 7.1 CLF-C02 主要トピック

| ドメイン | 主要トピック |
|----------|-------------|
| Domain 1 | クラウドの価値提案、Well-Architected フレームワーク、クラウド移行戦略 |
| Domain 2 | IAM、責任共有モデル、Shield、WAF、KMS、Cognito |
| Domain 3 | EC2、S3、RDS、Lambda、VPC、CloudFront、Route 53、ECS、EKS |
| Domain 4 | 料金モデル（オンデマンド/リザーブド/スポット）、Cost Explorer、Trusted Advisor、サポートプラン |

### 7.2 SAA-C03 主要トピック

| ドメイン | 主要トピック |
|----------|-------------|
| Domain 1 | IAM ポリシー、Organizations、SCPs、KMS、Secrets Manager、VPC セキュリティ |
| Domain 2 | Multi-AZ、Auto Scaling、ELB、Route 53 フェイルオーバー、RDS リードレプリカ |
| Domain 3 | ElastiCache、CloudFront、Global Accelerator、DynamoDB、EFS、ストレージ選定 |
| Domain 4 | リザーブドインスタンス、Savings Plans、S3 ストレージクラス、コスト配分タグ |

---

## 8. 開発フェーズ

### Phase 0: リポジトリ・ディレクトリのリネーム

- [ ] GitHub リポジトリ名を `aws_mla_c01_dojo` → `aws_dojo` に変更
- [ ] ローカルディレクトリを `aws_mla_c01_dojo` → `aws_dojo` に変更
- [ ] ローカルの git remote URL を新リポジトリ URL に更新
- [ ] Vercel のプロジェクト表示名を更新

### Phase 1: アーキテクチャリファクタリング

- [ ] `src/constants/exams.ts` を新規作成（`EXAM_CONFIGS`, `ExamId` 等の定義）
- [ ] `src/constants/domains.ts` を廃止し参照箇所を `EXAM_CONFIGS` に移行
- [ ] `src/types/question.ts` の `domain` 型を `number` に変更
- [ ] `src/types/quiz.ts` に `examId: ExamId` を追加
- [ ] `src/data/mla-c01/questions.json` へ既存問題データを移動
- [ ] `src/lib/questions.ts` を新規作成（`getQuestions` 関数）
- [ ] バリデーションスクリプトを試験別対応に更新
- [ ] 既存テスト・ビルドの通過確認

### Phase 2: 状態管理・コンポーネント更新

- [ ] `QuizContext` に `selectedExamId` / `selectExam` を追加
- [ ] `startQuiz` を `examId` に応じた問題取得に変更
- [ ] `ExamSelector` / `ExamCard` コンポーネントを新規作成
- [ ] `QuizSettingsPanel` のドメインを `selectedExamId` から動的取得
- [ ] `QuizSettingsPanel.selectedDomains` を試験切替時にリセット
- [ ] Header のサイト名を「AWS 演習道場」に変更
- [ ] `DomainBadge`・`DomainLabel` のラベル取得を `EXAM_CONFIGS` ベースに変更
- [ ] トップページに `ExamSelector` を追加

### Phase 3: CLF-C02 問題データ作成

- [ ] Domain 1（クラウドの概念）: 24問作成
- [ ] Domain 2（セキュリティとコンプライアンス）: 30問作成
- [ ] Domain 3（クラウドテクノロジーとサービス）: 34問作成
- [ ] Domain 4（請求・料金・サポート）: 12問作成
- [ ] 全問レビュー・バリデーション通過確認

### Phase 4: SAA-C03 問題データ作成

- [ ] Domain 1（セキュアなアーキテクチャ）: 30問作成
- [ ] Domain 2（弾力性の高いアーキテクチャ）: 26問作成
- [ ] Domain 3（高パフォーマンスなアーキテクチャ）: 24問作成
- [ ] Domain 4（コスト最適化されたアーキテクチャ）: 20問作成
- [ ] 全問レビュー・バリデーション通過確認

### Phase 5: 最終調整・デプロイ

- [ ] 全試験の動作確認（PC / iOS）
- [ ] OGP メタデータ更新（タイトル・説明文）
- [ ] Vercel 本番デプロイ・動作確認

---

## 9. 将来的な拡張案（スコープ外）

以下は Ph.2 には含めないが、将来的に追加を検討する:

- DVA-C02（Developer – Associate）の追加
- SOA-C02（SysOps Administrator – Associate）の追加
- 試験ごとの専用 URL 対応
- 試験選択状態の URL パラメータ化（共有リンク対応）
- Ph.1 拡張案（ダークモード、学習履歴 localStorage 保存、ブックマーク等）の実装
