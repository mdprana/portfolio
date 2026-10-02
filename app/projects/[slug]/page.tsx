import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FitText from "@/components/fit-text";
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import Reveal from "@/components/reveal";
import { nextProject, projectBySlug, projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  return {
    title: project ? `${project.title} — ${project.type}` : "Project",
    description: project?.caseStudy.problem,
  };
}

const meta = ["year", "role", "stack", "type"] as const;

/** Project Detail (Figma 17:2) — hero title, meta row, cover, case study, gallery. */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const next = nextProject(project.slug);
  const rows = [
    { label: "(Problem)", text: project.caseStudy.problem },
    { label: "(Approach)", text: project.caseStudy.approach },
    { label: "(Result)", text: project.caseStudy.result },
  ];

  const values: Record<(typeof meta)[number], string> = {
    year: project.year,
    role: project.role,
    stack: project.stack,
    type: project.type,
  };

  return (
    <>
      <Nav />
      <main>
        <section className="frame flex flex-col gap-8 pb-10 pt-6">
          <FitText text={project.title} as="h1" />
          <dl className="flex flex-wrap justify-between gap-8">
            {meta.map((key) => (
              <div key={key} className="flex flex-col gap-1.5">
                <dt className="label">
                  {`(${key[0].toUpperCase()}${key.slice(1)})`}
                </dt>
                <dd className="text-2xl font-bold tracking-[-0.03em]">
                  {values[key]}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="frame">
          <div
            className="aspect-[1392/820] w-full"
            style={{
              backgroundImage: `linear-gradient(135deg, ${project.cover[0]}, ${project.cover[1]})`,
            }}
          />
        </div>

        <section className="frame flex flex-col gap-24 py-[120px]">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-6 md:flex-row md:justify-between"
            >
              <span className="label shrink-0">{row.label}</span>
              <p className="body-xl max-w-[900px]">{row.text}</p>
            </div>
          ))}

          <div className="grid gap-6 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col gap-2 rounded-card bg-surface px-8 py-8"
              >
                <span className="text-[72px] md:text-[96px] font-bold leading-none tracking-[-0.05em]">
                  {metric.value}
                </span>
                <span className="text-base text-muted">{metric.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="frame grid gap-6 pb-[120px] md:grid-cols-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="aspect-[684/700] w-full"
              style={{
                backgroundImage: `linear-gradient(135deg, ${
                  project.cover[i % 2]
                }, ${project.cover[(i + 1) % 2]})`,
              }}
            />
          ))}
        </section>

        <Reveal>
          <Link href={`/projects/${next.slug}`} className="group frame block pb-10">
            <span className="label">(Next project)</span>
            <FitText text={`${next.title} →`} as="p" className="mt-4 transition-colors duration-300 group-hover:text-muted" />
          </Link>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
