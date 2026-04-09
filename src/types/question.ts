/** 選択肢。IDは固定、表示ラベルはレンダリング時に付与 */
export interface Choice {
  id: string; // "c1" | "c2" | "c3" | "c4"
  text: string;
}

/** 問題 */
export interface Question {
  id: number; // 1〜100、一意（試験内）
  domain: number; // 試験固有のドメイン番号
  question: string; // 改行を含む場合あり
  choices: [Choice, Choice, Choice, Choice]; // 必ず4つ
  correctChoiceId: string; // choices[].id のいずれか
  explanation: string; // 改行を含む場合あり
}
