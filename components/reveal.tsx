"use client";

import { useEffect, useRef } from "react";

/** Adds `in` when the element scrolls into view (Figma Timeline/tile reveal). */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.transitionDelay = entry.isIntersecting ? `${delay}ms` : "0ms";
        el.classList.toggle("in", entry.isIntersecting);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
