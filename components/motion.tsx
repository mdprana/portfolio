"use client";

import Link from "next/link";
import { MotionConfig, motion } from "motion/react";

export const MotionLink = motion.create(Link);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
