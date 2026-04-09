"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { selectQuestions } from "@/utils/selectQuestions";
import { shuffleChoices } from "@/utils/shuffle";
import { getQuestions } from "@/lib/questions";
import type { ExamId } from "@/constants/exams";
import type { QuizSession, QuizSettings, AnswerRecord } from "@/types/quiz";
import type { Question } from "@/types/question";

interface QuizContextValue {
  selectedExamId: ExamId;
  selectExam: (examId: ExamId) => void;
  session: QuizSession | null;
  startQuiz: (settings: QuizSettings) => void;
  answerQuestion: (questionId: number, choiceId: string) => void;
  goToQuestion: (index: number) => void;
  finishQuiz: () => void;
  retryIncorrect: () => void;
  retryUnanswered: () => void;
  restartWithSameSettings: () => void;
  reset: () => void;
}

export const QuizContext = createContext<QuizContextValue>({
  selectedExamId: 'MLA-C01',
  selectExam: () => {},
  session: null,
  startQuiz: () => {},
  answerQuestion: () => {},
  goToQuestion: () => {},
  finishQuiz: () => {},
  retryIncorrect: () => {},
  retryUnanswered: () => {},
  restartWithSameSettings: () => {},
  reset: () => {},
});

function buildAnswerRecords(
  questions: Question[],
  shuffleChoicesFlag: boolean,
): AnswerRecord[] {
  return questions.map((q) => ({
    questionId: q.id,
    selectedChoiceId: null,
    isCorrect: null,
    displayChoices: shuffleChoices(q.choices, shuffleChoicesFlag),
  }));
}

function buildSession(
  questions: Question[],
  settings: QuizSettings,
): QuizSession {
  return {
    settings,
    questions,
    answers: buildAnswerRecords(questions, settings.shuffleChoices),
    currentIndex: 0,
    isFinished: false,
  };
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [selectedExamId, setSelectedExamId] = useState<ExamId>('MLA-C01');
  const [session, setSession] = useState<QuizSession | null>(null);

  const selectExam = useCallback((examId: ExamId) => {
    setSelectedExamId(examId);
  }, []);

  const startQuiz = useCallback((settings: QuizSettings) => {
    const allQuestions = getQuestions(settings.examId);
    const questions = selectQuestions(allQuestions, settings);
    setSession(buildSession(questions, settings));
  }, []);

  const answerQuestion = useCallback(
    (questionId: number, choiceId: string) => {
      setSession((prev) => {
        if (!prev) return prev;
        const qIndex = prev.questions.findIndex((q) => q.id === questionId);
        if (qIndex === -1) return prev;
        const question = prev.questions[qIndex];
        const newAnswers = [...prev.answers];
        const isCorrect =
          prev.settings.mode === "practice"
            ? choiceId === question.correctChoiceId
            : null;
        newAnswers[qIndex] = {
          ...newAnswers[qIndex],
          selectedChoiceId: choiceId,
          isCorrect,
        };
        return { ...prev, answers: newAnswers };
      });
    },
    [],
  );

  const goToQuestion = useCallback((index: number) => {
    setSession((prev) => {
      if (!prev) return prev;
      return { ...prev, currentIndex: index };
    });
  }, []);

  const finishQuiz = useCallback(() => {
    setSession((prev) => {
      if (!prev) return prev;
      let answers = prev.answers;
      if (prev.settings.mode === "exam") {
        answers = prev.answers.map((a, i) => {
          if (a.selectedChoiceId === null) return a;
          return {
            ...a,
            isCorrect:
              a.selectedChoiceId === prev.questions[i].correctChoiceId,
          };
        });
      }
      return { ...prev, answers, isFinished: true };
    });
  }, []);

  const retryIncorrect = useCallback(() => {
    setSession((prev) => {
      if (!prev) return prev;
      const incorrectQuestions = prev.questions.filter((q, i) => {
        return prev.answers[i]?.isCorrect === false;
      });
      if (incorrectQuestions.length === 0) return prev;
      return buildSession(incorrectQuestions, prev.settings);
    });
  }, []);

  const retryUnanswered = useCallback(() => {
    setSession((prev) => {
      if (!prev) return prev;
      const unansweredQuestions = prev.questions.filter((q, i) => {
        return prev.answers[i]?.isCorrect === null;
      });
      if (unansweredQuestions.length === 0) return prev;
      return buildSession(unansweredQuestions, prev.settings);
    });
  }, []);

  const restartWithSameSettings = useCallback(() => {
    setSession((prev) => {
      if (!prev) return prev;
      const allQuestions = getQuestions(prev.settings.examId);
      const questions = selectQuestions(allQuestions, prev.settings);
      return buildSession(questions, prev.settings);
    });
  }, []);

  const reset = useCallback(() => {
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      selectedExamId,
      selectExam,
      session,
      startQuiz,
      answerQuestion,
      goToQuestion,
      finishQuiz,
      retryIncorrect,
      retryUnanswered,
      restartWithSameSettings,
      reset,
    }),
    [
      selectedExamId,
      selectExam,
      session,
      startQuiz,
      answerQuestion,
      goToQuestion,
      finishQuiz,
      retryIncorrect,
      retryUnanswered,
      restartWithSameSettings,
      reset,
    ],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}
