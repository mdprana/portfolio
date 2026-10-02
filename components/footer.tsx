import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto w-full max-w-content px-gutter py-16">
        <h2 className="text-5xl font-bold tracking-tight sm:text-7xl">
          <a href={`mailto:${site.email}`} className="hover:text-muted">
            Get in touch
          </a>
        </h2>

        <div className="mt-16 flex flex-col gap-10 sm:flex-row sm:justify-between">
          <nav aria-label="Footer">
            <h3 className="text-xs uppercase text-subtle">Navigate</h3>
            <ul className="mt-4 space-y-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs uppercase text-subtle">Social</h3>
            <ul className="mt-4 space-y-1">
              {Object.entries(site.socials).map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    rel="me noreferrer"
                    target="_blank"
                    className="text-muted capitalize hover:text-fg"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase text-subtle">Direct</h3>
            <ul className="mt-4 space-y-1">
              <li>
                <a href={`mailto:${site.email}`} className="text-muted hover:text-fg">
                  {site.email}
                </a>
              </li>
              <li>
                <a href="#top" className="text-muted hover:text-fg">
                  Back to Top
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-16 text-sm text-subtle">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
      </div>
    </footer>
  );
}
