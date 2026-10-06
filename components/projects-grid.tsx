"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import FitText from "@/components/fit-text";
import WorkCard from "@/components/work-card";
import { filters, projects } from "@/lib/content";
import { color, tw } from "@/lib/motion";

/** Projects page (Figma 18:2) — fit-width title, filter chips, 2-column grid. */
export default function ProjectsGrid() {
  const [active, setActive] = useState("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.tags.includes(active)),
    [active],
  );

  return (
    <>
      <header className="frame flex flex-col gap-10 pb-10">
        <FitText text="Projects" as="h1" />
        <div className="flex flex-wrap gap-3" role="group" aria-label="Filter projects">
          {filters.map((filter) => {
            const on = filter === active;
            return (
              <motion.button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                aria-pressed={on}
                className="rounded-pill border px-5 py-2.5 text-base"
                initial={false}
                animate={
                  on
                    ? { borderColor: color.fg, backgroundColor: color.fg, color: color.bg }
                    : { borderColor: color.line, backgroundColor: color.clear, color: color.fg }
                }
                whileHover={on ? undefined : { borderColor: color.fg }}
                transition={tw(300)}
              >
                {filter}
              </motion.button>
            );
          })}
        </div>
      </header>

      <div className="frame pb-[120px]">
        <div className="grid gap-[72px] md:grid-cols-2 md:gap-x-24">
          {visible.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
        {visible.length === 0 && (
          <p className="py-16 text-muted">No projects in this category yet.</p>
        )}
      </div>
    </>
  );
}
