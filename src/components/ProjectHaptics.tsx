"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/projects";

function supportsHaptics() {
  if (typeof window === "undefined") return false;
  if (!("vibrate" in navigator)) return false;
  // Vibration hardware is essentially a touch-device thing; PCs are
  // excluded even if the API happens to exist there.
  return window.matchMedia("(pointer: coarse)").matches;
}

export default function ProjectHaptics({ projects }: { projects: Project[] }) {
  const lastFiredRef = useRef<string | null>(null);

  useEffect(() => {
    if (!supportsHaptics()) return;

    const elements = projects
      .map((p) => document.getElementById(p.slug))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (lastFiredRef.current === id) continue;
          lastFiredRef.current = id;
          navigator.vibrate(50);
        }
      },
      { threshold: 0.25 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects]);

  return null;
}
