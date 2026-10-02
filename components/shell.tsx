import type { ReactNode } from "react";
import { Nav } from "@/components/nav";

/**
 * Page shell: nav plus a content wrapper. Every route renders inside it so
 * spacing and max-width stay identical across pages.
 */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-content flex-1 px-gutter">
        {children}
      </main>
    </>
  );
}
