"use client";

import { Star } from "lucide-react";
import { Snowfall } from "@/components/snow-fall";

export const NoEldersAvailable = () => {
  return (
    <section
      id="idosos"
      className="on-night relative overflow-hidden bg-night py-28 text-night-foreground md:py-40"
    >
      <Snowfall count={50} />
      <div
        aria-hidden
        className="halo pointer-events-none absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--candle)_28%,transparent),transparent)]"
      />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <Star
          className="pop mx-auto mb-8 size-10 fill-candle text-candle"
          strokeWidth={1.5}
        />
        <h2 className="pop text-5xl font-medium tracking-tight md:text-6xl" style={{ ["--d" as string]: "120ms" }}>
          Missão cumprida
        </h2>
        <p
          className="pop mt-6 text-xl text-night-muted"
          style={{ ["--d" as string]: "240ms" }}
        >
          Todos os idosos foram presenteados. Graças à generosidade de pessoas
          como você, levamos alegria e amor para cada um deles neste Natal.
        </p>
      </div>
    </section>
  );
};
