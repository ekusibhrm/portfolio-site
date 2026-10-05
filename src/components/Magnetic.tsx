"use client";

import { useCallback, useRef, type ReactNode } from "react";

function canMagnetize() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Pulls its child toward the cursor within a small radius.
 * No-op on touch devices and when reduced motion is requested.
 */
export default function Magnetic({
  children,
  strength = 0.4,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const enabledRef = useRef<boolean | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (enabledRef.current === null) enabledRef.current = canMagnetize();
      if (!enabledRef.current) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate3d(${(x * strength).toFixed(1)}px, ${(y * strength).toFixed(1)}px, 0)`;
    },
    [strength],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
      style={{ transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </span>
  );
}
