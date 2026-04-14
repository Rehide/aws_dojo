import { EXAM_IDS, EXAM_CONFIGS, type ExamId } from "../src/constants/exams";

type Choice = { id: string; text: string };
type ChoiceExplanations = { c1: string; c2: string; c3: string; c4: string };
type Question = {
  id: number;
  domain: number;
  question: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
  choiceExplanations?: ChoiceExplanations;
};

// ドメイン分布の期待値（試験ごと）
const EXPECTED_DOMAIN_COUNTS: Record<ExamId, Record<number, number>> = {
  'MLA-C01': { 1: 28, 2: 26, 3: 22, 4: 24 },
  'CLF-C02': { 1: 24, 2: 30, 3: 34, 4: 12 },
  'SAA-C03': { 1: 30, 2: 26, 3: 24, 4: 20 },
  'AIF-C01': { 1: 20, 2: 24, 3: 28, 4: 14, 5: 14 },
  'DVA-C02': { 1: 32, 2: 26, 3: 24, 4: 18 },
  'SOA-C02': { 1: 20, 2: 16, 3: 18, 4: 16, 5: 18, 6: 12 },
  'DEA-C01': { 1: 34, 2: 26, 3: 22, 4: 18 },
  // Coming Soon（問題なし・検証スキップ）
  'SAP-C02': {},
  'DOP-C02': {},
  'ANS-C01': {},
  'MLS-C01': {},
  'SCS-C02': {},
  'PAS-C01': {},
};

let totalErrors = 0;

function fail(msg: string) {
  console.error(`[ERROR] ${msg}`);
  totalErrors++;
}

async function validateExam(examId: ExamId): Promise<void> {
  const examConfig = EXAM_CONFIGS[examId];
  const dirName = examId.toLowerCase().replace('-', '-');
  let qs: Question[];

  try {
    const mod = await import(`../src/data/${dirName}/questions.json`);
    qs = mod.default as Question[];
  } catch {
    fail(`${examId}: questions.json の読み込みに失敗しました`);
    return;
  }

  console.log(`\n--- ${examId} (${examConfig.fullName}) ---`);

  let examErrors = 0;

  function examFail(msg: string) {
    console.error(`  [ERROR] ${msg}`);
    examErrors++;
    totalErrors++;
  }

  // 問題数が0件の場合はデータ未作成としてスキップ
  if (qs.length === 0) {
    console.log(`  ⏭  ${examId}: 問題データ未作成のためスキップ`);
    return;
  }

  // 件数
  if (qs.length !== examConfig.totalQuestions) {
    examFail(`問題数が${examConfig.totalQuestions}問ではありません (実際: ${qs.length}問)`);
  }

  // ドメイン分布カウント
  const domainCounts: Record<number, number> = {};
  for (const id of examConfig.domainIds) {
    domainCounts[id] = 0;
  }

  const idSet = new Set<number>();

  for (const q of qs) {
    // ID一意性
    if (idSet.has(q.id)) {
      examFail(`ID ${q.id} が重複しています`);
    }
    idSet.add(q.id);

    // ID範囲
    if (q.id < 1 || q.id > examConfig.totalQuestions) {
      examFail(`ID ${q.id} が1〜${examConfig.totalQuestions}の範囲外です`);
    }

    // ドメイン
    if (!examConfig.domainIds.includes(q.domain)) {
      examFail(`問題ID ${q.id}: domain ${q.domain} は有効なドメイン外です`);
    } else {
      domainCounts[q.domain] = (domainCounts[q.domain] ?? 0) + 1;
    }

    // 選択肢数
    if (q.choices.length !== 4) {
      examFail(`問題ID ${q.id}: 選択肢数が4ではありません (${q.choices.length})`);
    }

    // 選択肢ID
    const choiceIds = q.choices.map((c) => c.id);
    for (const expected of ["c1", "c2", "c3", "c4"]) {
      if (!choiceIds.includes(expected)) {
        examFail(`問題ID ${q.id}: 選択肢ID "${expected}" がありません`);
      }
    }

    // 正解参照
    if (!["c1", "c2", "c3", "c4"].includes(q.correctChoiceId)) {
      examFail(
        `問題ID ${q.id}: correctChoiceId "${q.correctChoiceId}" はc1〜c4ではありません`,
      );
    }

    // 空文字チェック
    if (!q.question.trim()) {
      examFail(`問題ID ${q.id}: question が空です`);
    }
    if (!q.explanation.trim()) {
      examFail(`問題ID ${q.id}: explanation が空です`);
    }
    for (const c of q.choices) {
      if (!c.text.trim()) {
        examFail(`問題ID ${q.id}: 選択肢 ${c.id} のtextが空です`);
      }
    }

    // choiceExplanations チェック（存在する場合のみ）
    if (q.choiceExplanations !== undefined) {
      const keys = Object.keys(q.choiceExplanations);
      const requiredKeys = ["c1", "c2", "c3", "c4"];
      for (const key of requiredKeys) {
        if (!keys.includes(key)) {
          examFail(`問題ID ${q.id}: choiceExplanations に "${key}" がありません`);
        } else if (!q.choiceExplanations[key as keyof ChoiceExplanations].trim()) {
          examFail(`問題ID ${q.id}: choiceExplanations.${key} が空です`);
        }
      }
      for (const key of keys) {
        if (!requiredKeys.includes(key)) {
          examFail(`問題ID ${q.id}: choiceExplanations に不正なキー "${key}" があります`);
        }
      }
    }

    // domainName 不在チェック
    if ("domainName" in q) {
      examFail(`問題ID ${q.id}: domainName フィールドが存在します（禁止）`);
    }
  }

  // ドメイン分布チェック
  const expectedCounts = EXPECTED_DOMAIN_COUNTS[examId];
  for (const [domain, expected] of Object.entries(expectedCounts)) {
    const actual = domainCounts[parseInt(domain)] ?? 0;
    if (actual !== expected) {
      examFail(`Domain ${domain}: ${actual}問 (期待: ${expected}問)`);
    }
  }

  if (examErrors === 0) {
    console.log(`  ✅ ${examId}: バリデーション成功`);
  } else {
    console.error(`  ❌ ${examId}: ${examErrors}件のエラー`);
  }
}

(async () => {
  for (const examId of EXAM_IDS) {
    await validateExam(examId);
  }

  console.log("");
  if (totalErrors === 0) {
    console.log("✅ 全試験バリデーション成功: すべてのチェックをパスしました");
  } else {
    console.error(`❌ バリデーション失敗: 合計 ${totalErrors}件のエラーがあります`);
    process.exit(1);
  }
})();
