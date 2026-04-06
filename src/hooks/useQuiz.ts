"use client";

import { useContext } from "react";
import { QuizContext } from "@/contexts/QuizContext";

export function useQuiz() {
  return useContext(QuizContext);
}
