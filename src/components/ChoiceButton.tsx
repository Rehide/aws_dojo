"use client";

import type { DisplayChoice } from "@/types/quiz";

export type ChoiceButtonState =
  | "default"
  | "selected"
  | "correct"
  | "incorrect"
  | "disabled";

interface Props {
  choice: DisplayChoice;
  state: ChoiceButtonState;
  onClick: () => void;
  disabled: boolean;
}

const stateStyles: Record<
  ChoiceButtonState,
  { border: string; bg: string; text: string }
> = {
  default: {
    border: "border-slate-200",
    bg: "bg-white hover:bg-teal-50 hover:border-teal-400",
    text: "text-slate-800",
  },
  selected: {
    border: "border-teal-500",
    bg: "bg-teal-50",
    text: "text-teal-800",
  },
  correct: {
    border: "border-green-500",
    bg: "bg-green-50",
    text: "text-green-800",
  },
  incorrect: {
    border: "border-red-500",
    bg: "bg-red-50",
    text: "text-red-800",
  },
  disabled: {
    border: "border-slate-200",
    bg: "bg-slate-50",
    text: "text-slate-400",
  },
};

const stateIcon: Record<ChoiceButtonState, string> = {
  default: "",
  selected: "✓",
  correct: "✓",
  incorrect: "✗",
  disabled: "",
};

export function ChoiceButton({ choice, state, onClick, disabled }: Props) {
  const styles = stateStyles[state];
  const icon = stateIcon[state];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm transition-colors md:min-h-12 ${styles.border} ${styles.bg} ${styles.text} ${disabled ? "cursor-default" : "cursor-pointer"}`}
    >
      <span className="min-w-6 shrink-0 font-bold">{choice.label}.</span>
      <span className="flex-1">{choice.text}</span>
      {icon && (
        <span
          className={`shrink-0 font-bold ${state === "correct" ? "text-green-600" : state === "incorrect" ? "text-red-600" : "text-teal-600"}`}
        >
          {icon}
        </span>
      )}
    </button>
  );
}
