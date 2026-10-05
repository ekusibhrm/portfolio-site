import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-navy-700 bg-navy-950"
    >
      <Parallax
        speed={0.05}
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />
      <Parallax
        speed={-0.04}
        className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-accent-2/[0.08] blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="font-mono text-sm text-accent">
            <span className="text-ink-faint">$</span> open ./contact
          </h2>
          <p className="mt-3 max-w-2xl text-balance font-display text-[clamp(2rem,5.5vw,3.75rem)] font-bold leading-[1.02] tracking-tight text-white">
            何かつくりませんか。
            <br />
            まずは気軽にご連絡ください。
          </p>
        </Reveal>

        <Reveal
          delay={100}
          className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <Magnetic>
            <a
              href="https://github.com/ekusibhrm"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GITHUB"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-navy-950 shadow-sm shadow-accent/20 transition hover:bg-accent/90"
            >
              GitHub経由でご連絡ください ↗
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://zenn.dev/ekusibhrm"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="ZENN"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-navy-600 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-accent/50 hover:text-white"
            >
              Zenn（書籍・技術記事）↗
            </a>
          </Magnetic>
        </Reveal>
      </div>

      <div className="relative border-t border-navy-800 px-6 py-6 sm:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-4 pb-24 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>© {year} Hiromu — Built with Next.js &amp; Tailwind CSS</p>
          <Magnetic>
            <a
              href="#home"
              data-cursor="TOP"
              className="inline-flex items-center gap-1.5 font-mono text-ink-muted transition hover:text-accent"
            >
              back to top ↑
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
