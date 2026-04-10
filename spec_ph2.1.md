# AWS 演習道場 Ph.2.1 仕様書

| Key | Value |
|-----|-------|
| Version | 1.0.0 |
| Status | Draft |
| Last Updated | 2026-04-09 |
| Source Plan | plan_ph2.1.md |

> **本ドキュメントは仕様駆動開発のマスタードキュメントである。**
> すべての実装は本仕様に準拠すること。仕様と実装の乖離が生じた場合、仕様の変更を先に行う。
> Ph.2 仕様（spec_ph2.md）を継承し、Ph.2.1 で追加・変更される部分のみを定義する。

---

## 1. システム概要

### 1.1 目的

Ph.2 のマルチ試験プラットフォームに対して以下を追加する。

1. **解説欄の充実**: 各選択肢がなぜ正解・不正解なのかを個別に解説する `choiceExplanations` フィールドを追加し、FeedbackPanel および結果ページで表示する。
2. **新規試験追加**: AIF-C01 / DVA-C02 / SOA-C02 / DEA-C01 の 4 試験を追加し、合計 7 試験対応とする。

### 1.2 スコープ

- `Question` 型への `choiceExplanations` フィールド追加（オプショナル）
- FeedbackPanel の解説表示拡充
- 結果ページの解説表示拡充
- バリデーションスクリプトの `choiceExplanations` 対応
- `EXAM_CONFIGS` への 4 試験追加
- 各試験の問題データ作成（choiceExplanations 含む）

---

## 2. データ仕様

### 2.1 Question 型の変更

**ファイル:** `src/types/question.ts`

```typescript
/** 選択肢。IDは固定、表示ラベルはレンダリング時に付与 */
export interface Choice {
  id: string;   // "c1" | "c2" | "c3" | "c4"
  text: string;
}

/** 問題 */
export interface Question {
  id: number;                                  // 1〜100、一意（試験内）
  domain: number;                              // 試験固有のドメイン番号
  question: string;                            // 改行を含む場合あり
  choices: [Choice, Choice, Choice, Choice];   // 必ず4つ
  correctChoiceId: string;                     // choices[].id のいずれか
  explanation: string;                         // 正解の理由（改行を含む場合あり）
  choiceExplanations?: {                       // Ph.2.1追加: 選択肢ごとの解説（オプショナル）
    c1: string;
    c2: string;
    c3: string;
    c4: string;
  };
}
```

**変更点（Ph.2.1）:**
- `choiceExplanations` を追加。オプショナルのため既存データはそのまま有効。
- 各選択肢のキーは固定（`c1`〜`c4`）。存在する場合は必ず 4 つのキーがすべて揃っていること。
- 正解選択肢には「なぜ正解か」、不正解選択肢には「なぜ不正解か」を 1〜3 文で記述する。

**JSONデータ例:**

```json
{
  "id": 1,
  "domain": 1,
  "question": "...",
  "choices": [...],
  "correctChoiceId": "c1",
  "explanation": "需要に応じた弾力的な増減と従量課金がAWSの代表的な価値です。",
  "choiceExplanations": {
    "c1": "正解。弾力性と従量課金により繁忙期・平常期のコストを最適化できます。",
    "c2": "不正解。最大需要で固定確保すると平常時に過剰リソースを抱え、コスト非効率になります。",
    "c3": "不正解。オンプレミス長期保有は初期投資が大きく、需要変動への対応が困難です。",
    "c4": "不正解。スケールアップのみでは限界があり、水平スケールのメリットを活かせません。"
  }
}
```

### 2.2 試験定数の変更

**ファイル:** `src/constants/exams.ts`

`ExamId` に 4 試験を追加し、`EXAM_CONFIGS` / `EXAM_IDS` も更新する。

```typescript
export type ExamId =
  | 'MLA-C01'
  | 'CLF-C02'
  | 'SAA-C03'
  | 'AIF-C01'   // Ph.2.1追加
  | 'DVA-C02'   // Ph.2.1追加
  | 'SOA-C02'   // Ph.2.1追加
  | 'DEA-C01';  // Ph.2.1追加
```

```typescript
export const EXAM_CONFIGS: Record<ExamId, ExamConfig> = {
  // ... 既存3試験は変更なし ...

  'AIF-C01': {
    id: 'AIF-C01',
    name: 'AIF-C01',
    fullName: 'AWS Certified AI Practitioner',
    shortName: 'AI Practitioner',
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
    domainLabels: {
      1: 'データの取り込みと変換',
      2: 'データストア管理',
      3: 'データ運用とサポート',
      4: 'データセキュリティとガバナンス',
    },
    domainIds: [1, 2, 3, 4],
    totalQuestions: 100,
  },
} as const;

export const EXAM_IDS: ExamId[] = [
  'MLA-C01', 'CLF-C02', 'SAA-C03',
  'AIF-C01', 'DVA-C02', 'SOA-C02', 'DEA-C01',
];
```

### 2.3 問題データファイル構成

**追加後:**

```
src/data/
  mla-c01/questions.json    // 既存
  clf-c02/questions.json    // 既存
  saa-c03/questions.json    // 既存
  aif-c01/questions.json    // Ph.2.1追加
  dva-c02/questions.json    // Ph.2.1追加
  soa-c02/questions.json    // Ph.2.1追加
  dea-c01/questions.json    // Ph.2.1追加
```

`src/lib/questions.ts` の `QUESTION_MAP` に 4 試験を追加する。

### 2.4 バリデーションルール

#### choiceExplanations のバリデーション（全試験共通）

`choiceExplanations` が存在する場合:

| ルール | 詳細 |
|--------|------|
| キー完備 | `c1` / `c2` / `c3` / `c4` の 4 キーがすべて存在すること |
| 空文字禁止 | 各値が空文字・空白のみでないこと |
| 余分なキー禁止 | `c1`〜`c4` 以外のキーが存在しないこと |

#### 各試験のドメイン分布ルール

**AIF-C01:**

| ドメイン | 期待問題数 |
|----------|-----------|
| 1 | 20 |
| 2 | 24 |
| 3 | 28 |
| 4 | 14 |
| 5 | 14 |

**DVA-C02:**

| ドメイン | 期待問題数 |
|----------|-----------|
| 1 | 32 |
| 2 | 26 |
| 3 | 24 |
| 4 | 18 |

**SOA-C02:**

| ドメイン | 期待問題数 |
|----------|-----------|
| 1 | 20 |
| 2 | 16 |
| 3 | 18 |
| 4 | 16 |
| 5 | 18 |
| 6 | 12 |

**DEA-C01:**

| ドメイン | 期待問題数 |
|----------|-----------|
| 1 | 34 |
| 2 | 26 |
| 3 | 22 |
| 4 | 18 |

---

## 3. コンポーネント仕様

### 3.1 FeedbackPanel の変更

**ファイル:** `src/components/FeedbackPanel.tsx`

#### Props 変更

```typescript
import type { DisplayChoice } from "@/types/quiz";
import type { Question } from "@/types/question";

interface Props {
  isCorrect: boolean;
  correctChoice: DisplayChoice;
  selectedChoiceId: string;              // Ph.2.1追加: ユーザーが選んだ選択肢ID
  explanation: string;
  displayChoices: DisplayChoice[];       // Ph.2.1追加: シャッフル後の全選択肢
  choiceExplanations?: Question['choiceExplanations'];  // Ph.2.1追加
}
```

#### 表示仕様

`choiceExplanations` が存在する場合、`explanation` の下に **「各選択肢のポイント」** セクションを表示する。

| 選択肢の状態 | スタイル |
|------------|---------|
| 正解の選択肢 | 緑背景（`bg-green-50` / `border-green-200`）+ ✓ アイコン |
| ユーザーが選んだ不正解 | 赤背景（`bg-red-50` / `border-red-200`）+ ✗ アイコン |
| その他の不正解 | グレー背景（`bg-slate-50` / `border-slate-200`）|

- 表示順はシャッフル後の `displayChoices` の順序に従う（ア・イ・ウ・エのラベルと対応）
- `choiceExplanations` が `undefined` の場合、セクション全体を非表示にする

#### レイアウト（ワイヤーフレーム）

```
┌─────────────────────────────────────────┐
│ ✅ 正解！  /  ❌ 不正解                  │
│ （不正解時）正解: ア. xxxxxxxx           │
│                                         │
│ 【解説】                                 │
│ explanation テキスト                    │
│                                         │
│ 【各選択肢のポイント】          ← 任意表示 │
│ ┌─────────────────────────────────────┐ │
│ │ ✓ ア  choiceExplanations.c1 テキスト│ │  ← 正解: 緑
│ ├─────────────────────────────────────┤ │
│ │ ✗ イ  choiceExplanations.c2 テキスト│ │  ← 選択した不正解: 赤
│ ├─────────────────────────────────────┤ │
│ │   ウ  choiceExplanations.c3 テキスト│ │  ← その他: グレー
│ ├─────────────────────────────────────┤ │
│ │   エ  choiceExplanations.c4 テキスト│ │  ← その他: グレー
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### 3.2 結果ページの解説表示

結果ページ（exam モード終了後の全問解説）においても、FeedbackPanel と同じ `choiceExplanations` 表示を適用する。結果ページで解説を表示している箇所は FeedbackPanel を再利用しているため、Props を追加するだけで対応できる想定。

### 3.3 ExamSelector の変更

**ファイル:** `src/components/ExamSelector.tsx`

7 試験に増えるため、レイアウトを調整する。

| 画面幅 | レイアウト |
|--------|-----------|
| >= 1024px | 4列グリッド（または 4+3 の 2 行） |
| >= 768px | 3列グリッド（2行） |
| < 768px | 縦1列（7枚縦並び） |

> レイアウト詳細は実装時に調整する。基本方針は `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`。

---

## 4. 問題データ作成方針

Ph.1・Ph.2 と同方針（オリジナル作成・AWS 公式ドキュメントを根拠に独自執筆）を継承する。
**新規作成する問題はすべて `choiceExplanations` を含める。**

### 4.1 AIF-C01 主要トピック

| ドメイン | 主要トピック |
|----------|-------------|
| Domain 1 | 機械学習の基本概念（教師あり/なし学習）、MLライフサイクル、AWS AIサービス概要 |
| Domain 2 | 大規模言語モデル（LLM）、トークン、埋め込み、プロンプトエンジニアリング、Amazon Bedrock |
| Domain 3 | RAG、ファインチューニング、エージェント、マルチモーダル、評価指標 |
| Domain 4 | バイアス・公平性・透明性・説明可能性、AWS Responsible AI ポリシー |
| Domain 5 | IAM、データプライバシー、モデルの脆弱性、コンプライアンス要件 |

### 4.2 DVA-C02 主要トピック

| ドメイン | 主要トピック |
|----------|-------------|
| Domain 1 | Lambda、API Gateway、DynamoDB、S3、SQS/SNS、EventBridge、Step Functions |
| Domain 2 | IAM ポリシー、Cognito、KMS、Secrets Manager、STS |
| Domain 3 | CodePipeline、CodeBuild、CodeDeploy、Elastic Beanstalk、SAM、CDK |
| Domain 4 | CloudWatch、X-Ray、CloudTrail、エラー処理、パフォーマンスチューニング |

### 4.3 SOA-C02 主要トピック

| ドメイン | 主要トピック |
|----------|-------------|
| Domain 1 | CloudWatch メトリクス/ログ/アラーム、Systems Manager、EventBridge |
| Domain 2 | Multi-AZ、バックアップ、Route 53 フェイルオーバー、RDS リードレプリカ |
| Domain 3 | CloudFormation、Elastic Beanstalk、Auto Scaling、AMI |
| Domain 4 | IAM、Config、GuardDuty、Inspector、責任共有モデル |
| Domain 5 | VPC、Transit Gateway、CloudFront、Global Accelerator |
| Domain 6 | Cost Explorer、Trusted Advisor、リザーブドインスタンス、Savings Plans |

### 4.4 DEA-C01 主要トピック

| ドメイン | 主要トピック |
|----------|-------------|
| Domain 1 | Glue、Kinesis、MSK、Data Pipeline、ETL 設計、データ形式（Parquet/Avro） |
| Domain 2 | S3、Redshift、DynamoDB、RDS、Lake Formation、データカタログ |
| Domain 3 | Athena、EMR、CloudWatch、データ品質、コスト最適化 |
| Domain 4 | IAM、KMS、Macie、データマスキング、監査・コンプライアンス |

---

## 4.5 ドメイン表記の統一

トップページの出題設定パネルにおけるドメイン選択ラベルの表記を統一する。

| 変更前 | 変更後 |
|--------|--------|
| ドメイン 1: クラウドの概念 | Domain1: クラウドの概念 |

**ファイル:** `src/components/QuizSettingsPanel.tsx`

「ドメイン」→「Domain」に変更し、番号との間のスペースを除去する。
ドメイン名（日本語部分）はそのまま維持する。

## 4.6 フッターのコピーライト修正

**ファイル:** `src/components/Footer.tsx`

| 変更前 | 変更後 |
|--------|--------|
| © 2026 AWS MLA-C01 演習道場 | © 2026 AWS 演習道場 |

---

## 5. 変更ファイル一覧

| ファイル | 変更種別 | 内容 |
|----------|----------|------|
| `src/types/question.ts` | 変更 | `choiceExplanations` フィールド追加 |
| `src/constants/exams.ts` | 変更 | 4試験の定数追加 |
| `src/lib/questions.ts` | 変更 | 4試験の import / QUESTION_MAP 追加 |
| `src/components/FeedbackPanel.tsx` | 変更 | 各選択肢解説セクション追加 |
| `src/components/QuizSettingsPanel.tsx` | 変更 | ドメイン表記を「DomainN:」に統一 |
| `src/components/Footer.tsx` | 変更 | コピーライトを「AWS 演習道場」に修正 |
| `src/components/ExamSelector.tsx` | 変更 | `grid-cols-2 sm:grid-cols-4`・`max-w-2xl` に更新 |
| `app/layout.tsx` | 変更 | OGP メタデータを 7 試験対応の説明文に更新 |
| `scripts/validate-questions.ts` | 変更 | `choiceExplanations` バリデーション追加・4試験分布追加 |
| `src/data/aif-c01/questions.json` | 新規 | AIF-C01 問題データ |
| `src/data/dva-c02/questions.json` | 新規 | DVA-C02 問題データ |
| `src/data/soa-c02/questions.json` | 新規 | SOA-C02 問題データ |
| `src/data/dea-c01/questions.json` | 新規 | DEA-C01 問題データ |
| `src/data/mla-c01/questions.json` | 変更 | `choiceExplanations` 追記 |
| `src/data/clf-c02/questions.json` | 変更 | `choiceExplanations` 追記 |
| `src/data/saa-c03/questions.json` | 変更 | `choiceExplanations` 追記 |
