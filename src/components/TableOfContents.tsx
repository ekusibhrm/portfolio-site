"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects";

export default function TableOfContents({ projects }: { projects: Project[] }) {
  const [activeId, setActiveId] = useState("home");
  const [open, setOpen] = useState(true);

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
      <div className="w-52 xl:w-64">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="toc-tree"
          className={`flex w-full touch-manipulation items-center gap-1.5 border border-navy-700 bg-navy-950/95 px-4 py-3 backdrop-blur-sm xl:px-5 ${
            open ? "rounded-t-xl" : "rounded-xl"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-amber-400/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
          <span className="ml-2 flex-1 truncate text-left font-mono text-[11px] text-slate-400 xl:text-xs">
            目次
          </span>
          <span className="font-mono text-[10px] text-slate-500">
            {open ? "▾" : "▸"}
          </span>
        </button>

        <div
          id="toc-tree"
          className={`overflow-hidden bg-navy-950/95 backdrop-blur-sm transition-[max-height] duration-200 ease-out motion-reduce:transition-none ${
            open
              ? "max-h-[600px] rounded-b-xl border-x border-b border-navy-700"
              : "max-h-0"
          }`}
        >
          <div className="px-4 py-4 font-mono text-[11px] leading-relaxed xl:px-5 xl:py-5 xl:text-xs">
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
                    className={`block py-1 transition-colors ${
                      active
                        ? "text-accent"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <span
                      className={`block truncate ${active ? "font-bold" : ""}`}
                    >
                      <span className="text-slate-600">
                        {"│  "}
                        {isLast ? "└─ " : "├─ "}
                      </span>
                      {project.name}
                    </span>
                    <span className="block pl-[3.5em] text-[10px] leading-snug text-slate-600 xl:text-[11px]">
                      {project.subtitle}
                    </span>
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
        </div>
      </div>
    </nav>
  );
}
