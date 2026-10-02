import Link from "next/link";
import { HeroImage } from "@/components/hero-image";
import { Reveal } from "@/components/reveal";
import { Capabilities, Highlights, Toolkit } from "@/components/sections";
import { Shell } from "@/components/shell";
import { Footer } from "@/components/footer";
import { WorkCard } from "@/components/work-card";
import { projects } from "@/lib/content";
import { site } from "@/lib/site";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <a
        id="top"
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>

      <Shell>
        <span id="main" />

        <section className="pt-16" aria-labelledby="hero-heading">
          <h1
            id="hero-heading"
            className="text-[20vw] font-bold leading-[0.8] tracking-[-0.05em] lowercase"
          >
            {site.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-2xl font-bold tracking-[-0.04em] text-muted sm:text-4xl">
            {site.intro}
          </p>
          <HeroImage />
        </section>

        <section className="mt-32" aria-labelledby="featured-heading">
          <h2
            id="featured-heading"
            className="text-5xl font-bold tracking-[-0.05em] sm:text-7xl"
          >
            Featured Projects
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.06}>
                <WorkCard project={project} />
              </Reveal>
            ))}
          </div>
          <p className="mt-10">
            <Link href="/projects" className="text-muted underline hover:text-fg">
              View all projects
            </Link>
          </p>
        </section>

        <Capabilities />
        <Toolkit />
        <Highlights />
      </Shell>

      <Footer />
    </>
  );
}
