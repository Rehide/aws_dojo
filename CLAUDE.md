# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

プロジェクト固有の知識（アーキテクチャ・データ仕様・ファイル構成）は `skill.md` を参照。設計の正は `spec.md`。

## コマンド

```bash
npm run dev                          # 開発サーバー
npm run build                        # ビルド（静的エクスポート）
npm run lint                         # Lint
npx prettier --write .               # フォーマット
npx tsc --noEmit                     # 型チェック
npx tsx scripts/validate-questions.ts  # 問題データ検証
npx vitest run                       # テスト全実行
npx vitest run <ファイルパス>         # 特定テストのみ実行
```

## 仕様駆動開発
- 仕様書（spec.md）に従い実装を行うこと。
- やむを得ず仕様と乖離する場合、必ずユーザーに承認をとること。
- 仕様を変更する場合、仕様書を必ず更新すること。

## コミュニケーション

- 日本語で応答する（コード・変数名は英語）
- 簡潔に回答し、自明な説明は省略する
- 複雑なタスクでは実装前に計画を提示し、承認後に着手する

## コードスタイル

- 関数型アプローチを優先し、副作用を最小化する
- 厳密な型付け（`any` は使わず `unknown` を使う）
- エラーは握りつぶさず、意味のあるメッセージ付きで処理する

## Git 規約

- Conventional Commits 形式、本文は日本語（例: `feat: ユーザー認証に OAuth2 を追加`）
- 確認なしに自動コミット・自動 push しない

## 禁止事項

- README・ドキュメントを勝手に生成・変更しない
- テストコードを確認なしに削除・コメントアウトしない
- 既存の動作するコードを理由なくリファクタリングしない
