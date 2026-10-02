import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

export function WorkCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-card border border-line p-3 transition-colors hover:border-white/40"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px] bg-white/[0.04]">
        <Image
          src={project.cover}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-baseline justify-between gap-4 px-1 pt-5">
        <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
        <p className="text-sm text-subtle">
          {project.year} · {project.category}
        </p>
      </div>
      <p className="max-w-prose px-1 pt-2 pb-1 text-muted">{project.summary}</p>
    </Link>
  );
}
