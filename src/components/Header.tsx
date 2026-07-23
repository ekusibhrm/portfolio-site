import Image from "next/image";

export default function Header() {
  return (
    <header className="relative overflow-hidden border-b border-navy-700 bg-navy-950">
      {/* soft ambient light blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-16 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.16) 0%, rgba(27,36,54,0.10) 45%, transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-28 h-[380px] w-[380px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(41,53,76,0.35) 0%, rgba(34,211,238,0.08) 50%, transparent 75%)",
        }}
      />

      {/* subtle code-like grid accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto flex max-w-3xl flex-col gap-6 px-6 py-20 sm:py-24 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-sm text-accent">
            <span className="text-slate-500">$</span> whoami
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Hiromu
          </h1>

          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-mono text-sm text-accent">
            Laravel × AI開発エンジニア
          </p>

          <p className="max-w-xl leading-relaxed text-slate-300">
            PHP/Laravel歴8年。要件定義から設計・実装・テストまでを、Claude
            Codeを活用したAI駆動開発で高速に回すスタイルが得意です。
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#projects"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-sm shadow-accent/20 transition hover:bg-accent/90"
            >
              プロジェクトを見る
            </a>
            <a
              href="https://github.com/ekusibhrm"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-navy-600 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-accent/50 hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* character illustration (same character as the Lancers header image) */}
        <div className="pointer-events-none hidden shrink-0 select-none lg:block">
          <div
            className="relative h-[180px] w-[180px] overflow-hidden rounded-full ring-1 ring-accent/20"
            style={{ boxShadow: "0 0 48px rgba(34,211,238,0.16)" }}
          >
            <Image
              src="/character-hero.png"
              alt=""
              fill
              sizes="180px"
              className="scale-[1.15] object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
