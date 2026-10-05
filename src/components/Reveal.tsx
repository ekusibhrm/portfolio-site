"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

export default function Reveal({
  as: Tag = "div",
  delay = 0,
  threshold = 0.15,
  className,
  children,
}: {
  as?: ElementType;
  /** Reveal delay in ms, staggered via CSS custom property. */
  delay?: number;
  threshold?: number;
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`reveal${className ? ` ${className}` : ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
