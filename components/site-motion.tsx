"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate, inView, motion, useMotionValue, useSpring } from "motion/react";
import { quint } from "@/lib/motion";

const spring = { stiffness: 500, damping: 60, mass: 1 };

/**
 * Site-wide motion: inversion cursor, inertial scroll, scroll reveals.
 * All effects are opt-out (reduced motion) and non-blocking; content stays
 * visible when JS never runs because reveal targets are only hidden here.
 */
export default function SiteMotion() {
  const pathname = usePathname();
  const opacity = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);
  const size = useSpring(28, spring);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    let frame = 0;

    /* ---- Scroll reveals: fade/slide in once, never hide again. ---- */
    const nodes = reduce
      ? []
      : [...document.querySelectorAll<HTMLElement>(
          "main section > .display, main section > div, main section > ul, footer > .display, footer > div",
        )].filter(node => !node.hasAttribute("data-reveal"));
    nodes.forEach(node => animate(node, { opacity: 0, y: 36 }, { duration: 0.22, ease: quint }));
    const stopReveal = inView(
      nodes,
      node => { animate(node, { opacity: 1, y: 0 }, { duration: 0.9, ease: quint }); },
      { margin: "0px 0px -8% 0px" },
    );
    const resetReveal = () => {
      stopReveal();
      nodes.forEach(node => { node.style.opacity = ""; node.style.transform = ""; });
    };

    /* ---- Cursor + inertial scroll are pointer-only extras. ---- */
    if (!fine || reduce) {
      return resetReveal;
    }

    root.classList.add("custom-cursor");
    let visible = false;
    let target = scrollY, scrolling = false, last = 0;

    const fade = (to: number) => animate(opacity, to, { type: "tween", duration: 0.2 });
    const move = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      if (!visible) { x.jump(event.clientX); y.jump(event.clientY); visible = true; fade(1); }
    };
    const leave = () => { visible = false; fade(0); };
    const press = () => size.set(16);
    const release = () => size.set(28);

    const tick = (now: number) => {
      const dt = Math.min(48, now - (last || now));
      last = now;
      const next = scrollY + (target - scrollY) * (1 - Math.exp(-dt / 150));
      window.scrollTo({ top: Math.abs(target - next) < 1 ? target : next, behavior: "instant" });
      if (Math.abs(target - scrollY) < 1) scrolling = false;
      if (scrolling) frame = requestAnimationFrame(tick);
      else { frame = 0; last = 0; }
    };
    function start() { if (!frame) frame = requestAnimationFrame(tick); }

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
    const stop = () => { scrolling = false; target = scrollY; cancelAnimationFrame(frame); frame = 0; last = 0; };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", stop);
    window.addEventListener("pointerdown", stop);

    return () => {
      cancelAnimationFrame(frame);
      resetReveal();
      root.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("pointerdown", stop);
      opacity.set(0);
      size.jump(28);
    };
  }, [pathname, opacity, mouseX, mouseY, x, y, size]);

  return (
    <motion.div
      className="site-cursor"
      aria-hidden="true"
      style={{ x, y, width: size, height: size, opacity }}
    />
  );
}
