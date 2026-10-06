"use client";

import { motion } from "motion/react";
import { quint } from "@/lib/motion";

/** Fades up while in view, hides again on exit (Figma Timeline/tile reveal). */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ margin: "0px 0px -15% 0px" }}
      variants={{
        hidden: { opacity: 0, y: 28, transition: { duration: 0.8, ease: quint } },
        shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: quint, delay: delay / 1000 } },
      }}
    >
      {children}
    </motion.div>
  );
}
