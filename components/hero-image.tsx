"use client";

import { useEffect, useRef } from "react";

/**
 * Hero Image (Figma 14:15) is annotated "scroll scale 1.25 → 1.0": the cover
 * starts zoomed and settles as it scrolls into place.
 */
export default function HeroImage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      // 0 while the frame is still entering, 1 once it is fully in view.
      const progress = Math.min(1, Math.max(0, (window.innerHeight - box.top) / box.height));
      const scale = 1.25 - 0.25 * progress;
      el.style.transform = `scale(${scale.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="aspect-[1392/786] w-full overflow-hidden bg-surface">
      {/* Source photo from the Figma Hero Image fill. */}
      <div
        ref={ref}
        className="size-full bg-[url(/hero.png)] bg-cover bg-center will-change-transform"
      />
    </div>
  );
}
