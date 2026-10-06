import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FitText from "@/components/fit-text";
import Reveal from "@/components/reveal";
import { ArrowRight } from "@/components/icons";
import { footerColumns, profile } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

/**
 * Contact (Figma 18:213) — header copy, then the contact details.
 * No form: the reference site and the Figma "Say Hello" link both open the
 * visitor's mail client directly, so every row is a mailto or a social URL.
 */
export default function ContactPage() {
  const socials =
    footerColumns
      .find((column) => column.label === "(Social)")
      ?.links.filter((link) => link.href && link.href !== "https://www.instagram.com/") ?? [];

  const rows = [
    { label: "Email me", value: profile.email, href: `mailto:${profile.email}` },
    ...socials.map((link) => ({ label: link.text, value: link.href, href: link.href })),
  ];

  return (
    <>
      <Nav />
      <main>
        <section className="frame flex flex-col gap-10 pb-24 pt-6">
          <FitText text="Let’s talk" as="h1" />

          <Reveal className="flex max-w-[820px] flex-col gap-6 md:ml-auto">
            <p className="body-xl text-muted">{profile.availability}</p>
          </Reveal>

          <Reveal delay={80} className="flex flex-col">
            <ul className="mt-6 w-full max-w-[980px] md:ml-auto">
              {rows.map((row) => (
                <li key={row.label} className="border-b border-line">
                  <a
                    href={row.href}
                    className="group flex items-center justify-between gap-6 py-7 transition-colors duration-300 hover:text-muted"
                  >
                    <span className="text-[clamp(32px,4.5vw,56px)] font-bold leading-none tracking-[-0.04em]">
                      {row.label}
                    </span>
                    <ArrowRight size={40} className="shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
