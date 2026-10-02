"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUp } from "@/components/icons";
import type { Project } from "@/lib/content";

/**
 * Work Card (Figma set 25:57). Hover swaps Default → Hover: the cover zooms and
 * a "VIEW PROJECT" cursor badge follows the pointer (0.4s ease-out).
 */
export default function WorkCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const move = (e: React.MouseEvent) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    setPos({ x: e.clientX - box.left, y: e.clientY - box.top });
  };

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        ref={ref}
        onMouseMove={move}
        className="relative aspect-[648/720] overflow-hidden bg-surface"
      >
        <div
          className="absolute inset-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          style={{
            backgroundImage: `linear-gradient(135deg, ${project.cover[0]}, ${project.cover[1]})`,
          }}
        />

        {/* Cursor badge — 48px white circle + blurred black pill. */}
        <div
          aria-hidden
          className="pointer-events-none absolute z-10 flex items-center transition-opacity duration-300"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(12px, -50%)",
            opacity: hover ? 1 : 0,
          }}
        >
          <span className="flex size-12 items-center justify-center rounded-pill bg-fg text-bg">
            <ArrowUp className="rotate-45" size={22} />
          </span>
          <span className="-ml-2 flex h-12 items-center rounded-pill bg-black/55 px-[22px] text-sm tracking-[0.02em] text-fg backdrop-blur-[12px]">
            VIEW PROJECT
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-4xl font-bold tracking-[-0.04em]">{project.title}</h3>
        <span className="text-2xl text-muted">{project.year}</span>
      </div>
    </Link>
  );
}
