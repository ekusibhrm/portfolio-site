import type { ReactNode } from "react";

export default function Marquee({
  items,
  className,
}: {
  items: ReactNode[];
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`marquee-row overflow-hidden ${className ?? ""}`}
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <div key={i} className="flex shrink-0 items-center">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
