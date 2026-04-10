import { EXAM_IDS } from "@/constants/exams";
import { QuizPage } from "@/components/pages/QuizPage";

export function generateStaticParams() {
  return EXAM_IDS.map((id) => ({ examId: id.toLowerCase() }));
}

export default function Page() {
  return <QuizPage />;
}
