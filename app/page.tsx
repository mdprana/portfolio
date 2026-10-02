import Footer from "@/components/footer";
import Nav from "@/components/nav";
import {
  About,
  Capabilities,
  FeaturedProjects,
  Hero,
  Highlights,
  TechStack,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeaturedProjects />
        <About />
        <Capabilities />
        <TechStack />
        <Highlights />
      </main>
      <Footer />
    </>
  );
}
