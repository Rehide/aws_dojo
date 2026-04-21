"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ backgroundColor: "#1E3A5F" }} className="text-white">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight">AWS演習道場</span>
            <span className="rounded bg-teal-500 px-1.5 py-0.5 text-xs font-medium text-white">
              無料
            </span>
          </Link>

          {/* PC nav */}
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="text-sm hover:text-teal-300">
              ホーム
            </Link>
            <Link href="/about" className="text-sm hover:text-teal-300">
              サイトについて
            </Link>
            <Link href="/contact" className="text-sm hover:text-teal-300">
              お問い合わせ
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="メニュー"
          >
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
          </button>
        </div>

        {menuOpen && (
          <nav className="pb-4 md:hidden">
            <Link
              href="/"
              className="block py-2 text-sm hover:text-teal-300"
              onClick={() => setMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link
              href="/about"
              className="block py-2 text-sm hover:text-teal-300"
              onClick={() => setMenuOpen(false)}
            >
              サイトについて
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-sm hover:text-teal-300"
              onClick={() => setMenuOpen(false)}
            >
              お問い合わせ
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
