import Image from "next/image";
import { techStack } from "@/lib/content";

/**
 * Tech tile grid + marquee strip. Same 12 tools on every breakpoint.
 * The Figma version revealed "N yrs" on hover only, which a touch user can
 * never reach (audit: HIGH). The category is always visible instead.
 */
function Tile({ name, slug, group }: (typeof techStack)[number]) {
  return (
    <div className="group flex flex-col items-center justify-center gap-3 rounded-card border border-line px-4 py-8 transition-colors hover:border-white/60 hover:bg-white/[0.06]">
      <Image
        src={`/logos/${slug}.svg`}
        alt=""
        width={64}
        height={64}
        className="h-12 w-12 transition-transform duration-300 group-hover:scale-110"
      />
      <span className="text-sm font-medium">{name}</span>
      <span className="text-xs text-subtle">{group}</span>
    </div>
  );
}

export function TechGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 lg:grid-cols-6">
      {techStack.map((tool) => (
        <Tile key={tool.slug} {...tool} />
      ))}
    </div>
  );
}

export function TechMarquee() {
  const loop = [...techStack, ...techStack];
  return (
    <div
      className="marquee relative flex overflow-hidden py-6"
      role="list"
      aria-label="Technology stack"
    >
      {loop.map((tool, i) => (
        <div
          key={`${tool.slug}-${i}`}
          role="listitem"
          aria-hidden={i >= techStack.length}
          className="flex shrink-0 items-center gap-3 px-6"
        >
          <Image src={`/logos/${tool.slug}.svg`} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="whitespace-nowrap text-sm text-muted">{tool.name}</span>
        </div>
      ))}
    </div>
  );
}
