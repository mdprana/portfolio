"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/content";

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Makassar",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Fixed width so the layout does not jitter as the seconds tick over.
  return (
    <span className="inline-block w-[150px] whitespace-nowrap tabular-nums" suppressHydrationWarning>
      {time || "00:00:00"} WITA
    </span>
  );
}

/** Menu Open — Mobile 390 (Figma 19:93). */
function MobileMenu({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("scroll-lock");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("scroll-lock");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-between bg-bg px-4 pb-8 pt-5">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-[15px]" onClick={onClose}>
          {profile.wordmark}
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="text-[15px] transition-colors duration-250 hover:text-muted"
        >
          CLOSE
        </button>
      </div>

      <nav
        className="flex flex-col gap-1"
        style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.3s" }}
        aria-label="Mobile"
      >
        {[{ label: "Home", href: "/" }, ...nav].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="text-[64px] font-bold leading-[1] tracking-[-0.04em]"
          >
            {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
          </Link>
        ))}
      </nav>

      <a href={`mailto:${profile.email}`} className="text-[18px]">
        {profile.email}
      </a>
    </div>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="frame relative top-0 z-50 flex items-center justify-between py-5 md:py-[30px]">
        <Link href="/" className="text-[15px] md:text-base">
          {profile.wordmark}
        </Link>

        <nav className="hidden items-center gap-12 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="block">
              <span className="roll">
                <span>{item.label}</span>
                <span aria-hidden>{item.label}</span>
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 text-[15px] md:text-base">
          <span className="hidden text-muted md:inline">LOCAL /</span>
          <Clock />
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-[15px] md:hidden"
          aria-expanded={open}
        >
          MENU
        </button>
      </header>

      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </>
  );
}
