import Image from "next/image";
import Parallax from "@/components/Parallax";
import TiltWrapper from "@/components/TiltWrapper";
import CareerModal from "@/components/CareerModal";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";

const stack = [
  "PHP",
  "Laravel",
  "CakePHP",
  "Next.js",
  "TypeScript",
  "MySQL",
  "Claude Code",
  "Cursor",
];

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
      className="relative overflow-hidden border-b border-navy-700 bg-navy-950/40"
    >
      {/* subtle code-like grid accent, drifting slowly on scroll */}
      <Parallax
        speed={0.08}
        className="pointer-events-none absolute inset-x-0 -inset-y-24 opacity-[0.05]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
      </Parallax>

      <Parallax
        speed={-0.04}
        className="pointer-events-none absolute -right-40 -top-24 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[110px]"
      />
      <Parallax
        speed={0.05}
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-accent-2/[0.07] blur-[100px]"
      />

      <div className="relative mx-auto flex min-h-[86svh] w-full max-w-5xl flex-col justify-center gap-10 px-6 py-24 sm:px-8 lg:min-h-[92svh]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="flex max-w-2xl flex-col gap-7">
            <Reveal className="flex items-center justify-between gap-4">
              <p className="font-mono text-sm text-accent">
                <span className="typing-whoami">
                  <span className="text-ink-faint">$</span> whoami
                </span>
              </p>

              {/* small character illustration for mobile/tablet */}
              <div
                className="h-16 w-16 shrink-0 select-none rounded-full lg:hidden"
                style={{ boxShadow: "0 0 24px rgba(34,211,238,0.18)" }}
              >
                <TiltWrapper
                  maxTiltX={10}
                  maxTiltY={10}
                  className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-accent/25"
                >
                  <Image
                    src="/character-hero.png"
                    alt=""
                    fill
                    sizes="64px"
                    priority
                    className="pointer-events-none scale-[1.15] object-cover"
                  />
                </TiltWrapper>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="font-display text-balance text-[clamp(3.2rem,11vw,7.5rem)] font-bold leading-[0.92] tracking-tight text-white">
                Hiromu
              </h1>
            </Reveal>

            <Reveal delay={170} className="flex flex-wrap items-center gap-3">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-mono text-sm text-accent">
                Laravel × AI駆動開発エンジニア
              </p>
              <span className="font-mono text-xs text-ink-faint">
                PHP歴 8年
              </span>
            </Reveal>

            <Reveal delay={230}>
              <p className="max-w-xl text-lg leading-relaxed text-ink-muted">
                要件定義から設計・実装・テストまでを、Claude
                Codeを活用したAI駆動開発で高速に回すスタイルが得意です。
                一人で仕様から本番運用まで一気通貫で担当します。
              </p>
            </Reveal>

            <Reveal
              delay={290}
              className="flex flex-nowrap gap-2 pt-2 sm:gap-3"
            >
              <Magnetic>
                <a
                  href={projectsHref}
                  {...(projectsExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  data-cursor="VIEW"
                  className="rounded-lg bg-accent px-3 py-2.5 text-xs font-semibold whitespace-nowrap text-navy-950 shadow-sm shadow-accent/20 transition hover:bg-accent/90 sm:px-6 sm:py-3 sm:text-sm"
                >
                  プロジェクトを見る
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://github.com/ekusibhrm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-navy-600 px-3 py-2.5 text-xs font-semibold whitespace-nowrap text-slate-200 transition hover:border-accent/50 hover:text-white sm:px-6 sm:py-3 sm:text-sm"
                >
                  GitHub
                </a>
              </Magnetic>
              <CareerModal />
            </Reveal>
          </div>

          {/* character illustration (same character as the Lancers header image) */}
          <Reveal
            delay={120}
            className="hidden shrink-0 select-none lg:block"
          >
            <div
              className="relative h-[220px] w-[220px] rounded-full xl:h-[260px] xl:w-[260px]"
              style={{ boxShadow: "0 0 56px rgba(34,211,238,0.18)" }}
            >
              <TiltWrapper
                maxTiltX={10}
                maxTiltY={12}
                className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-accent/25"
              >
                <Image
                  src="/character-hero.png"
                  alt="Hiromuのアイコンイラスト"
                  fill
                  sizes="260px"
                  priority
                  className="pointer-events-none scale-[1.15] object-cover"
                />
              </TiltWrapper>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-navy-700 bg-navy-950/90 px-3 py-1 font-mono text-[10px] text-ink-muted backdrop-blur-sm">
                building with Claude Code
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={360}
          className="flex items-center gap-2 self-start font-mono text-[11px] text-ink-faint"
        >
          <span className="flex h-6 w-4 items-start justify-center rounded-full border border-navy-600">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-[soft-bounce_1.6s_ease-in-out_infinite]" />
          </span>
          scroll
        </Reveal>
      </div>

      <div className="relative border-t border-navy-700 bg-navy-950/60 py-4">
        <Marquee
          className="text-ink-faint"
          items={stack.map((item) => (
            <span
              key={item}
              className="flex items-center gap-6 px-6 font-mono text-xs tracking-wide sm:text-sm"
            >
              {item}
              <span className="text-accent/40">／</span>
            </span>
          ))}
        />
      </div>
    </header>
  );
}
