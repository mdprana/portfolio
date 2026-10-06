"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import type { AnimationPlaybackControls } from "motion/react";

/** Tech Stack marquee: 0 → −50% over 40s on a duplicated track, paused on hover. */
export default function Marquee({ children }: { children: React.ReactNode }) {
  const x = useMotionValue("0%");
  const reduce = useReducedMotion();
  const controls = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    if (reduce) return;
    const loop = animate(x, ["0%", "-50%"], { duration: 40, ease: "linear", repeat: Infinity });
    controls.current = loop;
    return () => loop.stop();
  }, [x, reduce]);

  return (
    <div
      className="overflow-hidden py-5"
      aria-hidden
      onPointerEnter={() => controls.current?.pause()}
      onPointerLeave={() => controls.current?.play()}
    >
      <motion.div className="flex w-max items-center gap-10" style={{ x }}>
        {children}
      </motion.div>
    </div>
  );
}
