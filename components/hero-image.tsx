"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Hero Image (Figma 14:15) is annotated "scroll scale 1.25 → 1.0": the cover
 * starts zoomed and settles as it scrolls into place.
 */
export default function HeroImage() {
  const ref = useRef<HTMLDivElement>(null);
  // 0 while the frame is still entering, 1 once it is fully in view.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="aspect-[1392/786] w-full overflow-hidden bg-surface">
      {/* Source photo from the Figma Hero Image fill. */}
      <motion.div
        className="size-full bg-[url(/hero.png)] bg-cover bg-center will-change-transform"
        style={{ scale: reduce ? 1 : scale }}
      />
    </div>
  );
}
