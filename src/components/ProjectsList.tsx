"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import ProjectCoverImage from "@/components/ProjectCoverImage";
import ProjectGallery from "@/components/ProjectGallery";

function canFloat() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function ProjectsList({ projects }: { projects: Project[] }) {
  // Starts closed on both server and the first client render so hydration
  // matches; opens from the URL hash (if any) on the client only, below.
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [hoverSlug, setHoverSlug] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const floatEnabledRef = useRef<boolean | null>(null);
  const pos = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const rafId = useRef<number | null>(null);
  // The preview is rendered via a portal to <body> so its `position: fixed`
  // is anchored to the viewport, not to any transformed ancestor (e.g. the
  // <Reveal> wrapper's scroll-entrance transform, which would otherwise
  // become its containing block). Portals only exist on the client.
  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPortalReady(true);
  }, []);

  useEffect(() => {
    function syncFromHash() {
      const hash = window.location.hash.replace("#", "");
      if (projects.some((p) => p.slug === hash)) setOpenSlug(hash);
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [projects]);

  useEffect(() => {
    function tick() {
      pos.current.rx += (pos.current.x - pos.current.rx) * 0.22;
      pos.current.ry += (pos.current.y - pos.current.ry) * 0.22;
      const el = previewRef.current;
      if (el) {
        el.style.transform = `translate3d(${pos.current.rx + 28}px, ${pos.current.ry + 28}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    }
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    pos.current.x = e.clientX;
    pos.current.y = e.clientY;
  }

  function handleRowEnter(slug: string) {
    if (floatEnabledRef.current === null) floatEnabledRef.current = canFloat();
    if (!floatEnabledRef.current) return;
    setHoverSlug(slug);
  }

  function handleRowLeave() {
    setHoverSlug(null);
  }

  const hoveredProject =
    hoverSlug && hoverSlug !== openSlug
      ? projects.find((p) => p.slug === hoverSlug && p.coverImage)
      : undefined;

  return (
    <div
      ref={listRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col divide-y divide-navy-700 border-y border-navy-700"
    >
      {projects.map((project, i) => (
        <ProjectRow
          key={project.slug}
          index={i}
          project={project}
          open={openSlug === project.slug}
          onToggle={() =>
            setOpenSlug((cur) => (cur === project.slug ? null : project.slug))
          }
          onPointerEnter={() => handleRowEnter(project.slug)}
          onPointerLeave={handleRowLeave}
        />
      ))}

      {/* desktop-only floating preview that trails the cursor while
          hovering a collapsed row; portaled to <body> so its fixed
          positioning is anchored to the viewport */}
      {portalReady &&
        createPortal(
          <div
            ref={previewRef}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-50 hidden transition-opacity duration-200 lg:block"
            style={{ opacity: hoveredProject ? 1 : 0 }}
          >
            <div className="w-72 overflow-hidden rounded-xl border border-navy-600 bg-navy-900 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-1.5 border-b border-navy-700 bg-navy-900/80 px-3 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
              </div>
              <div className="relative aspect-video bg-navy-950">
                {hoveredProject?.coverImage && (
                  <Image
                    src={hoveredProject.coverImage}
                    alt=""
                    fill
                    sizes="288px"
                    className="object-cover object-top"
                  />
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

function ProjectRow({
  index,
  project,
  open,
  onToggle,
  onPointerEnter,
  onPointerLeave,
}: {
  index: number;
  project: Project;
  open: boolean;
  onToggle: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) {
  const panelId = `project-panel-${project.slug}`;
  const headingId = `project-heading-${project.slug}`;

  return (
    <div id={project.slug} className="scroll-mt-28">
      <h3 id={headingId}>
        <button
          type="button"
          onClick={onToggle}
          onMouseEnter={onPointerEnter}
          onMouseLeave={onPointerLeave}
          aria-expanded={open}
          aria-controls={panelId}
          data-cursor={open ? "CLOSE" : "OPEN"}
          className="group flex w-full items-center gap-4 py-6 text-left transition-colors hover:bg-white/[0.02] sm:gap-6 sm:py-8"
        >
          <span className="font-mono text-sm text-ink-faint tabular-nums sm:text-base">
            {String(index + 1).padStart(2, "0")}
          </span>

          {project.coverImage && (
            <span className="relative hidden h-12 w-20 shrink-0 overflow-hidden rounded-md border border-navy-700 bg-navy-900 sm:block">
              <Image
                src={project.coverImage}
                alt=""
                fill
                sizes="80px"
                className="object-cover object-top"
              />
            </span>
          )}

          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-xl font-bold text-white transition-colors group-hover:text-accent sm:text-2xl lg:text-3xl">
                {project.name}
              </span>
              <span className="truncate font-mono text-xs text-ink-faint sm:text-sm">
                {project.subtitle}
              </span>
            </span>
            <span className="mt-2 hidden flex-wrap gap-1.5 sm:flex">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-navy-600 px-2 py-0.5 font-mono text-[11px] text-ink-muted"
                >
                  {tech}
                </span>
              ))}
            </span>
          </span>

          <span
            aria-hidden
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy-600 font-mono text-sm text-ink-muted transition-all duration-300 group-hover:border-accent/50 group-hover:text-accent ${
              open ? "rotate-45 border-accent/50 text-accent" : ""
            }`}
          >
            +
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ProjectDetail project={project} />
        </div>
      </div>
    </div>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-6 pb-10 sm:pl-[6.25rem] sm:pr-4">
      {project.coverImage && (
        <div className="overflow-hidden rounded-xl border border-navy-700">
          <div className="flex items-center gap-1.5 border-b border-navy-700 bg-navy-900/60 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            <span className="ml-3 flex-1 truncate rounded-md border border-navy-600 bg-navy-950/60 px-3 py-1 text-center font-mono text-xs text-ink-muted">
              {project.demoUrl
                ? new URL(project.demoUrl).hostname
                : project.slug}
            </span>
          </div>
          <ProjectCoverImage
            src={project.coverImage}
            alt={`${project.name} スクリーンショット`}
          />
        </div>
      )}

      <div>
        <Label>課題</Label>
        <p className="mt-1.5 leading-relaxed text-ink-muted">
          {project.challenge}
        </p>
      </div>

      <div>
        <Label>技術選定</Label>
        <div className="mt-2 flex flex-wrap gap-2 sm:hidden">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-navy-600 bg-navy-900/60 px-2.5 py-1 font-mono text-xs text-accent"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="mt-2.5 leading-relaxed text-ink-muted">
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
                data-cursor="↗"
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
            <p className="mt-1.5 text-sm text-ink-faint">準備中</p>
          )}
        </div>

        <div>
          <Label>GitHub</Label>
          {project.gumroadUrl ? (
            <>
              <p className="mt-1.5 text-xs text-ink-faint">
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
                <p className="mt-1.5 text-xs text-ink-faint">
                  ※ 非公開リポジトリのため閲覧には権限が必要です
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
      {children}
    </span>
  );
}
