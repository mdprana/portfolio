/**
 * Shared Framer Motion presets. Plain module (no "use client") so Server
 * Components can pass these as props to `motion/react-client` elements.
 */

export const quint = [0.22, 1, 0.36, 1] as const;

/** Tailwind's default `transition-*` curve, which the hover states used. */
export const tw = (ms: number) => ({ duration: ms / 1000, ease: [0.4, 0, 0.2, 1] as const });

/**
 * Resolved @theme tokens from app/globals.css. Motion cannot interpolate
 * `var(--…)` reliably here (--color-line uses `rgb(r g b / a%)`, which its
 * color parser misreads), so the literal values are mirrored.
 */
export const color = {
  bg: "#000000",
  fg: "#ffffff",
  black: "#000000",
  muted: "#b3b3b3",
  subtle: "#999999",
  surface: "#111111",
  surface2: "#1c1c1c",
  line: "rgba(255, 255, 255, 0.15)",
  clear: "rgba(255, 255, 255, 0)",
};

/** Spread on a hover root; descendants with rest/hover variants follow it. */
export const hoverRoot = { initial: "rest", animate: "rest", whileHover: "hover" } as const;

export const textMuted = { rest: { color: color.fg }, hover: { color: color.muted } };
export const rowBorder = { rest: { borderColor: color.line }, hover: { borderColor: color.fg } };
export const rowGap = { rest: { gap: 24 }, hover: { gap: 36 } };
