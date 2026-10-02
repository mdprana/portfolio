import type { Metadata } from "next";
import FitText from "@/components/fit-text";
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import { profile } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

const info = [
  { label: "(Email)", value: profile.email, href: `mailto:${profile.email}` },
  { label: "(Location)", value: profile.location },
  { label: "(Social)", value: profile.socialLine },
];

const fields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "company", label: "Company (optional)", type: "text", required: false },
];

/** Contact page (Figma 18:213) — fit-width title, info column, underline form. */
export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <header className="frame flex flex-col gap-10 pb-20 pt-6">
          <FitText text={profile.contactTitle} as="h1" />
          <p className="body-xl max-w-[980px] text-muted">{profile.availability}</p>
        </header>

        <section className="frame flex flex-col gap-16 pb-[120px] md:flex-row md:justify-between">
          <div className="flex flex-col gap-8">
            {info.map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                <span className="label">{item.label}</span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-2xl transition-colors duration-250 hover:text-muted"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-2xl">{item.value}</span>
                )}
              </div>
            ))}
          </div>

          <form
            className="flex w-full max-w-[750px] flex-col"
            action={`mailto:${profile.email}`}
            method="post"
            encType="text/plain"
          >
            {fields.map((field) => (
              <label
                key={field.name}
                className="flex flex-col border-b border-line py-7 transition-colors duration-300 focus-within:border-fg"
              >
                <span className="sr-only">{field.label}</span>
                <input
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  placeholder={field.label}
                  autoComplete={field.name === "company" ? "organization" : field.name}
                  className="bg-transparent text-[32px] tracking-[-0.03em] outline-none placeholder:text-subtle"
                />
              </label>
            ))}

            <label className="flex flex-col border-b border-line py-7 pb-[120px] transition-colors duration-300 focus-within:border-fg">
              <span className="sr-only">Tell me about your project</span>
              <textarea
                name="message"
                rows={2}
                required
                placeholder="Tell me about your project"
                className="resize-none bg-transparent text-[32px] tracking-[-0.03em] outline-none placeholder:text-subtle"
              />
            </label>

            <div className="pt-10">
              <button
                type="submit"
                className="inline-flex h-[51px] items-center rounded-pill bg-fg px-7 text-base font-medium text-bg transition-colors duration-300 hover:bg-muted"
              >
                Send message
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
