import type { Metadata } from "next";
import { EXAM_IDS, EXAM_CONFIGS, type ExamId } from "@/constants/exams";
import { EXAM_CONTENTS } from "@/constants/examContent";
import { ExamTopPage } from "@/components/pages/ExamTopPage";
import { JsonLd } from "@/components/JsonLd";

const BASE_URL = "https://aws-exam-dojo.com";

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

export default async function Page({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  const id = examId.toUpperCase() as ExamId;
  const config = EXAM_CONFIGS[id];
  const content = EXAM_CONTENTS[id];

  if (!config || !content) return <ExamTopPage />;

  const pageUrl = `${BASE_URL}/exam/${examId}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "AWS無料試験問題集",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: content.metaTitle.split(" | ")[0],
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ExamTopPage />
    </>
  );
}
