"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const CHAR_DELAY_MS = 32;

const skills = [
  { label: "言語", value: "PHP／JavaScript／HTML／CSS／TypeScript" },
  { label: "フレームワーク", value: "Laravel／CakePHP3／Next.js" },
  { label: "データベース", value: "MySQL" },
  { label: "AI活用", value: "Claude Code／Cursor" },
];

const highlights = [
  "海外向け住宅売買プラットフォームの開発。要件定義〜設計・実装まで一気通貫で担当し、Claudeを活用した開発フローを本格導入",
  "ECカートシステムの決済・会員ランク・マルチカート機能等の設計・実装",
  "GPT API・Azure・ベクトルデータベースを用いたAI自動応答チャットボットの設計・開発",
  "医療システムのログイン・CRUD機能、CSVインポート・エクスポート機能の設計・実装 など",
];

const sections: { heading: string; body: ReactNode }[] = [
  {
    heading: "職務要約",
    body: (
      <p className="leading-relaxed text-slate-300">
        Webアプリケーションエンジニアとして約8年の開発経験。PHP（Laravel／CakePHP）を中心に、HTML／CSS／JavaScriptも同期間扱っており、フロントエンドを含めた一気通貫の開発が可能。Next.jsも実務で使用。直近ではClaude（Claude
        Code／Cursor）を活用した開発を実務・個人開発の両面で実践している。
      </p>
    ),
  },
  {
    heading: "保有スキル",
    body: (
      <ul className="flex flex-col gap-2">
        {skills.map((skill) => (
          <li
            key={skill.label}
            className="flex gap-2 leading-relaxed text-slate-300"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span>
              <span className="text-accent">{skill.label}</span>
              ：{skill.value}
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    heading: "これまでの主な取り組み",
    body: (
      <ul className="flex flex-col gap-3">
        {highlights.map((item) => (
          <li
            key={item}
            className="flex gap-2 leading-relaxed text-slate-300"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
];

function CareerModalPanel({ onClose }: { onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [skip, setSkip] = useState(false);
  const [typedLengths, setTypedLengths] = useState<number[]>(() =>
    reducedMotion ? sections.map((s) => s.heading.length) : sections.map(() => 0),
  );
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    reducedMotion ? sections.map(() => true) : sections.map(() => false),
  );

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    // reducedMotion is already fully revealed via the initial state above.
    if (reducedMotion) return;

    if (skip) {
      const timeout = setTimeout(() => {
        setTypedLengths(sections.map((s) => s.heading.length));
        setRevealed(sections.map(() => true));
      }, 0);
      return () => clearTimeout(timeout);
    }

    let cancelled = false;

    async function run() {
      for (let i = 0; i < sections.length; i++) {
        const heading = sections[i].heading;
        for (let c = 1; c <= heading.length; c++) {
          await new Promise((resolve) => setTimeout(resolve, CHAR_DELAY_MS));
          if (cancelled) return;
          setTypedLengths((prev) => {
            const next = [...prev];
            next[i] = c;
            return next;
          });
        }
        if (cancelled) return;
        setRevealed((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [reducedMotion, skip]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSkip(true);
      }}
      className="relative flex h-full w-full flex-col overflow-hidden border-navy-700 bg-navy-950 sm:h-auto sm:max-h-[85vh] sm:max-w-2xl sm:rounded-2xl sm:border"
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-navy-700 bg-navy-900/60 px-5 py-4 sm:px-6">
        <h2 id="career-modal-title" className="font-mono text-sm text-slate-400">
          <span className="text-accent">$</span> cat ./career.md
        </h2>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="閉じる"
          className="text-2xl leading-none text-slate-300 transition hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
        {sections.map((section, i) => {
          const isTypingNow =
            (i === 0 || revealed[i - 1]) &&
            typedLengths[i] < section.heading.length;
          return (
            <section
              key={section.heading}
              className={i > 0 ? "mt-8" : undefined}
            >
              <h3 className="font-mono text-xs uppercase tracking-wider text-slate-500">
                {section.heading.slice(0, typedLengths[i])}
                {!reducedMotion && isTypingNow && (
                  <span className="ml-0.5 inline-block h-3 w-[2px] animate-pulse bg-accent align-middle motion-reduce:animate-none" />
                )}
              </h3>
              <div
                className={`mt-3 transition-opacity duration-300 motion-reduce:transition-none ${
                  revealed[i] ? "opacity-100" : "opacity-0"
                }`}
              >
                {section.body}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default function CareerModal() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-navy-600 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-accent/50 hover:text-white"
      >
        経歴を見る
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="career-modal-title"
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 motion-safe:animate-[fade-in_150ms_ease-out] sm:p-6"
        >
          <CareerModalPanel onClose={close} />
        </div>
      )}
    </>
  );
}
