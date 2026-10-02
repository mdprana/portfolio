import Link from "next/link";
import { Clock } from "@/components/clock";
import { site } from "@/lib/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-sm">
      <nav
        aria-label="Main"
        className="mx-auto flex h-[79px] w-full max-w-content items-center justify-between px-gutter"
      >
        <Link href="/" className="font-bold tracking-tight">
          {site.wordmark}
        </Link>

        <ul className="flex items-center gap-8 text-sm uppercase">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-block py-2 transition-colors hover:text-muted"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Clock />
      </nav>
    </header>
  );
}
