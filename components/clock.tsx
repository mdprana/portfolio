"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * Live local clock, rendered only after mount so the server HTML stays static
 * (avoids a hydration mismatch on every request).
 */
export function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: site.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-subtle tabular-nums" aria-hidden={time === null}>
      {site.location.split(",")[1]?.trim().toUpperCase()} /{" "}
      <span suppressHydrationWarning>{time ?? "--:--:--"}</span>
    </span>
  );
}
