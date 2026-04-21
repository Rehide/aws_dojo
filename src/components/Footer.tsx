import Link from "next/link";
import { EXAM_IDS } from "@/constants/exams";

export function Footer() {
  return (
    <footer className="bg-slate-800 py-8 text-sm text-slate-400">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
          {/* 練習問題リンク */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              練習問題
            </p>
            <ul className="space-y-1">
              {EXAM_IDS.map((id) => (
                <li key={id}>
                  <Link
                    href={`/exam/${id.toLowerCase()}`}
                    className="hover:text-white"
                  >
                    {id}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サイト情報リンク */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              サイト情報
            </p>
            <ul className="space-y-1">
              <li>
                <Link href="/about" className="hover:text-white">
                  AWS演習道場〜無料試験問題集〜について
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white">
                  免責事項
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-4 text-center text-xs">
          © 2026 AWS演習道場〜無料試験問題集〜
        </div>
      </div>
    </footer>
  );
}
