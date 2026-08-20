"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";

function canTilt() {
  if (typeof window === "undefined") return false;
  const fineHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  return fineHover && !reduceMotion;
}

export default function TiltWrapper({
  children,
  className,
  maxTiltX = 8,
  maxTiltY = 10,
}: {
  children: ReactNode;
  className?: string;
  maxTiltX?: number;
  maxTiltY?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [tiltEnabled] = useState(canTilt);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tiltEnabled) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTransform(
        `perspective(800px) rotateX(${(-y * maxTiltX).toFixed(2)}deg) rotateY(${(x * maxTiltY).toFixed(2)}deg)`,
      );
    },
    [tiltEnabled, maxTiltX, maxTiltY],
  );

  const handleMouseLeave = useCallback(() => setTransform(""), []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transform, transition: "transform 0.15s ease-out" }}
    >
      {children}
    </div>
  );
}
