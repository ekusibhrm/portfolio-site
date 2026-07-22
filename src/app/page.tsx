import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-navy-900">
      <Header />

      <main id="projects" className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:py-20">
        <h2 className="font-mono text-sm text-slate-500">
          <span className="text-accent">$</span> ls ./projects
        </h2>
        <p className="mt-2 text-2xl font-bold text-white">プロジェクト</p>

        <div className="mt-8 flex flex-col gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
