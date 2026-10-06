"use client";

import { motion, useMotionValue } from "motion/react";
import { ArrowUp } from "@/components/icons";
import { MotionLink } from "@/components/motion";
import type { Project } from "@/lib/content";
import { hoverRoot, quint, tw } from "@/lib/motion";

/**
 * Work Card (Figma set 25:57). Hover swaps Default → Hover: the cover zooms and
 * a "VIEW PROJECT" cursor badge follows the pointer.
 */
export default function WorkCard({ project }: { project: Project }) {
  const left = useMotionValue(0);
  const top = useMotionValue(0);

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    left.set(e.clientX - box.left);
    top.set(e.clientY - box.top);
  };

  return (
    <MotionLink href={`/projects/${project.slug}`} className="block" {...hoverRoot}>
      <div onMouseMove={move} className="relative aspect-[648/720] overflow-hidden bg-surface">
        <motion.div
          className="absolute inset-0"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
          transition={{ duration: 0.4, ease: quint }}
          style={{
            backgroundImage: `linear-gradient(135deg, ${project.cover[0]}, ${project.cover[1]})`,
          }}
        />

        {/* Cursor badge — 48px white circle + blurred black pill. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-10 flex items-center"
          style={{ left, top, x: 12, y: "-50%" }}
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={tw(300)}
        >
          <span className="flex size-12 items-center justify-center rounded-pill bg-fg text-bg">
            <ArrowUp className="rotate-45" size={22} />
          </span>
          <span className="-ml-2 flex h-12 items-center rounded-pill bg-black/55 px-[22px] text-sm tracking-[0.02em] text-fg backdrop-blur-[12px]">
            VIEW PROJECT
          </span>
        </motion.div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-4xl font-bold tracking-[-0.04em]">{project.title}</h3>
        <span className="text-2xl text-muted">{project.year}</span>
      </div>
    </MotionLink>
  );
}
