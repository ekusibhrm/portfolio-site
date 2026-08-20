import type { Project } from "@/lib/projects";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectCoverImage from "@/components/ProjectCoverImage";

export default function ProjectCard({ project }: { project: Project }) {
  const addressBarText = project.demoUrl
    ? new URL(project.demoUrl).hostname
    : project.slug;

  return (
    <article
      id={project.slug}
      className="group scroll-mt-6 overflow-hidden rounded-2xl border border-navy-700 shadow-[0_8px_30px_rgba(0,0,0,0.35),0_0_0_1px_rgba(127,216,255,0.08)] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_0_1px_rgba(127,216,255,0.16)]"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      {/* code-editor / browser style title bar */}
      <div className="flex items-center gap-1.5 border-b border-navy-700 bg-navy-900/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        {project.coverImage ? (
          <span className="ml-3 flex-1 truncate rounded-md border border-navy-600 bg-navy-950/60 px-3 py-1 text-center font-mono text-xs text-slate-400">
            {addressBarText}
          </span>
        ) : (
          <span className="ml-3 truncate font-mono text-xs text-slate-400">
            {project.slug}
          </span>
        )}
      </div>

      {project.coverImage && (
        <ProjectCoverImage
          src={project.coverImage}
          alt={`${project.name} スクリーンショット`}
        />
      )}

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
                className={
                  tech === "Laravel"
                    ? "rounded-md border border-[#f5c56b]/40 bg-[#f5c56b]/10 px-2.5 py-1 font-mono text-xs text-[#f5c56b]"
                    : "rounded-md border border-navy-600 bg-navy-900/60 px-2.5 py-1 font-mono text-xs text-accent"
                }
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
            ) : project.screenshots && project.screenshots.length > 0 ? (
              <div className="mt-1.5">
                <ProjectGallery images={project.screenshots} alt={project.name} />
                {project.screenshotsNote && (
                  <p className="mt-1.5 text-xs text-accent-2">
                    {project.screenshotsNote}
                  </p>
                )}
              </div>
            ) : (
              <p className="mt-1.5 text-sm text-slate-500">準備中</p>
            )}
          </div>

          <div>
            <Label>GitHub</Label>
            {project.gumroadUrl ? (
              <>
                <p className="mt-1.5 text-xs text-slate-500">
                 ※ Gumroadで販売中の商品のため、非公開です
                </p>
                <a
                  href={project.gumroadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1.5 font-medium text-[#FF90E8] hover:opacity-80 hover:underline"
                >
                  Gumroad ↗
                </a>
              </>
            ) : (
              <>
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
              </>
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
