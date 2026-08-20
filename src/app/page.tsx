import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import TableOfContents from "@/components/TableOfContents";
import Parallax from "@/components/Parallax";
import ProjectHaptics from "@/components/ProjectHaptics";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-navy-900">
      <Header />

      <main
        id="projects"
        className="relative overflow-hidden px-6 py-16 sm:py-20"
      >
        <Parallax
          speed={0.06}
          className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        />
        <Parallax
          speed={-0.05}
          className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent-2/10 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-3xl">
          <h2 className="font-mono text-sm text-slate-500">
            <span className="text-accent">$</span> ls ./projects
          </h2>
          <p className="mt-2 text-2xl font-bold text-white">プロジェクト</p>

          <div className="mt-8 flex flex-col gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <TableOfContents projects={projects} />
      <ProjectHaptics projects={projects} />
    </div>
  );
}
