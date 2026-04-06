# skill.md — プロジェクト固有の知識

Claude Code 向けのプロジェクト固有リファレンス。設計の正は `spec.md`。

## プロジェクト概要

AWS MLA-C01 問題道場 — AWS Certified Machine Learning Engineer – Associate 試験対策の演習サイト。サーバー・DB なしの静的 SPA。Next.js App Router + TypeScript + Tailwind CSS で構築、Vercel にデプロイ。

## 技術スタック制約

- Next.js 15 / React 19 / TypeScript 5 / Tailwind CSS 4 **以外のランタイム依存は追加しない**
- UI コンポーネントライブラリ・状態管理ライブラリは使用しない
- 全ページ `'use client'`。Server Components・API Routes は使わない
- `next.config.ts`: `output: 'export'`（静的エクスポート）
- 状態の永続化なし（localStorage・Cookie 禁止 — v1 制約）

## アーキテクチャ

### 状態管理

全クイズ状態を単一の React Context（`src/contexts/QuizContext.tsx`）で管理し、`src/app/layout.tsx` でラップ。中心データ構造は `QuizSession`（`src/types/quiz.ts`）。

主要 Context メソッド:

| メソッド | 動作 |
|----------|------|
| `startQuiz(settings)` | 問題フィルタリング・サンプリング・シャッフル。全 `AnswerRecord` を `null` で初期化 |
| `answerQuestion(questionId, choiceId)` | `practice`: 即時 `isCorrect` 判定。`exam`: 選択肢を記録するのみ |
| `finishQuiz()` | `isFinished = true`。`exam` モードはここで全問一括判定 |
| `retryIncorrect()` / `retryUnanswered()` / `restartWithSameSettings()` | 既存セッションから新セッション生成 |

### 画面フローとガード

```
/ (トップ)  →  startQuiz()  →  /quiz  →  finishQuiz()  →  /quiz/result
```

- `/quiz`: `session === null` → `/` にリダイレクト
- `/quiz/result`: `session === null || !session.isFinished` → `/` にリダイレクト

### データ層

- 問題データ: `src/data/questions.json` — 静的 `import`（fetch 不使用）
- ドメイン表示名: `src/constants/domains.ts`（`DOMAIN_LABELS` レコード）
- `domainName` は JSON に持たない → 常に `DOMAIN_LABELS[question.domain]` で解決

### モード別挙動

| 項目 | `practice` | `exam` |
|------|------------|--------|
| 回答後フィードバック | 即時表示 | `finishQuiz()` まで非表示 |
| `isCorrect` 確定 | `answerQuestion` 内 | `finishQuiz` 内 |
| 選択肢の変更 | 不可（ボタン無効化） | 採点前なら変更可 |
| ドメインフィルタ | ユーザー選択 | 全ドメイン強制選択 |

### 選択肢の表示

シャッフル順は `AnswerRecord.displayChoices` にスナップショット保存。ラベル（ア/イ/ウ/エ）はレンダリング時に付与（データに保存しない）。正解判定は常に `correctChoiceId`（安定した choice `id`）を使用。

### ChoiceButton の視覚状態

6状態: `default` | `hover` | `selected` | `correct` | `incorrect` | `disabled`。`selected` は exam モード専用（選択済み・未採点）。

## 主要ファイル

| パス | 用途 |
|------|------|
| `src/types/question.ts` | `Question`、`Choice` |
| `src/types/quiz.ts` | `QuizSession`、`AnswerRecord`、`QuizSettings`、`DisplayChoice`、`DomainStat` |
| `src/constants/domains.ts` | `DOMAIN_LABELS`、`DomainId` |
| `src/contexts/QuizContext.tsx` | クイズ状態と全アクション |
| `src/hooks/useQuiz.ts` | `useQuiz()` フック |
| `src/data/questions.json` | 問題データ 100問（D1:28 / D2:26 / D3:22 / D4:24） |
| `scripts/validate-questions.ts` | ビルド時データバリデーション |

## 問題データのバリデーションルール

- 配列要素がちょうど 100件。ID は 1〜100 で重複なし
- 各問題の `choices` は 4要素。ID は `c1`〜`c4`
- `correctChoiceId` は `c1`〜`c4` のいずれか
- ドメイン分布: D1=28、D2=26、D3=22、D4=24
- 空文字なし。`domainName` フィールドは存在しないこと

## デザイントークン

- 背景色: `#F8FAFC`（スレート）
- プライマリ: `#1E3A5F`（ディープブルー）
- アクセント: `#0D9488`（ティール）
- モバイルブレークポイント: 768px（モバイルファースト）
- フォント: `system-ui`
