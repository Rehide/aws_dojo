"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ backgroundColor: "#1E3A5F" }} className="text-white">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight">
            AWS無料試験問題集
          </Link>

          {/* PC nav */}
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="text-sm hover:text-teal-300">
              ホーム
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
          </nav>
        )}
      </div>
    </header>
  );
}
