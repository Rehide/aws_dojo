import type { DisplayChoice } from "@/types/quiz";
import type { ChoiceExplanations } from "@/types/question";

interface Props {
  isCorrect: boolean;
  correctChoice: DisplayChoice;
  selectedChoiceId: string;
  explanation: string;
  displayChoices: DisplayChoice[];
  choiceExplanations?: ChoiceExplanations;
}

export function FeedbackPanel({
  isCorrect,
  correctChoice,
  selectedChoiceId,
  explanation,
  displayChoices,
  choiceExplanations,
}: Props) {
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

      {choiceExplanations && (
        <div className="mt-4">
          <h4 className="mb-2 text-sm font-semibold text-slate-700">
            【各選択肢のポイント】
          </h4>
          <div className="space-y-2">
            {displayChoices.map((choice) => {
              const choiceKey = choice.id as keyof ChoiceExplanations;
              const isCorrectChoice = choice.id === correctChoice.id;
              const isSelectedWrong =
                choice.id === selectedChoiceId && !isCorrect;

              const containerClass = isCorrectChoice
                ? "rounded-lg border border-green-200 bg-green-50 p-3"
                : isSelectedWrong
                  ? "rounded-lg border border-red-200 bg-red-50 p-3"
                  : "rounded-lg border border-slate-200 bg-slate-50 p-3";

              const icon = isCorrectChoice ? (
                <span className="mt-0.5 shrink-0 text-xs font-bold text-green-600">
                  ✓
                </span>
              ) : isSelectedWrong ? (
                <span className="mt-0.5 shrink-0 text-xs font-bold text-red-600">
                  ✗
                </span>
              ) : (
                <span className="mt-0.5 w-3 shrink-0" />
              );

              return (
                <div key={choice.id} className={containerClass}>
                  <div className="flex items-start gap-2">
                    {icon}
                    <span className="mt-0.5 shrink-0 text-xs font-semibold text-slate-600">
                      {choice.label}.
                    </span>
                    <p className="text-sm text-slate-600">
                      {choiceExplanations[choiceKey]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
