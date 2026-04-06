import questions from "../src/data/questions.json";

type Choice = { id: string; text: string };
type Question = {
  id: number;
  domain: number;
  question: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
};

const qs = questions as Question[];

let errors = 0;

function fail(msg: string) {
  console.error(`[ERROR] ${msg}`);
  errors++;
}

// 件数
if (qs.length !== 100) {
  fail(`問題数が100問ではありません (実際: ${qs.length}問)`);
}

// ドメイン分布
const domainCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
const expectedCounts = { 1: 28, 2: 26, 3: 22, 4: 24 };

const idSet = new Set<number>();

for (const q of qs) {
  // ID一意性
  if (idSet.has(q.id)) {
    fail(`ID ${q.id} が重複しています`);
  }
  idSet.add(q.id);

  // ID範囲
  if (q.id < 1 || q.id > 100) {
    fail(`ID ${q.id} が1〜100の範囲外です`);
  }

  // ドメイン
  if (![1, 2, 3, 4].includes(q.domain)) {
    fail(`問題ID ${q.id}: domain ${q.domain} は1〜4の範囲外です`);
  } else {
    domainCounts[q.domain as 1 | 2 | 3 | 4]++;
  }

  // 選択肢数
  if (q.choices.length !== 4) {
    fail(`問題ID ${q.id}: 選択肢数が4ではありません (${q.choices.length})`);
  }

  // 選択肢ID
  const choiceIds = q.choices.map((c) => c.id);
  const expectedIds = ["c1", "c2", "c3", "c4"];
  for (const expected of expectedIds) {
    if (!choiceIds.includes(expected)) {
      fail(`問題ID ${q.id}: 選択肢ID "${expected}" がありません`);
    }
  }

  // 正解参照
  if (!["c1", "c2", "c3", "c4"].includes(q.correctChoiceId)) {
    fail(
      `問題ID ${q.id}: correctChoiceId "${q.correctChoiceId}" はc1〜c4ではありません`,
    );
  }

  // 空文字チェック
  if (!q.question.trim()) {
    fail(`問題ID ${q.id}: question が空です`);
  }
  if (!q.explanation.trim()) {
    fail(`問題ID ${q.id}: explanation が空です`);
  }
  for (const c of q.choices) {
    if (!c.text.trim()) {
      fail(`問題ID ${q.id}: 選択肢 ${c.id} のtextが空です`);
    }
  }

  // domainName 不在チェック
  if ("domainName" in q) {
    fail(`問題ID ${q.id}: domainName フィールドが存在します（禁止）`);
  }
}

// ドメイン分布チェック
for (const [domain, expected] of Object.entries(expectedCounts)) {
  const actual = domainCounts[parseInt(domain) as 1 | 2 | 3 | 4];
  if (actual !== expected) {
    fail(
      `Domain ${domain}: ${actual}問 (期待: ${expected}問)`,
    );
  }
}

if (errors === 0) {
  console.log("✅ バリデーション成功: すべてのチェックをパスしました");
} else {
  console.error(`\n❌ バリデーション失敗: ${errors}件のエラーがあります`);
  process.exit(1);
}
