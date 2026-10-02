"use client";

import { useEffect, useRef } from "react";
import type { Ref } from "react";

/**
 * Figma types every display heading as "fit width" — the glyphs always fill the
 * 1392px column. Resolve the exact font-size by measuring the rendered string
 * (letter-spacing included) and scaling to the container. Renders at a sane
 * vw fallback first so there is no layout jump before hydration.
 */
export default function FitText({
  text,
  className = "",
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const width = el.clientWidth;
      if (!width) return;
      el.style.fontSize = "100px";
      const natural = el.scrollWidth;
      if (natural) el.style.fontSize = `${(width * 100) / natural}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    document.fonts?.ready.then(fit);
    return () => observer.disconnect();
  }, [text]);

  return (
    // Tag is a union of intrinsic elements, so the ref widens to the union.
    <Tag ref={ref as unknown as Ref<HTMLHeadingElement>} className={`display ${className}`}>
      {text}
    </Tag>
  );
}
