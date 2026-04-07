/**
 * Vercel Blob から questions.json を取得するスクリプト。
 * ビルド前に自動実行される（prebuild フック）。
 */
import { writeFileSync } from "fs";
import { join } from "path";

const blobUrl = process.env.QUESTIONS_BLOB_URL?.trim();
const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();

if (!blobUrl) {
  console.error("エラー: 環境変数 QUESTIONS_BLOB_URL が設定されていません");
  process.exit(1);
}
if (!token) {
  console.error("エラー: 環境変数 BLOB_READ_WRITE_TOKEN が設定されていません");
  process.exit(1);
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
  const outputPath = join(process.cwd(), "src/data/questions.json");
  writeFileSync(outputPath, content, "utf-8");
  console.log(`questions.json を取得しました: ${outputPath}`);
}

main(blobUrl, token).catch((err) => {
  console.error(err);
  process.exit(1);
});
