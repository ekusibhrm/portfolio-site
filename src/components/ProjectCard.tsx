import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-navy-700 bg-navy-800/60">
      {/* code-editor style title bar */}
      <div className="flex items-center gap-1.5 border-b border-navy-700 bg-navy-900/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 truncate font-mono text-xs text-slate-400">
          {project.slug}
        </span>
      </div>

      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div>
          <h3 className="text-xl font-bold text-white">{project.name}</h3>
          <p className="mt-1 text-sm text-slate-400">{project.subtitle}</p>
        </div>

        <div>
          <Label>課題</Label>
          <p className="mt-1.5 leading-relaxed text-slate-300">
            {project.challenge}
          </p>
        </div>

        <div>
          <Label>技術選定</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-navy-600 bg-navy-900/60 px-2.5 py-1 font-mono text-xs text-accent"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-2.5 leading-relaxed text-slate-300">
            {project.techNote}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-navy-700 pt-6 sm:grid-cols-2">
          <div>
            <Label>デモリンク</Label>
            {project.demoUrl ? (
              <>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
                >
                  デモを見る ↗
                </a>
                {project.demoNote && (
                  <p className="mt-1.5 text-xs text-accent-2">
                    ※ {project.demoNote}
                  </p>
                )}
              </>
            ) : (
              <p className="mt-1.5 text-sm text-slate-500">準備中</p>
            )}
          </div>

          <div>
            <Label>GitHub</Label>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-flex items-center gap-1.5 font-medium text-slate-200 hover:text-white hover:underline"
            >
              リポジトリを見る ↗
            </a>
            {project.githubPrivate && (
              <p className="mt-1.5 text-xs text-slate-500">
                ※ 非公開リポジトリのため閲覧には権限が必要です
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
      {children}
    </span>
  );
}
