import type { Faq } from "@/constants/examContent";

type Props = {
  faqs: Faq[];
};

export function FaqSection({ faqs }: Props) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-base font-bold" style={{ color: "#1E3A5F" }}>
        よくある質問
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <details key={i} className="group rounded-lg border border-slate-200">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <span>{faq.q}</span>
              <span className="ml-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180">
                ▼
              </span>
            </summary>
            <div className="border-t border-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-600">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
