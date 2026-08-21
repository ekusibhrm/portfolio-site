import Image from "next/image";
import Parallax from "@/components/Parallax";
import TiltWrapper from "@/components/TiltWrapper";
import CareerModal from "@/components/CareerModal";

export default function Header({
  projectsHref = "#projects",
  projectsExternal = false,
}: {
  projectsHref?: string;
  projectsExternal?: boolean;
}) {
  return (
    <header
      id="home"
      className="relative overflow-hidden border-b border-navy-700"
      style={{
        background:
          "radial-gradient(circle at 80% 20%, rgba(127,216,255,0.15) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(90,130,220,0.12) 0%, transparent 40%), var(--color-navy-950)",
      }}
    >
      {/* subtle code-like grid accent, drifting slowly on scroll */}
      <Parallax
        speed={0.08}
        className="pointer-events-none absolute inset-x-0 -inset-y-24 opacity-[0.06]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </Parallax>

      <div className="relative mx-auto flex max-w-3xl flex-col gap-6 px-4 py-20 sm:px-6 sm:py-24 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-sm text-accent">
              <span className="typing-whoami">
                <span className="text-slate-500">$</span> whoami
              </span>
            </p>

            {/* small character illustration for mobile/tablet */}
            <div
              className="h-16 w-16 shrink-0 select-none rounded-full lg:hidden"
              style={{ boxShadow: "0 0 24px rgba(34,211,238,0.16)" }}
            >
              <TiltWrapper
                maxTiltX={10}
                maxTiltY={10}
                className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-accent/20"
              >
                <Image
                  src="/character-hero.png"
                  alt=""
                  fill
                  sizes="64px"
                  className="pointer-events-none scale-[1.15] object-cover"
                />
              </TiltWrapper>
            </div>
          </div>

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

          <div className="flex flex-nowrap gap-1.5 pt-2 sm:gap-3">
            <a
              href={projectsHref}
              {...(projectsExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="rounded-lg bg-accent px-2.5 py-2 text-xs font-semibold whitespace-nowrap text-navy-950 shadow-sm shadow-accent/20 transition hover:bg-accent/90 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              プロジェクトを見る
            </a>
            <a
              href="https://github.com/ekusibhrm"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-navy-600 px-2.5 py-2 text-xs font-semibold whitespace-nowrap text-slate-200 transition hover:border-accent/50 hover:text-white sm:px-5 sm:py-2.5 sm:text-sm"
            >
              GitHub
            </a>
            <CareerModal />
          </div>
        </div>

        {/* character illustration (same character as the Lancers header image) */}
        <div
          className="hidden h-[216px] w-[216px] shrink-0 select-none rounded-full lg:block"
          style={{ boxShadow: "0 0 48px rgba(34,211,238,0.16)" }}
        >
          <TiltWrapper
            maxTiltX={10}
            maxTiltY={12}
            className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-accent/20"
          >
            <Image
              src="/character-hero.png"
              alt=""
              fill
              sizes="216px"
              className="pointer-events-none scale-[1.15] object-cover"
            />
          </TiltWrapper>
        </div>
      </div>
    </header>
  );
}
