"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide motion: inversion cursor, inertial scroll, scroll reveals.
 * All effects are opt-out (reduced motion) and non-blocking; content stays
 * visible when JS never runs because `.motion-reveal` only hides under
 * `html.motion-ready`.
 */
export default function SiteMotion() {
  const cursor = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const el = cursor.current;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    let frame = 0;

    /* ---- Scroll reveals: fade/slide in once, never hide again. ---- */
    let observer: IntersectionObserver | undefined;
    const nodes = document.querySelectorAll<HTMLElement>(
      "main section > .display, main section > div, main section > ul, footer > .display, footer > div",
    );
    if (!reduce && nodes.length) {
      root.classList.add("motion-ready");
      nodes.forEach(node => node.classList.add("motion-reveal"));
      observer = new IntersectionObserver(
        entries => {
          for (const entry of entries)
            if (entry.isIntersecting) {
              entry.target.classList.add("motion-in");
              observer?.unobserve(entry.target);
            }
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      nodes.forEach(node => observer?.observe(node));
    }

    /* ---- Cursor + inertial scroll are pointer-only extras. ---- */
    if (!fine || reduce) {
      return () => {
        observer?.disconnect();
        nodes.forEach(node => node.classList.remove("motion-reveal", "motion-in"));
        root.classList.remove("motion-ready");
      };
    }

    root.classList.add("custom-cursor");
    let x = 0, y = 0, px = 0, py = 0, angle = 0, hover = false, active = false;
    let target = scrollY, scrolling = false, last = 0;

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!active) { px = x; py = y; }
      active = true;
      hover = !!(event.target as Element | null)?.closest("a,button");
      if (el) el.style.opacity = "1";
      start();
    };
    const leave = () => { active = false; if (el) el.style.opacity = "0"; };

    const animate = (now: number) => {
      const dt = Math.min(48, now - (last || now));
      last = now;
      const ease = 1 - Math.exp(-dt / 90);
      px += (x - px) * ease;
      py += (y - py) * ease;
      if (el) {
        const speed = Math.min(0.25, Math.hypot(x - px, y - py) / 150);
        // Idle hover spins slowly so the blob keeps changing over time.
        const spin = hover ? now / 40 : 0;
        angle += (Math.atan2(y - py, x - px) * 180 / Math.PI - angle) * ease;
        const scale = hover ? 1.45 : 1;
        el.style.transform =
          `translate3d(${px}px,${py}px,0) rotate(${angle + spin}deg) scale(${scale * (1 + speed)},${scale * (1 - speed)})`;
      }
      if (scrolling) {
        const next = scrollY + (target - scrollY) * (1 - Math.exp(-dt / 150));
        window.scrollTo({ top: Math.abs(target - next) < 1 ? target : next, behavior: "instant" });
        if (Math.abs(target - scrollY) < 1) scrolling = false;
      }
      if (scrolling || (active && Math.hypot(x - px, y - py) > 0.1)) frame = requestAnimationFrame(animate);
      else { frame = 0; last = 0; }
    };
    function start() { if (!frame) frame = requestAnimationFrame(animate); }

    // Inertial wheel scroll. Bails out for zoom, keyboard, nested scrollers,
    // form fields and locked (menu-open) pages so nothing becomes unreachable.
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (root.classList.contains("scroll-lock") || document.body.style.overflow === "hidden") return;
      if ((event.target as Element | null)?.closest("input,textarea,select,[contenteditable=true]")) return;
      for (let node = event.target as HTMLElement | null; node && node !== document.body; node = node.parentElement) {
        const overflow = getComputedStyle(node).overflowY;
        if ((overflow === "auto" || overflow === "scroll") && node.scrollHeight > node.clientHeight) return;
      }
      if (!event.cancelable) return;
      event.preventDefault();
      if (!scrolling) target = scrollY;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1;
      const max = document.documentElement.scrollHeight - innerHeight;
      target = Math.max(0, Math.min(max, target + event.deltaY * unit));
      scrolling = true;
      start();
    };
    const stop = () => { scrolling = false; target = scrollY; };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", stop);
    window.addEventListener("pointerdown", stop);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      nodes.forEach(node => node.classList.remove("motion-reveal", "motion-in"));
      root.classList.remove("custom-cursor", "motion-ready");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("pointerdown", stop);
      if (el) el.style.opacity = "0";
    };
  }, [pathname]);

  return <div ref={cursor} className="site-cursor" aria-hidden="true" />;
}
