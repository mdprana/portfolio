import Link from "next/link";
import { capabilities, highlights } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { TechGrid, TechMarquee } from "@/components/tech-stack";

export function Capabilities() {
  return (
    <section className="mt-32" aria-labelledby="capabilities-heading">
      <h2 id="capabilities-heading" className="text-sm uppercase text-subtle">
        Capabilities
      </h2>
      <ul className="mt-8 border-t border-line">
        {capabilities.map((cap, i) => (
          <li key={cap.name} className="border-b border-line">
            <Reveal delay={i * 0.05}>
              <div className="group flex flex-col gap-2 py-8 transition-colors hover:bg-white/[0.03] md:flex-row md:items-baseline md:gap-8">
                <span aria-hidden className="text-subtle">
                  ↳
                </span>
                <h3 className="min-w-[280px] text-2xl font-bold tracking-tight">
                  {cap.name}
                </h3>
                <p className="max-w-prose text-muted">{cap.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href="/about" className="text-muted underline hover:text-fg">
          Read more about how I work
        </Link>
      </p>
    </section>
  );
}

export function Highlights() {
  return (
    <section className="mt-32" aria-labelledby="highlights-heading">
      <h2
        id="highlights-heading"
        className="text-5xl font-bold tracking-[-0.05em] sm:text-7xl"
      >
        Highlights
      </h2>
      <dl className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
        {highlights.map((item) => (
          <div key={item.value}>
            <dt className="sr-only">{item.label}</dt>
            <dd>
              <span className="block text-4xl font-bold tracking-tight">{item.value}</span>
              <span className="mt-2 block text-sm text-muted">{item.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Toolkit() {
  return (
    <section className="mt-32" aria-labelledby="toolkit-heading">
      <h2
        id="toolkit-heading"
        className="text-5xl font-bold tracking-[-0.05em] sm:text-7xl"
      >
        The Toolkit
      </h2>
      <p className="mt-4 max-w-prose text-muted">
        Tools I use in production work and published research.
      </p>
      <div className="mt-12">
        <TechGrid />
      </div>
      <div className="mt-8 border-y border-line">
        <TechMarquee />
      </div>
    </section>
  );
}
