import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectsList from "@/components/ProjectsList";
import TableOfContents from "@/components/TableOfContents";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import ProjectHaptics from "@/components/ProjectHaptics";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-navy-900">
      <Header />

      <main
        id="projects"
        className="relative overflow-hidden px-6 py-24 sm:px-8 sm:py-32"
      >
        <Parallax
          speed={0.06}
          className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        />
        <Parallax
          speed={-0.05}
          className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent-2/10 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-5xl">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-mono text-sm text-accent">
                <span className="text-ink-faint">$</span> ls ./projects
              </h2>
              <p className="mt-3 font-display text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[0.95] tracking-tight text-white">
                Selected Work
              </p>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-muted sm:text-right">
              実案件からデモ用のプロジェクトまで、設計の意図と技術選定の理由を添えてまとめています。クリックで詳細を展開できます。
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-12 sm:mt-16">
            <ProjectsList projects={projects} />
          </Reveal>
        </div>
      </main>

      <Footer />

      <TableOfContents projects={projects} />
      <ProjectHaptics projects={projects} />
    </div>
  );
}
