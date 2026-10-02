"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/lib/site";

/**
 * Hero image scroll-scale. The Figma prototype cannot express scroll-linked
 * transforms (see docs/PRD.md §6.8), so the 1.25 → 1.0 curve lives here.
 */
export function HeroImage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.35], [1.25, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.35], [0, 24]);

  return (
    <div ref={ref} className="relative mt-10 w-full overflow-hidden">
      <motion.div
        style={reduced ? undefined : { scale, borderRadius: radius }}
        className="aspect-[16/9] w-full origin-center bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent lg:aspect-[21/9]"
        role="img"
        aria-label={`${site.name} — hero image placeholder`}
      />
    </div>
  );
}
