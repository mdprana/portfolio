import Link from "next/link";
import FitText from "@/components/fit-text";
import Reveal from "@/components/reveal";
import WorkCard from "@/components/work-card";
import { ArrowRight, ArrowSub } from "@/components/icons";
import {
  awards,
  capabilities,
  homeProjects,
  profile,
  stats,
  tools,
} from "@/lib/content";

/* Hero (Figma 14:15) — fit-width headline, 45px intro, 16:10 hero image. */
export function Hero() {
  return (
    <section id="top" className="frame flex flex-col gap-6 pb-2">
      <FitText text={profile.headline} as="h1" className="text-fg" />
      <p className="body-xl max-w-[980px] pb-8 text-muted">{profile.intro}</p>
      <div className="relative aspect-[1392/786] overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#18181B,#3F3F46)]" />
      </div>
    </section>
  );
}

/* Work Section (14:24) — 2×2 grid, 96px gutter, 72px row gap. */
export function FeaturedProjects() {
  return (
    <section className="frame flex flex-col gap-9 py-6">
      <FitText text="Featured Projects" />
      <div className="grid gap-[72px] md:grid-cols-2 md:gap-x-24">
        {homeProjects.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </div>
      <Link
        href="/projects"
        className="group mt-14 inline-flex items-center gap-4 text-4xl font-bold tracking-[-0.04em]"
      >
        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
        View all projects
      </Link>
    </section>
  );
}

/* About Section (14:21). */
export function About() {
  return (
    <section className="frame flex flex-col gap-10 pb-[120px] pt-6">
      <FitText text="About Prana" />
      <div className="flex flex-col gap-12 md:flex-row md:gap-16">
        <div className="h-[340px] w-[310px] shrink-0 bg-surface" />
        <div className="flex max-w-[760px] flex-col gap-14">
          {profile.paragraphs.map((paragraph) => (
            <p key={paragraph} className="body-xl text-fg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Capabilities (16:12) — hover widens the icon/label gap and lights the rule. */
export function Capabilities() {
  return (
    <section className="frame flex flex-col gap-12 pb-[120px] md:flex-row md:justify-between">
      <div className="flex flex-col gap-3">
        <span className="label">(Capabilities)</span>
        <p className="text-[45px] font-bold leading-none tracking-[-0.04em]">
          What I do
        </p>
      </div>

      <ul className="w-full max-w-[750px]">
        {capabilities.map((item) => (
          <li
            key={item.label}
            className="group flex h-[101px] flex-col justify-between border-b border-line transition-colors duration-300 hover:border-line-strong"
          >
            <span className="flex items-center gap-6 px-0 py-7 text-4xl font-bold tracking-[-0.04em] transition-all duration-300 group-hover:gap-9">
              <ArrowSub className={item.dim ? "text-dim" : "text-fg"} />
              <span className={item.dim ? "text-dim" : "text-fg"}>{item.label}</span>
            </span>
          </li>
        ))}
        <li className="pt-12">
          <Link href="/about" className="text-2xl transition-colors duration-250 hover:text-muted">
            Read more
          </Link>
        </li>
      </ul>
    </section>
  );
}

/* Tech Stack (32:156) — marquee + 232px periodic tile grid. */
export function TechStack() {
  const track = [...tools, ...tools];

  return (
    <section className="flex flex-col gap-10 pb-[120px]">
      <div className="frame">
        <FitText text="The Toolkit" />
      </div>

      <div className="frame flex items-end justify-between">
        <p className="body-xl max-w-[760px] text-muted">
          The tools I use to clean data, train models, and ship them to the web.
        </p>
        <div className="hidden flex-col gap-3 text-right md:flex">
          <span className="label">(Tech Stack)</span>
          <span className="label">12 elements · 5 groups</span>
        </div>
      </div>

      <div className="marquee overflow-hidden py-5" aria-hidden>
        <div className="marquee-track items-center gap-10">
          {track.map((tool, i) => (
            <div key={`${tool.name}-${i}`} className="flex items-center gap-10">
              <div className="flex items-center gap-3.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tool.logo} alt="" width={28} height={28} />
                <span className="text-[28px] font-bold tracking-[-0.03em]">
                  {tool.name}
                </span>
              </div>
              <span className="text-xl text-subtle">✳</span>
            </div>
          ))}
        </div>
      </div>

      <ul className="frame grid grid-cols-2 md:grid-cols-6">
        {tools.map((tool) => (
          <li
            key={tool.name}
            className="group relative flex h-[232px] flex-col justify-between border border-line p-4 transition-colors duration-300 hover:border-fg hover:bg-fg"
          >
            <div className="flex justify-between text-[13px] text-subtle transition-colors duration-300 group-hover:text-black">
              <span>{tool.category}</span>
              <span>{tool.index}</span>
            </div>
            <div className="flex items-end justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.logo}
                alt=""
                width={56}
                height={56}
                className="transition-all duration-300 group-hover:size-[72px] group-hover:brightness-0"
              />
              <span className="text-[20px] font-bold tracking-[-0.03em] transition-colors duration-300 group-hover:text-black">
                {tool.name}
              </span>
            </div>
            <span className="absolute bottom-4 left-4 text-[13px] text-subtle opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {tool.years}
            </span>
          </li>
        ))}
      </ul>

      <div className="frame flex justify-between text-sm text-subtle">
        <span>Hover a tile to see years of experience</span>
        <span>Always learning →</span>
      </div>
    </section>
  );
}

/* Highlights (16:4) — stats row + awards list. */
export function Highlights() {
  return (
    <section className="frame flex flex-col gap-14 pb-[120px]">
      <FitText text="Highlights" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Reveal key={stat.label} className="flex flex-col gap-3 bg-surface py-8">
            <span className="text-[120px] font-bold leading-[0.9] tracking-[-0.06em]">
              {stat.value}
            </span>
            <span className="text-base text-muted">{stat.label}</span>
          </Reveal>
        ))}
      </div>

      <div className="flex flex-col pt-10">
        <span className="label mb-5">(Awards &amp; Certifications)</span>
        {awards.map((award) => (
          <div
            key={award.title}
            className="group flex flex-col gap-2 border-b border-line py-7 transition-colors duration-300 hover:border-line-strong md:flex-row md:items-center md:gap-6"
          >
            <ArrowSub size={24} className="shrink-0 text-fg" />
            <span className="flex-1 text-4xl font-bold tracking-[-0.04em]">
              {award.title}
            </span>
            <span className="text-base text-muted md:w-[200px]">{award.org}</span>
            <span className="text-base text-muted">{award.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
