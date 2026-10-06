"use client";

import { motion } from "motion/react";

import FitText from "@/components/fit-text";
import {
  ArrowUp,
  Download,
} from "@/components/icons";
import { MotionLink } from "@/components/motion";
import { footerColumns, profile } from "@/lib/content";
import { color, hoverRoot, textMuted, tw } from "@/lib/motion";

export function Pill({
  label,
  href,
  tone = "light",
}: {
  label: string;
  href: string;
  tone?: "light" | "dark";
}) {
  const [rest, hover] =
    tone === "light" ? [color.fg, color.muted] : [color.surface, color.surface2];
  return (
    <MotionLink
      href={href}
      className={`inline-flex h-[51px] items-center rounded-pill px-7 text-base font-medium ${
        tone === "light" ? "text-bg" : "text-fg"
      }`}
      initial={{ backgroundColor: rest }}
      whileHover={{ backgroundColor: hover }}
      transition={tw(300)}
    >
      {label}
    </MotionLink>
  );
}

export function ResumeButton() {
  return (
    <motion.a
      href={profile.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-[53px] items-center gap-3 rounded-pill border border-fg px-7 text-base font-medium"
      initial={{ backgroundColor: color.clear, color: color.fg }}
      whileHover={{ backgroundColor: color.fg, color: color.bg }}
      transition={tw(250)}
    >
      <Download />
      Download Resume
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer className="frame flex flex-col gap-12 pb-8 pt-6">
      <a href={`mailto:${profile.email}`} aria-label="Get in touch by email"><FitText text="Get in touch" as="p" /></a>

      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <p className="body-xl max-w-[760px] text-muted">
          Have a project, role, or dataset in mind? Let’s talk.
        </p>
        <div className="flex gap-3">
          <Pill label="Say Hello" href={`mailto:${profile.email}`} />
          <ResumeButton />
        </div>
      </div>

      <hr className="border-line" />

      <div className="flex flex-col gap-10 md:flex-row md:justify-between">
        <p className="text-[96px] font-bold leading-[0.8] tracking-[-0.04em]">
          {profile.wordmark}
        </p>

        <div className="flex flex-wrap gap-16 md:gap-24">
          {footerColumns.map((column) => (
            <div key={column.label} className="flex flex-col gap-2.5 text-base">
              <p className="text-muted">{column.label}</p>
              {column.links.map((link) =>
                link.href ? (
                  <MotionLink key={link.text} href={link.href} {...hoverRoot} variants={textMuted} transition={tw(250)}>
                    {link.text}
                  </MotionLink>
                ) : (
                  <span key={link.text}>{link.text}</span>
                ),
              )}
            </div>
          ))}

          <MotionLink
            href="#top"
            className="inline-flex items-start gap-2 self-start text-base"
            {...hoverRoot}
            variants={textMuted}
            transition={tw(250)}
          >
            Back to Top
            <ArrowUp />
          </MotionLink>
        </div>
      </div>

      <div className="flex justify-between text-sm text-subtle">
        <span suppressHydrationWarning>© {new Date().getFullYear()} Prana. All rights reserved.</span>
        <span>Designed &amp; built by Prana</span>
      </div>
    </footer>
  );
}
