# AWS MLA-C01 問題道場 仕様書

| Key | Value |
|-----|-------|
| Version | 0.2.0 |
| Status | Draft |
| Last Updated | 2026-04-04 |
| Source Plan | plan.md |

> **本ドキュメントは仕様駆動開発のマスタードキュメントである。**
> すべての実装は本仕様に準拠すること。仕様と実装の乖離が生じた場合、仕様の変更を先に行う。

---

## 1. システム概要

### 1.1 目的

AWS Certified Machine Learning Engineer – Associate（MLA-C01）の試験対策として、オリジナルの練習問題をWeb上で演習できるサイトを提供する。

### 1.2 スコープ

- 3画面構成のクライアントサイドSPA（トップ / 出題 / 結果）
- オリジナル問題100問（4ドメイン）
- サーバーサイド処理・データベースなし

### 1.3 対象ユーザー

- AWS認定試験（MLA-C01）の受験を予定している日本語話者
- PC（Chrome / Safari）またはiOS（Safari / Chrome）で利用

### 1.4 デザイン・コンテンツ方針

| 方針 | 詳細 |
|------|------|
| 情報設計 | 学習サイトの「出題設定 → 問題表示 → 結果表示」フローを参考にする |
| 独自実装 | 文言・配色・レイアウト詳細・UI部品はすべてオリジナル。既存サイトを模倣しない |
| 問題コンテンツ | 問題文・選択肢・解説はすべてオリジナル作成。AWS公式ドキュメントを根拠に独自執筆 |

---

## 2. 技術仕様

### 2.1 依存関係

| パッケージ | バージョン | 用途 |
|-----------|-----------|------|
| Node.js | >= 20.x (LTS) | ランタイム |
| Next.js | 15.x | フレームワーク（App Router） |
| React | 19.x | UI（Next.js 15同梱） |
| TypeScript | 5.x | 言語（strict mode） |
| Tailwind CSS | 4.x | スタイリング |

**追加のランタイム依存は使用しない。** UIライブラリ・状態管理ライブラリは導入しない。

### 2.2 開発用依存

| パッケージ | 用途 |
|-----------|------|
| eslint + eslint-config-next | Lint |
| prettier + prettier-plugin-tailwindcss | フォーマット |
| vitest + @testing-library/react | テスト |

### 2.3 Next.js 設定

```typescript
// next.config.ts
const nextConfig = {
  output: 'export',  // 静的エクスポート
};
```

- 全ページをクライアントコンポーネントとして実装
- サーバーコンポーネント・API Routes は使用しない

### 2.4 ホスティング

Vercel を使用。`output: 'export'` による静的サイトとしてデプロイする。

---

## 3. データ仕様

### 3.1 ドメイン定数テーブル

ドメインの表示名は問題データに持たず、定数テーブルで一元管理する。

**ファイル:** `src/constants/domains.ts`

```typescript
export const DOMAIN_LABELS: Record<1 | 2 | 3 | 4, string> = {
  1: 'Data Engineering for ML',
  2: 'ML Model Development',
  3: 'ML Model Deployment and Operationalization',
  4: 'ML Solution Monitoring and Maintenance',
} as const;

export type DomainId = 1 | 2 | 3 | 4;
```

### 3.2 型定義

#### `src/types/question.ts`

```typescript
import type { DomainId } from '@/constants/domains';

/** 選択肢。IDは固定、表示ラベルはレンダリング時に付与 */
export interface Choice {
  id: string;   // "c1" | "c2" | "c3" | "c4"
  text: string;
}

/** 問題 */
export interface Question {
  id: number;                                  // 1〜100、一意
  domain: DomainId;
  question: string;                            // 改行を含む場合あり
  choices: [Choice, Choice, Choice, Choice];   // 必ず4つ
  correctChoiceId: string;                     // choices[].id のいずれか
  explanation: string;                         // 改行を含む場合あり
}
```

**変更履歴（v0.2.0）:** `domainName` フィールドを削除。表示名は `DOMAIN_LABELS[question.domain]` で解決する。

#### `src/types/quiz.ts`

```typescript
import type { DomainId } from '@/constants/domains';

/**
 * 学習モード
 * - 'practice': 分野指定モード。1問ごとに即時フィードバック（正誤+解説）を表示
 * - 'exam': 模擬試験モード。回答中は正誤を表示せず、全問回答後に一括採点
 */
export type QuizMode = 'practice' | 'exam';

/** 出題設定 */
export interface QuizSettings {
  mode: QuizMode;
  domains: DomainId[];              // 選択されたドメイン（1つ以上）
  questionCount: QuestionCount;
  shuffleChoices: boolean;
}

export type QuestionCount = 10 | 20 | 30 | 50 | 100;

/** シャッフル後の表示用選択肢 */
export interface DisplayChoice {
  id: string;      // 元の choice.id
  label: string;   // "ア" | "イ" | "ウ" | "エ"
  text: string;
}

/** 各問題の回答記録 */
export interface AnswerRecord {
  questionId: number;
  selectedChoiceId: string | null;   // null = 未回答
  isCorrect: boolean | null;         // null = 未回答、true = 正解、false = 不正解
  displayChoices: DisplayChoice[];   // 出題時のシャッフル順スナップショット
}

/** クイズセッション全体の状態 */
export interface QuizSession {
  settings: QuizSettings;
  questions: Question[];       // このセッションの出題リスト（順序確定済み）
  answers: AnswerRecord[];     // questions と同じインデックスで対応
  currentIndex: number;        // 0始まり
  isFinished: boolean;
}

/** ドメイン別統計 */
export interface DomainStat {
  domain: DomainId;
  total: number;
  correct: number;
  rate: number;                // 0.0 〜 1.0
}
```

**変更履歴（v0.2.0）:**
- `QuizMode`: `'domain' | 'mock'` → `'practice' | 'exam'`。名称を学習方式の責務に統一
- `AnswerRecord.isCorrect`: `boolean` → `boolean | null`。未回答と不正解を区別
- `DomainStat`: `domainName` を削除。表示名は定数テーブルから解決
- `QuestionCount` 型を export し、UI state との一貫性を確保

### 3.3 問題データファイル

**ファイルパス:** `src/data/questions.json`

**取り込み方法:** `import` による静的取り込み（fetchは使用しない）

```typescript
import questionsData from '@/data/questions.json';
const questions: Question[] = questionsData;
```

**データ例:**

```json
{
  "id": 1,
  "domain": 1,
  "question": "問題文...",
  "choices": [
    { "id": "c1", "text": "選択肢1" },
    { "id": "c2", "text": "選択肢2" },
    { "id": "c3", "text": "選択肢3" },
    { "id": "c4", "text": "選択肢4" }
  ],
  "correctChoiceId": "c1",
  "explanation": "解説文..."
}
```

### 3.4 バリデーションルール

| ルール | 詳細 |
|--------|------|
| 件数 | 配列要素が100件ちょうど |
| ID一意性 | `id` が1〜100で重複なし |
| 選択肢数 | 各問題の `choices` が4要素 |
| 選択肢ID | 各問題内で `"c1"`, `"c2"`, `"c3"`, `"c4"` |
| 正解参照 | `correctChoiceId` が `"c1"` 〜 `"c4"` のいずれか |
| ドメイン分布 | Domain 1: 28問、Domain 2: 26問、Domain 3: 22問、Domain 4: 24問 |
| 空文字禁止 | `question`, `choices[].text`, `explanation` が空文字でない |
| domainName不在 | `domainName` フィールドが存在しないこと |

**ビルド時バリデーション:** `scripts/validate-questions.ts` で上記ルールを検証する。

---

## 4. 状態管理アーキテクチャ

### 4.1 方針

React Context（`QuizProvider`）で管理する。外部ライブラリは使用しない。

**状態保持ポリシー（v1確定方針）:**

| 項目 | 方針 |
|------|------|
| 永続化 | **行わない**。localStorage / Cookie は使用しない |
| リフレッシュ時 | セッション状態は失われる。ガードにより `/` にリダイレクト |
| URLパラメータ | セッション情報は含めない |
| 将来拡張 | localStorage による学習履歴保存は plan.md「将来的な拡張案」として管理 |

> **plan.md との整合性:** plan.md §9「将来的な拡張案」に「学習履歴の保存（localStorage）」を記載済み。v1では Context のみとし、永続化は行わない。

### 4.2 画面間の状態フロー

```
トップページ (/)
  ユーザーが設定を行い「出題開始」クリック
    → startQuiz(settings) 呼び出し
    → 問題フィルタリング・サンプリング・シャッフル実行
    → QuizSession を Context に格納
    → router.push('/quiz')

出題ページ (/quiz)
  Context から QuizSession を読み取り
  ガード: session が null → router.replace('/')

  ■ practice モード:
    選択肢クリック → 即座に正誤判定 + 解説表示
    「次の問題」で次へ進む
    最終問題回答後「結果を見る」→ finishQuiz() → /quiz/result

  ■ exam モード:
    選択肢クリック → 選択状態を記録するのみ（正誤・解説は非表示）
    選択の変更が可能（同じ問題で別の選択肢をクリックし直せる）
    全問を自由にナビゲーション可能
    「採点する」クリック → finishQuiz() で一括採点 → /quiz/result

結果ページ (/quiz/result)
  Context から QuizSession を読み取り
  ガード: session が null または isFinished が false → router.replace('/')
  「不正解のみ再挑戦」→ retryIncorrect() → router.push('/quiz')
  「未回答のみ再挑戦」→ retryUnanswered() → router.push('/quiz')
  「同じ設定でもう一度」→ restartWithSameSettings() → router.push('/quiz')
  「トップに戻る」→ reset() → router.push('/')
```

### 4.3 Context API

**ファイル:** `src/contexts/QuizContext.tsx`（`'use client'`）

```typescript
interface QuizContextValue {
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

| メソッド | 動作 |
|----------|------|
| `startQuiz` | 設定に基づき問題を選択・セッション初期化。選択肢シャッフルも実行し `AnswerRecord.displayChoices` を確定。全 `AnswerRecord` を `{ selectedChoiceId: null, isCorrect: null }` で初期化 |
| `answerQuestion` | `questionId` に一致する回答を更新。practice モードでは `isCorrect` を即時判定。exam モードでは `selectedChoiceId` のみ記録し `isCorrect` は `null` のまま |
| `goToQuestion` | `currentIndex` を変更 |
| `finishQuiz` | `isFinished` を `true` に設定。exam モードではこのタイミングで全問の `isCorrect` を一括判定 |
| `retryIncorrect` | `isCorrect === false` の問題だけで新セッション生成。選択肢を再シャッフル |
| `retryUnanswered` | `isCorrect === null`（未回答）の問題だけで新セッション生成 |
| `restartWithSameSettings` | 同じ `QuizSettings` で問題を再選択・新セッション生成 |
| `reset` | `session` を `null` に戻す |

**変更履歴（v0.2.0）:**
- `answerQuestion` の引数を `(questionIndex, choiceId)` → `(questionId, choiceId)` に変更。index 依存を排除し、再挑戦や将来拡張でのバグを防止
- `retryUnanswered` を追加
- practice / exam モードでの `answerQuestion` の挙動差を明記

**便利フック:** `src/hooks/useQuiz.ts`

```typescript
export function useQuiz(): QuizContextValue {
  return useContext(QuizContext);
}
```

### 4.4 Provider配置

```
src/app/layout.tsx
  └── QuizProvider          ← ここで children をラップ
        ├── Header
        ├── <main>{children}</main>
        └── Footer
```

---

## 5. 画面仕様

### 5.1 トップページ

| 項目 | 値 |
|------|-----|
| ルート | `/` |
| ファイル | `src/app/page.tsx` |
| ガード | なし |

#### ローカルState

| State | 型 | 初期値 |
|-------|-----|--------|
| `mode` | `QuizMode` | `'practice'` |
| `selectedDomains` | `Set<DomainId>` | `new Set([1,2,3,4])` |
| `questionCount` | `QuestionCount` | `20` |
| `shuffleChoices` | `boolean` | `true` |

#### コンポーネントツリー

```
page.tsx
└── QuizSettingsPanel
    ├── ModeTabSelector              // 「分野別学習」「模擬試験」タブ
    ├── DomainCheckboxGroup          // ドメイン選択（4つのチェックボックス）
    │   └── DomainCheckbox x 4
    ├── ShuffleToggle                // 「選択肢をランダムに並べ替える」
    ├── QuestionCountSelector        // 問題数ラジオボタン
    │   └── CountRadio x 5
    ├── QuestionAvailabilityHint     // 「最大 N 問出題可能」
    └── StartButton                  // 「出題開始」
```

#### インタラクション仕様

| 操作 | 動作 |
|------|------|
| 「分野別学習」タブクリック | `mode` を `'practice'` に設定。ドメインチェックボックスを有効化 |
| 「模擬試験」タブクリック | `mode` を `'exam'` に設定。全ドメインを強制選択、チェックボックスを無効化 |
| ドメインチェックボックス切替 | `selectedDomains` に追加/削除。0個になった場合は開始ボタンを無効化 |
| 問題数ラジオ選択 | `questionCount` を更新 |
| シャッフルトグル切替 | `shuffleChoices` を反転 |
| 「出題開始」クリック | `startQuiz(settings)` → `/quiz` に遷移 |

#### モード別UI差分

| 要素 | practice | exam |
|------|----------|------|
| ドメインチェックボックス | 有効（個別選択可） | 無効（全ドメイン強制選択） |
| 問題数選択 | 全選択肢有効 | 全選択肢有効 |
| シャッフルトグル | 有効 | 有効 |
| モード説明テキスト | 「1問ごとに正解と解説を確認できます」 | 「全問回答後にまとめて採点します」 |

#### エッジケース

| 条件 | 処理 |
|------|------|
| 選択ドメイン0個 | 開始ボタン無効化。メッセージ「1つ以上のドメインを選択してください」表示 |
| 要求数 > 利用可能問題数 | 利用可能数に自動調整。メッセージ「選択ドメインの問題数が不足しているため、N問で出題します」表示 |

#### レスポンシブ

| 画面幅 | レイアウト |
|--------|----------|
| >= 768px | 設定パネル中央配置、max-width 640px |
| < 768px | フル幅、左右16pxパディング |

---

### 5.2 出題ページ

| 項目 | 値 |
|------|-----|
| ルート | `/quiz` |
| ファイル | `src/app/quiz/page.tsx` |
| ガード | `session` が null → `router.replace('/')` |

#### コンポーネントツリー

```
page.tsx
├── QuizProgress
│   ├── QuestionCounter              // 「問 3 / 20」
│   ├── DomainBadge                  // ドメイン名バッジ
│   └── ProgressBar                  // 進捗バー
├── QuestionCard
│   ├── QuestionText                 // 問題文
│   └── ChoiceList
│       └── ChoiceButton x 4        // ア, イ, ウ, エ
├── FeedbackPanel                    // practice モードのみ、回答後に表示
│   ├── CorrectIncorrectBanner       // 「正解！」or「不正解」
│   ├── CorrectAnswerDisplay         // 「正解: ア. 〇〇〇」
│   └── ExplanationText              // 解説文
└── QuizNavigation
    ├── PrevButton                   // 「前の問題」
    ├── NextButton                   // 「次の問題」
    └── FinishButton                 // practice:「結果を見る」/ exam:「採点する」
```

#### インタラクション仕様（practice モード）

| 操作 | 条件 | 動作 |
|------|------|------|
| 選択肢クリック | 未回答 | `answerQuestion(questionId, choiceId)` 実行。即時に `isCorrect` 判定。FeedbackPanel表示。正解の選択肢を緑、不正解を赤にハイライト。全選択肢を無効化 |
| 選択肢クリック | 回答済み | 何もしない（ボタン無効） |
| 「次の問題」クリック | 最終問題でない | `currentIndex + 1`。ページ先頭にスクロール |
| 「前の問題」クリック | 最初の問題でない | `currentIndex - 1`。ページ先頭にスクロール |
| 「結果を見る」クリック | 最終問題 + 回答済み | `finishQuiz()` → `/quiz/result` に遷移 |

#### インタラクション仕様（exam モード）

| 操作 | 条件 | 動作 |
|------|------|------|
| 選択肢クリック | 未選択 | `answerQuestion(questionId, choiceId)` で選択記録。`isCorrect` は `null` のまま。選択肢にチェックマーク表示。FeedbackPanel は非表示 |
| 選択肢クリック | 別の選択肢を選択中 | 選択を変更。`answerQuestion(questionId, newChoiceId)` で上書き |
| 選択肢クリック | 同じ選択肢を選択中 | 何もしない |
| 「次の問題」クリック | 最終問題でない | `currentIndex + 1`。ページ先頭にスクロール |
| 「前の問題」クリック | 最初の問題でない | `currentIndex - 1`。ページ先頭にスクロール |
| 「採点する」クリック | 最終問題表示中 | `finishQuiz()` で全問一括採点 → `/quiz/result` に遷移。未回答の問題は `isCorrect: null` のまま |

#### exam モードの「採点する」ボタン

- 最終問題表示時に表示（practice モードの「結果を見る」と同じ位置）
- 未回答の問題があっても押下可能（未回答は不正解ではなく「未回答」として扱う）
- 確認メッセージ: 未回答がある場合「未回答の問題が N 問あります。採点しますか？」を表示

#### ChoiceButton の視覚状態

全6状態。Props の `state` と表示の対応は以下の通り:

| state 値 | 説明 | ボーダー | 背景 | テキスト色 | アイコン |
|----------|------|---------|------|-----------|---------|
| `'default'` | 未回答・未ホバー | slate-200 | white | slate-800 | なし |
| `'hover'` | 未回答・ホバー中 | teal-400 | teal-50 | slate-800 | なし |
| `'selected'` | exam モードで選択中（正誤未確定） | teal-500 | teal-50 | teal-800 | チェック |
| `'correct'` | 正解の選択肢（自分が選択 or 正解表示） | green-500 | green-50 | green-800 | チェック |
| `'incorrect'` | 自分が選択した不正解の選択肢 | red-500 | red-50 | red-800 | バツ |
| `'disabled'` | 回答後の非選択・非正解の選択肢 | slate-200 | slate-50 | slate-400 | なし |

**状態遷移の適用条件:**

| 条件 | practice モード | exam モード |
|------|----------------|-------------|
| 未回答時 | default / hover | default / hover |
| 選択直後（採点前） | - （即時判定のため該当なし） | selected（選択中）/ default（非選択） |
| 判定後・正解の選択肢 | correct | correct |
| 判定後・選択した不正解 | incorrect | incorrect |
| 判定後・その他 | disabled | disabled |

#### ナビゲーションボタンの表示条件

| ボタン | 表示条件 | 無効条件 |
|--------|---------|---------|
| 「前の問題」 | 常に表示 | `currentIndex === 0` |
| 「次の問題」 | `currentIndex < questions.length - 1` | なし |
| 「結果を見る」(practice) | 最終問題 + practice モード | 未回答 |
| 「採点する」(exam) | 最終問題 + exam モード | なし（未回答でも押下可能） |

#### レスポンシブ

| 画面幅 | レイアウト |
|--------|----------|
| >= 768px | 問題カード中央配置、max-width 768px |
| < 768px | フル幅、16pxパディング。選択肢ボタンはフル幅、min-height 48px |

---

### 5.3 結果ページ

| 項目 | 値 |
|------|-----|
| ルート | `/quiz/result` |
| ファイル | `src/app/quiz/result/page.tsx` |
| ガード | `session` が null または `isFinished` が false → `router.replace('/')` |

#### コンポーネントツリー

```
page.tsx
├── ScoreSummary                     // 「16 / 20 正解（80.0%）」
├── DomainStatsPanel
│   └── DomainStatRow x N
│       ├── DomainLabel              // DOMAIN_LABELS から取得
│       ├── ScoreText                // 「5/7 正解」
│       ├── RateBar                  // プログレスバー
│       └── RatePercent              // 「71.4%」
├── WeaknessAlert                    // 弱点ドメイン指摘
├── ActionButtons
│   ├── RetryIncorrectButton         // 「不正解のみ再挑戦（N問）」
│   ├── RetryUnansweredButton        // 「未回答のみ再挑戦（N問）」※ 該当ありの場合のみ
│   ├── RestartButton                // 「同じ設定でもう一度」
│   └── HomeButton                   // 「トップに戻る」
└── QuestionReviewList
    ├── ReviewFilter                 // 「全問」「不正解のみ」「未回答のみ」切替
    └── ReviewItem x N
        ├── QuestionNumber           // 「問1」
        ├── StatusIcon               // 正解=チェック / 不正解=バツ / 未回答=ハイフン
        ├── DomainBadge
        └── ShowExplanationLink      // 「解説を見る」→ 展開
```

#### インタラクション仕様

| 操作 | 動作 |
|------|------|
| 「不正解のみ再挑戦」クリック | `retryIncorrect()` → `/quiz` に遷移。`isCorrect === false` が0問の場合はボタン無効化 |
| 「未回答のみ再挑戦」クリック | `retryUnanswered()` → `/quiz` に遷移。`isCorrect === null` が0問の場合はボタン非表示 |
| 「同じ設定でもう一度」クリック | `restartWithSameSettings()` → `/quiz` に遷移 |
| 「トップに戻る」クリック | `reset()` → `/` に遷移 |
| 「解説を見る」クリック | 該当問題の問題文・ユーザーの回答・正解・解説をインラインで展開/折りたたみ |
| 「全問」フィルタ | 問題一覧を全件表示 |
| 「不正解のみ」フィルタ | `isCorrect === false` の問題のみ表示 |
| 「未回答のみ」フィルタ | `isCorrect === null` の問題のみ表示 |

#### スコア計算における未回答の扱い

| 項目 | 計算方法 |
|------|---------|
| 正答率の分母 | 全出題数（未回答を含む） |
| 正答率の分子 | `isCorrect === true` の件数のみ |
| 未回答の表示 | 正解・不正解とは別に「未回答: N問」として明示 |

#### レスポンシブ

| 画面幅 | レイアウト |
|--------|----------|
| >= 768px | ドメイン統計は2列グリッド（2x2）、max-width 768px |
| < 768px | シングルカラム、フル幅 |

---

## 6. コンポーネント仕様

### 6.1 共通コンポーネント

#### Header（`src/components/Header.tsx`）

| 項目 | 値 |
|------|-----|
| Props | なし（現在のルートをパスから判定） |
| 内容 | サイトタイトル + ナビゲーションリンク |
| ナビ項目 | 「ホーム」(`/`) |
| PC | 横並びナビ |
| モバイル | ハンバーガーメニュー |
| 背景色 | primary（#1E3A5F） |
| テキスト色 | white |

#### Footer（`src/components/Footer.tsx`）

| 項目 | 値 |
|------|-----|
| Props | なし |
| 内容 | コピーライト表記 |
| 背景色 | slate-800 |
| テキスト色 | slate-400 |

### 6.2 トップページコンポーネント

#### QuizSettingsPanel

| 項目 | 値 |
|------|-----|
| ファイル | `src/components/QuizSettingsPanel.tsx` |
| Props | `onStart: (settings: QuizSettings) => void` |
| 内部State | `mode`, `selectedDomains`, `questionCount`, `shuffleChoices` |

#### ModeTabSelector

| Props | 型 |
|-------|-----|
| `mode` | `QuizMode` |
| `onChange` | `(mode: QuizMode) => void` |

タブ表示名: `'practice'` → 「分野別学習」、`'exam'` → 「模擬試験」

#### DomainCheckboxGroup

| Props | 型 |
|-------|-----|
| `selectedDomains` | `Set<DomainId>` |
| `onChange` | `(domains: Set<DomainId>) => void` |
| `disabled` | `boolean`（exam モード時 true） |

#### QuestionCountSelector

| Props | 型 |
|-------|-----|
| `count` | `QuestionCount` |
| `onChange` | `(count: QuestionCount) => void` |

選択肢: 10, 20, 30, 50, 100

### 6.3 出題ページコンポーネント

#### QuestionCard

| Props | 型 |
|-------|-----|
| `question` | `Question` |
| `displayChoices` | `DisplayChoice[]` |
| `selectedChoiceId` | `string \| null` |
| `onSelect` | `(choiceId: string) => void` |

#### ChoiceButton

| Props | 型 |
|-------|-----|
| `choice` | `DisplayChoice` |
| `state` | `ChoiceButtonState` |
| `onClick` | `() => void` |
| `disabled` | `boolean` |

```typescript
type ChoiceButtonState =
  | 'default'     // 未選択
  | 'hover'       // ホバー中（CSS疑似クラスで処理可、propsでの明示は不要）
  | 'selected'    // exam モード: 選択中（正誤未確定）
  | 'correct'     // 正解の選択肢
  | 'incorrect'   // 選択した不正解
  | 'disabled';   // 判定後のその他選択肢
```

> **補足:** `hover` はCSS `:hover` で処理するため、実装上は `state` props に含めなくてよい。`ChoiceButtonState` の実質的な値は `'default' | 'selected' | 'correct' | 'incorrect' | 'disabled'` の5つ。

#### FeedbackPanel

| Props | 型 |
|-------|-----|
| `isCorrect` | `boolean` |
| `correctChoice` | `DisplayChoice` |
| `explanation` | `string` |

practice モードのみで使用。exam モードでは表示しない。回答後にアニメーションなしで即座に表示する。

#### ProgressBar

| Props | 型 |
|-------|-----|
| `current` | `number`（0始まり） |
| `total` | `number` |

表示: `(current + 1) / total` の割合でバーを塗りつぶし。

#### QuizNavigation

| Props | 型 |
|-------|-----|
| `currentIndex` | `number` |
| `totalQuestions` | `number` |
| `isCurrentAnswered` | `boolean` |
| `mode` | `QuizMode` |
| `onPrev` | `() => void` |
| `onNext` | `() => void` |
| `onFinish` | `() => void` |

`mode` に応じて最終ボタンのラベルと無効条件を切り替える。

### 6.4 結果ページコンポーネント

#### ScoreSummary

| Props | 型 |
|-------|-----|
| `correct` | `number` |
| `total` | `number` |
| `unanswered` | `number` |

表示形式: `"16 / 20 正解（80.0%）"`。`unanswered > 0` の場合は追加で `"未回答: 2問"` を表示。

#### DomainStatsPanel

| Props | 型 |
|-------|-----|
| `stats` | `DomainStat[]` |

各ドメイン行に「正解数/出題数」テキスト + プログレスバー + パーセント表示。ドメイン名は `DOMAIN_LABELS` から解決。

#### WeaknessAlert

| Props | 型 |
|-------|-----|
| `weakDomains` | `DomainStat[]` |

空配列の場合は何も表示しない。1つ以上の場合、警告カードを表示。

#### QuestionReviewList

| Props | 型 |
|-------|-----|
| `questions` | `Question[]` |
| `answers` | `AnswerRecord[]` |

内部Stateとして `filter: 'all' | 'incorrect' | 'unanswered'` を持つ。

---

## 7. ビジネスロジック仕様

### 7.1 問題選択（`src/utils/selectQuestions.ts`）

```typescript
function selectQuestions(
  allQuestions: Question[],
  settings: QuizSettings
): Question[]
```

**アルゴリズム:**

1. `allQuestions` を `settings.domains` でフィルタリング
2. Fisher-Yates シャッフルで並び替え
3. 先頭から `min(settings.questionCount, filtered.length)` 件を取得

**exam モードの問題抽出方針（確定）:**

exam モードでもランダムサンプリングとする。本番比率（28:26:22:24）による層別抽出は行わない。

理由:
- 問題数が100問と少ないため、層別抽出では問題の重複が多くなる
- 問題数が十分に増えた段階で層別抽出を検討する（将来拡張）

### 7.2 選択肢シャッフル（`src/utils/shuffle.ts`）

```typescript
function shuffleChoices(
  choices: Choice[],
  shouldShuffle: boolean
): DisplayChoice[]
```

**アルゴリズム:**

1. `shouldShuffle` が false の場合、元の順序を維持
2. true の場合、Fisher-Yates シャッフルで並び替え
3. 並び順に応じてラベルを付与: `["ア", "イ", "ウ", "エ"]`
4. `DisplayChoice[]` を返却

**Fisher-Yates 実装:**

- 配列のコピーに対して操作（元配列は変更しない）
- `Math.random()` を使用（暗号学的乱数は不要）

```typescript
function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
```

### 7.3 スコア計算（`src/utils/scoring.ts`）

```typescript
function calculateScore(
  answers: AnswerRecord[]
): { correct: number; incorrect: number; unanswered: number; total: number; rate: number }
```

- `correct`: `answers.filter(a => a.isCorrect === true).length`
- `incorrect`: `answers.filter(a => a.isCorrect === false).length`
- `unanswered`: `answers.filter(a => a.isCorrect === null).length`
- `total`: `answers.length`
- `rate`: `total === 0 ? 0 : correct / total`（未回答も分母に含む）
- 表示形式: `(rate * 100).toFixed(1) + '%'`

### 7.4 ドメイン別統計（`src/utils/domainStats.ts`）

```typescript
function calculateDomainStats(
  questions: Question[],
  answers: AnswerRecord[]
): DomainStat[]
```

- `questions` と `answers` を同一インデックスで対応付け、ドメインごとにグループ化
- `correct` は `isCorrect === true` のみカウント（`null` は含めない）
- 出題されたドメインのみ含む
- ドメイン番号の昇順でソート

### 7.5 弱点検出

```typescript
function detectWeakness(stats: DomainStat[]): DomainStat[]
```

| 条件 | 結果 |
|------|------|
| ドメインが1つだけ | 空配列（弱点表示なし） |
| 全ドメインの `rate` が同一 | 空配列 |
| それ以外 | `rate` が最小のドメインを返却（同率の場合は全て返却） |

### 7.6 再挑戦セッション生成

#### 不正解のみ再挑戦

```typescript
function createRetryIncorrectSession(session: QuizSession): QuizSession
```

1. `session.answers` から `isCorrect === false` の問題を抽出
2. 元の `settings.shuffleChoices` が true なら選択肢を再シャッフル
3. 全 `AnswerRecord` を `{ selectedChoiceId: null, isCorrect: null }` で初期化
4. `currentIndex: 0`、`isFinished: false` で新セッション生成
5. `settings.mode` は元のセッションを引き継ぐ

#### 未回答のみ再挑戦

```typescript
function createRetryUnansweredSession(session: QuizSession): QuizSession
```

1. `session.answers` から `isCorrect === null` の問題を抽出
2. 以降は不正解のみ再挑戦と同じフロー

---

## 8. ルーティング

### 8.1 ルート一覧

| ルート | ページ | ファイル |
|--------|-------|---------|
| `/` | トップページ | `src/app/page.tsx` |
| `/quiz` | 出題ページ | `src/app/quiz/page.tsx` |
| `/quiz/result` | 結果ページ | `src/app/quiz/result/page.tsx` |

### 8.2 レイアウト構造

```
src/app/layout.tsx
  └── QuizProvider
        ├── Header
        ├── <main>{children}</main>
        └── Footer
```

### 8.3 ナビゲーションガード

| ページ | ガード条件 | 動作 |
|--------|-----------|------|
| `/quiz` | `session === null` | `router.replace('/')` |
| `/quiz/result` | `session === null \|\| !session.isFinished` | `router.replace('/')` |

ガードは `useEffect` 内で実行する。

### 8.4 ブラウザバック・リフレッシュ

| 操作 | 動作 |
|------|------|
| ブラウザバック（SPA内） | Context が維持されているため、前の画面に戻る |
| ブラウザリフレッシュ | Context が失われるため、ガードにより `/` にリダイレクト |

---

## 9. デザイントークン

### 9.1 カラーパレット

| トークン名 | 値 | 用途 |
|-----------|-----|------|
| `primary` | `#1E3A5F` | ヘッダー、プライマリボタン |
| `primary-dark` | `#152C4A` | プライマリのホバー |
| `accent` | `#0D9488` | リンク、ハイライト、ホバーアクセント |
| `accent-light` | `#CCFBF1` | アクセントの背景 |
| `bg` | `#F8FAFC` | ページ背景 |
| `surface` | `#FFFFFF` | カード背景 |
| `text` | `#1E293B` | 本文テキスト |
| `text-muted` | `#64748B` | 補助テキスト |
| `border` | `#E2E8F0` | ボーダー |
| `correct` | `#16A34A` | 正解表示 |
| `correct-bg` | `#F0FDF4` | 正解の背景 |
| `incorrect` | `#DC2626` | 不正解表示 |
| `incorrect-bg` | `#FEF2F2` | 不正解の背景 |
| `warning` | `#F59E0B` | 弱点ハイライト |

### 9.2 スペーシング

| トークン | 値 |
|---------|-----|
| ページ max-width | `768px` |
| カード padding（PC） | `24px` |
| カード padding（モバイル） | `16px` |
| カード border-radius | `12px` |
| カード shadow | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` |
| セクション間隔 | `24px` |
| ボタン min-height | `48px` |

### 9.3 タイポグラフィ

| 用途 | サイズ | 行高 | ウェイト |
|------|--------|------|---------|
| ページタイトル | 24px | 1.3 | bold |
| セクション見出し | 18px | 1.4 | semibold |
| 本文 | 16px | 1.6 | normal |
| 問題文 | 16px | 1.8 | normal |
| 小テキスト | 14px | 1.5 | normal |
| キャプション | 12px | 1.4 | normal |

**フォントファミリー:** `system-ui, -apple-system, sans-serif`

### 9.4 ブレークポイント

| 名前 | 幅 | 用途 |
|------|-----|------|
| sm | 640px | - |
| md | 768px | プライマリブレークポイント |
| lg | 1024px | - |

---

## 10. アクセシビリティ

| 項目 | 仕様 |
|------|------|
| 言語属性 | `<html lang="ja">` |
| キーボード操作 | 全インタラクティブ要素が Tab / Enter / Space で操作可能 |
| フォーカス表示 | `focus-visible:ring-2 focus-visible:ring-teal-500` |
| 選択肢ボタン | `<button>` 要素を使用 |
| FeedbackPanel | `role="alert"` で正誤結果をスクリーンリーダーに通知 |
| ProgressBar | `role="progressbar"` + `aria-valuenow` / `aria-valuemin` / `aria-valuemax` |
| 正誤表示 | 色だけでなくアイコン（チェック / バツ）とテキストを併用 |
| アイコンのみボタン | `aria-label` を付与 |

---

## 11. エラーハンドリング

| シナリオ | 処理 |
|---------|------|
| ドメイン選択0個 | 開始ボタン無効化 + インラインメッセージ表示 |
| 要求数 > 利用可能問題数 | 利用可能数に自動調整 + 情報メッセージ表示 |
| `/quiz` に直接アクセス（セッションなし） | `/` にリダイレクト |
| `/quiz/result` に直接アクセス（未完了） | `/` にリダイレクト |
| 全問正解で「不正解のみ再挑戦」 | ボタン無効化、ラベルに「（0問）」表示 |
| 未回答0問で「未回答のみ再挑戦」 | ボタン非表示 |
| ブラウザリフレッシュ（出題中） | セッション消失 → `/` にリダイレクト（v1で許容） |
| exam モードで未回答あり＋「採点する」 | 確認ダイアログを表示してから採点 |

---

## 12. テスト戦略

### 12.1 ユニットテスト（vitest）

| 対象 | テスト内容 |
|------|-----------|
| `shuffle.ts` | Fisher-Yates が全要素を含むこと、元配列を変更しないこと |
| `selectQuestions.ts` | ドメインフィルタ、件数制限、上限超過時の自動調整 |
| `scoring.ts` | 全問正解、全問不正解、未回答あり（`isCorrect: null`）、0問のエッジケース |
| `domainStats.ts` | ドメイン別グルーピングの正確性、未回答の扱い |
| `detectWeakness` | 同率、1ドメイン、全問正解のケース |

### 12.2 コンポーネントテスト（@testing-library/react）

| 対象 | テスト内容 |
|------|-----------|
| `ChoiceButton` | 5つの state（default, selected, correct, incorrect, disabled）の正確なレンダリング |
| `QuestionCard` | 問題文と4選択肢の表示 |
| `FeedbackPanel` | 正解/不正解バナーと解説の表示 |
| `QuizSettingsPanel` | モード切替、ドメイン選択、バリデーション |

### 12.3 統合テスト

| テスト内容 |
|-----------|
| practice モード: 設定 → 出題開始 → 全問回答（即時フィードバック確認）→ 結果表示 → 不正解のみ再挑戦 |
| exam モード: 設定 → 出題開始 → 全問回答（フィードバック非表示確認）→ 採点 → 結果表示 |
| exam モード: 未回答ありで採点 → 未回答が `isCorrect: null` であること |
| ガードリダイレクト: セッションなしで `/quiz` にアクセス |

### 12.4 手動テストチェックリスト

| 項目 |
|------|
| iOS Safari: タッチターゲット、スクロール、ビューポート |
| PC Chrome / Safari: ホバー状態、キーボードナビゲーション |
| レスポンシブ: 320px 〜 1440px の幅でレイアウト確認 |

---

## 13. ファイルマニフェスト

```
src/
├── app/
│   ├── layout.tsx                    # 共通レイアウト + QuizProvider
│   ├── page.tsx                      # トップページ
│   └── quiz/
│       ├── page.tsx                  # 出題ページ
│       └── result/
│           └── page.tsx              # 結果ページ
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── QuizSettingsPanel.tsx
│   ├── ModeTabSelector.tsx
│   ├── DomainCheckboxGroup.tsx
│   ├── QuestionCountSelector.tsx
│   ├── QuestionCard.tsx
│   ├── ChoiceButton.tsx
│   ├── FeedbackPanel.tsx
│   ├── ProgressBar.tsx
│   ├── QuizNavigation.tsx
│   ├── ScoreSummary.tsx
│   ├── DomainStatsPanel.tsx
│   ├── WeaknessAlert.tsx
│   └── QuestionReviewList.tsx
├── constants/
│   └── domains.ts                    # DOMAIN_LABELS 定数テーブル
├── contexts/
│   └── QuizContext.tsx
├── data/
│   └── questions.json                # 100問の問題データ
├── hooks/
│   └── useQuiz.ts
├── types/
│   ├── question.ts
│   └── quiz.ts
└── utils/
    ├── shuffle.ts
    ├── selectQuestions.ts
    ├── scoring.ts
    └── domainStats.ts

scripts/
└── validate-questions.ts             # ビルド時バリデーション
```

---

## 14. 要件トレーサビリティ

plan.md の各要件が本仕様のどこで定義されているかの対応表:

| 要件ID | 要件名 | 仕様セクション |
|--------|-------|---------------|
| F1 | 問題表示 | 5.2 出題ページ, 6.3 QuestionCard |
| F2 | 選択肢ランダム並び替え | 7.2 選択肢シャッフル |
| F3 | 正解・解説表示 | 5.2 インタラクション仕様（practice）, 6.3 FeedbackPanel |
| F4 | 出題モード | 3.2 QuizMode, 5.1 ModeTabSelector, 5.2 モード別インタラクション |
| F5 | 分野フィルタリング | 5.1 DomainCheckboxGroup, 7.1 問題選択 |
| F6 | 問題数選択 | 5.1 QuestionCountSelector |
| F7 | 問題データ | 3. データ仕様 |
| F8 | 結果表示 | 5.3 結果ページ, 6.4 ScoreSummary |
| F9 | 弱点ハイライト | 7.5 弱点検出, 6.4 WeaknessAlert |
| F10 | 不正解のみ再挑戦 | 7.6 再挑戦セッション生成, 5.3 インタラクション仕様 |
| F11 | 解説ジャンプ | 5.3 QuestionReviewList |
| NF1 | レスポンシブ対応 | 各画面仕様のレスポンシブ節, 9.4 ブレークポイント |
| NF2 | パフォーマンス | 2.3 静的エクスポート |
| NF3 | デプロイ容易性 | 2.4 ホスティング |

---

## 付録A. 変更履歴

### v0.2.0（2026-04-04）

| 変更内容 | 理由 |
|---------|------|
| `QuizMode` を `'domain' \| 'mock'` → `'practice' \| 'exam'` に変更 | 学習方式と出題範囲の責務を分離。practice = 即時フィードバック、exam = 一括採点 |
| exam モードの挙動を定義: 回答中は正誤非表示、全問回答後に一括採点 | 模擬試験として本番に近い体験を提供 |
| `AnswerRecord.isCorrect` を `boolean` → `boolean \| null` に変更 | 未回答（null）と不正解（false）を明確に区別 |
| 再挑戦時の初期化を `isCorrect: null` に統一 | 未回答を不正解として扱わない |
| `retryUnanswered()` を追加 | exam モードで未回答が発生するため |
| `Question.domainName` を削除、`DOMAIN_LABELS` 定数テーブルで管理 | データの冗長性排除、表示名の一元管理 |
| `DomainStat.domainName` を削除 | 同上 |
| `answerQuestion` の引数を `questionIndex` → `questionId` に変更 | index 依存を排除、再挑戦や将来拡張でのバグ防止 |
| トップページの `questionCount` ローカル State 型を `number` → `QuestionCount` に変更 | 型定義とUI stateの一貫性確保 |
| `ChoiceButton` の状態を6状態（実質5状態）に統一、`ChoiceButtonState` 型を定義 | 仕様表・Props・テスト間の状態数不整合を解消 |
| 状態保持ポリシーを §4.1 に明記 | v1 は Context のみ、localStorage 不使用を確定。plan.md との整合性を担保 |
| exam モードの問題抽出方針を §7.1 に明記 | ランダムサンプリングに確定（層別抽出は行わない） |
