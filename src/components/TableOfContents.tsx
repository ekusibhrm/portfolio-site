"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects";

export default function TableOfContents({ projects }: { projects: Project[] }) {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const ids = ["home", ...projects.map((p) => p.slug), "contact"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects]);

  const inProjects = projects.some((p) => p.slug === activeId);

  return (
    <nav
      aria-label="目次"
      className="fixed bottom-4 right-4 z-40 xl:bottom-auto xl:left-6 xl:right-auto xl:top-1/2 xl:-translate-y-1/2"
    >
      <div className="w-48 rounded-xl border border-navy-700 bg-navy-950/90 px-4 py-4 font-mono text-[11px] leading-relaxed shadow-lg shadow-black/40 backdrop-blur-sm xl:w-56 xl:px-5 xl:py-5 xl:text-xs">
        <a
          href="#home"
          aria-current={activeId === "home" ? "location" : undefined}
          className={`block truncate transition-colors ${
            activeId === "home"
              ? "font-bold text-accent"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <span className="text-slate-600">{"├─ "}</span>home
        </a>

        <div
          className={`truncate ${inProjects ? "font-bold text-accent" : "text-slate-500"}`}
        >
          <span className="text-slate-600">{"├─ "}</span>projects/
        </div>

        <div>
          {projects.map((project, i) => {
            const isLast = i === projects.length - 1;
            const active = activeId === project.slug;
            return (
              <a
                key={project.slug}
                href={`#${project.slug}`}
                aria-current={active ? "location" : undefined}
                className={`block truncate transition-colors ${
                  active
                    ? "font-bold text-accent"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <span className="text-slate-600">
                  {"│  "}
                  {isLast ? "└─ " : "├─ "}
                </span>
                {project.slug}
              </a>
            );
          })}
        </div>

        <a
          href="#contact"
          aria-current={activeId === "contact" ? "location" : undefined}
          className={`block truncate transition-colors ${
            activeId === "contact"
              ? "font-bold text-accent"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <span className="text-slate-600">{"└─ "}</span>contact
        </a>
      </div>
    </nav>
  );
}
