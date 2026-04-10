import { EXAM_IDS } from "@/constants/exams";
import { ResultPage } from "@/components/pages/ResultPage";

export function generateStaticParams() {
  return EXAM_IDS.map((id) => ({ examId: id.toLowerCase() }));
}

export default function Page() {
  return <ResultPage />;
}
