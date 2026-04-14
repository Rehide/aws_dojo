import type { Metadata } from "next";
import { EXAM_IDS, EXAM_CONFIGS, type ExamId } from "@/constants/exams";
import { ExamTopPage } from "@/components/pages/ExamTopPage";

export function generateStaticParams() {
  return EXAM_IDS.map((id) => ({ examId: id.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ examId: string }>;
}): Promise<Metadata> {
  const { examId } = await params;
  const id = examId.toUpperCase() as ExamId;
  const config = EXAM_CONFIGS[id];
  if (!config) return {};
  return {
    title: `${config.name} 練習問題 | AWS無料試験問題集`,
    description: `${config.fullName}（${config.name}）の試験対策。ドメイン別の練習問題で学習できます。`,
    openGraph: {
      title: `${config.name} 練習問題 | AWS無料試験問題集`,
      description: `${config.fullName}（${config.name}）の試験対策。ドメイン別の練習問題で学習できます。`,
      type: "website",
      locale: "ja_JP",
    },
  };
}

export default function Page() {
  return <ExamTopPage />;
}
