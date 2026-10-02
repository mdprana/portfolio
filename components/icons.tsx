import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function ArrowRight({ size = 32, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden {...props}>
      <path
        d="M6 16h20M18 8l8 8-8 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ArrowSub({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden {...props}>
      <path
        d="M3 2v6h9M9 5l3 3-3 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ArrowUp({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden {...props}>
      <path
        d="M12 20V4M5 11l7-7 7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Download({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden {...props}>
      <path
        d="M8 1v9M4.5 6.5 8 10l3.5-3.5M1 14h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
      />
    </svg>
  );
}
