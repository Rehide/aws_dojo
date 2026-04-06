import type { DisplayChoice } from "@/types/quiz";

interface Props {
  isCorrect: boolean;
  correctChoice: DisplayChoice;
  explanation: string;
}

export function FeedbackPanel({ isCorrect, correctChoice, explanation }: Props) {
  return (
    <div
      className={`rounded-xl border-2 p-4 ${
        isCorrect ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="text-2xl">{isCorrect ? "✅" : "❌"}</span>
        <span
          className={`text-lg font-bold ${isCorrect ? "text-green-700" : "text-red-700"}`}
        >
          {isCorrect ? "正解！" : "不正解"}
        </span>
      </div>
      {!isCorrect && (
        <p className="mb-2 text-sm text-slate-700">
          正解:{" "}
          <span className="font-semibold">
            {correctChoice.label}. {correctChoice.text}
          </span>
        </p>
      )}
      <div>
        <h4 className="mb-1 text-sm font-semibold text-slate-700">【解説】</h4>
        <p className="whitespace-pre-wrap text-sm text-slate-600">
          {explanation}
        </p>
      </div>
    </div>
  );
}
