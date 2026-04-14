import type { Metadata } from "next";
import { EXAM_IDS, EXAM_CONFIGS, type ExamId } from "@/constants/exams";
import { EXAM_CONTENTS } from "@/constants/examContent";
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
  const content = EXAM_CONTENTS[id];
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      type: "website",
      locale: "ja_JP",
    },
  };
}

export default function Page() {
  return <ExamTopPage />;
}
