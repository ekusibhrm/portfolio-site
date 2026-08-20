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

  const dotItems = [
    { id: "home", label: "Home" },
    ...projects.map((p) => ({ id: p.slug, label: p.name })),
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* Desktop file-tree TOC */}
      <nav
        aria-label="目次"
        className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      >
        <div className="w-56 rounded-xl border border-navy-700 bg-navy-950/85 px-5 py-5 font-mono text-xs leading-relaxed shadow-lg shadow-black/30 backdrop-blur-sm">
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

      {/* Mobile/tablet dot navigation */}
      <nav
        aria-label="目次"
        className="fixed left-3 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-3 xl:hidden"
      >
        {dotItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-label={item.label}
            aria-current={activeId === item.id ? "location" : undefined}
            className={`h-2 w-2 rounded-full border transition-all ${
              activeId === item.id
                ? "scale-125 border-accent bg-accent"
                : "border-slate-600 bg-transparent"
            }`}
          />
        ))}
      </nav>
    </>
  );
}
