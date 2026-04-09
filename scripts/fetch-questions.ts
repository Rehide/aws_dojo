/**
 * Vercel Blob から mla-c01/questions.json を取得するスクリプト。
 * ビルド前に自動実行される（prebuild フック）。
 */
import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";

const blobUrl = process.env.QUESTIONS_BLOB_URL?.trim();
const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();

console.log("QUESTIONS_BLOB_URL:", blobUrl ? "set" : "NOT SET");
console.log("BLOB_READ_WRITE_TOKEN:", token ? "set" : "NOT SET");

if (!blobUrl || !token) {
  console.warn("警告: 環境変数が設定されていないため、既存の問題データを使用します");
  process.exit(0);
}

async function main(url: string, authToken: string) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (!response.ok) {
    throw new Error(
      `questions.json の取得に失敗しました: ${response.status} ${response.statusText}`,
    );
  }

  const content = await response.text();
  const outputPath = join(process.cwd(), "src/data/mla-c01/questions.json");
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, content, "utf-8");
  console.log(`questions.json を取得しました: ${outputPath}`);
}

main(blobUrl, token).catch((err) => {
  console.error(err);
  process.exit(1);
});
