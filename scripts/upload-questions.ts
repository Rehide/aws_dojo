/**
 * questions.json を Vercel Blob（private）にアップロードするスクリプト。
 * 初回セットアップ時および問題データ更新時に手動実行する。
 *
 * 実行方法:
 *   BLOB_READ_WRITE_TOKEN=<token> npx tsx scripts/upload-questions.ts
 */
import { put } from "@vercel/blob";
import { readFileSync } from "fs";
import { join } from "path";

async function main() {
  const questionsPath = join(process.cwd(), "src/data/questions.json");
  const content = readFileSync(questionsPath, "utf-8");

  const blob = await put("questions.json", content, {
    access: "private",
    allowOverwrite: true,
    contentType: "application/json",
  });

  console.log("アップロード完了:", blob.url);
  console.log(
    "\nVercel の環境変数 QUESTIONS_BLOB_URL に以下の値を設定してください:",
  );
  console.log(blob.url);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
