"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export default function Parallax({
  speed = 0.15,
  ease = 0.08,
  className,
  children,
}: {
  /** Position multiplier: how far the element drifts relative to scroll. */
  speed?: number;
  /** Catch-up rate per frame (0-1). Lower = more inertia/lag behind scroll. */
  ease?: number;
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let current = 0;
    let rafId: number | null = null;

    function target() {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return (rect.top - window.innerHeight / 2) * speed;
    }

    function tick() {
      const goal = target();
      current += (goal - current) * ease;

      if (el) {
        el.style.transform = `translate3d(0, ${current.toFixed(1)}px, 0)`;
      }

      // Keep animating (inertia catch-up) only while there's meaningful
      // distance left to close; stop once settled to save battery/CPU.
      if (Math.abs(goal - current) > 0.1) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    function onScroll() {
      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    }

    current = target();
    el.style.transform = `translate3d(0, ${current.toFixed(1)}px, 0)`;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [speed, ease]);

  return (
    <div ref={ref} aria-hidden className={className}>
      {children}
    </div>
  );
}
