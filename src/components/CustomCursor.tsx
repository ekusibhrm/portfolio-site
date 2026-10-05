"use client";

import { useEffect, useRef, useState } from "react";

const EASE = 0.18;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  // Starts false on both server and the first client render so hydration
  // matches; flips on the client only, inside the effect below.
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number;
    let visible = false;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dotRef.current?.style.setProperty("opacity", "1");
        ringRef.current?.style.setProperty("opacity", "1");
      }
      dotRef.current?.style.setProperty(
        "transform",
        `translate3d(${mouseX}px, ${mouseY}px, 0)`,
      );
    }

    function onLeave() {
      visible = false;
      dotRef.current?.style.setProperty("opacity", "0");
      ringRef.current?.style.setProperty("opacity", "0");
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const interactive = target.closest<HTMLElement>(
        "a, button, [data-cursor]",
      );
      if (interactive) {
        setActive(true);
        setLabel(interactive.dataset.cursor ?? "");
      } else {
        setActive(false);
        setLabel("");
      }
    }

    function tick() {
      ringX += (mouseX - ringX) * EASE;
      ringY += (mouseY - ringY) * EASE;
      ringRef.current?.style.setProperty(
        "transform",
        `translate3d(${ringX}px, ${ringY}px, 0)`,
      );
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          opacity: 0,
          width: active ? (label ? 64 : 48) : 36,
          height: active ? (label ? 64 : 48) : 36,
          margin: active
            ? label
              ? "-32px 0 0 -32px"
              : "-24px 0 0 -24px"
            : "-18px 0 0 -18px",
          background: active
            ? "rgba(34,211,238,0.12)"
            : "rgba(34,211,238,0.04)",
          borderColor: active
            ? "rgba(34,211,238,0.7)"
            : "rgba(34,211,238,0.45)",
        }}
      >
        {label}
      </div>
    </>
  );
}
