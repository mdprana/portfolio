import type { Metadata } from "next";
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import ProjectsGrid from "@/components/projects-grid";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main>
        <ProjectsGrid />
      </main>
      <Footer />
    </>
  );
}
