"use client";

import { useState } from "react";
import Link from "next/link";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgawpbd";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const data: { errors?: { message: string }[] } = await response.json();
        setErrorMessage(
          data?.errors?.[0]?.message ?? "送信に失敗しました。しばらく経ってからお試しください。"
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage("ネットワークエラーが発生しました。接続を確認してからお試しください。");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded border border-teal-200 bg-teal-50 p-6 text-center">
        <p className="text-sm font-medium text-teal-700">
          ✓ お問い合わせを受け付けました。
        </p>
        <p className="mt-1 text-sm text-teal-600">
          返信には数日かかる場合があります。
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-teal-600 hover:underline"
        >
          ← トップに戻る
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "error" && (
        <div className="rounded border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          className="w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="例: 山田 太郎"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={254}
          className="w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="例: example@mail.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          お問い合わせ内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={6}
          className="w-full rounded border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="お問い合わせ内容をご記入ください"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded px-6 py-2 text-sm font-medium text-white disabled:opacity-50"
        style={{ backgroundColor: "#1E3A5F" }}
      >
        {status === "submitting" ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
