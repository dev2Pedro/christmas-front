"use client";

import { ArrowRight } from "lucide-react";

interface Elder {
  id: string;
  name: string;
  age: number;
  likes: string;
  wish: string;
  image?: string;
}

interface ElderCardProps {
  elder: Elder | undefined;
  onGift: () => void;
  index?: number;
}

export const ElderCard = ({ elder, onGift, index = 0 }: ElderCardProps) => {
  if (!elder) return null;

  const initial = elder.name.trim().charAt(0).toUpperCase();

  return (
    <article
      className="reveal group flex flex-col"
      style={{ animationDelay: `${(index % 3) * 80}ms` }}
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-night">
        {elder.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={elder.image}
            alt={`Retrato de ${elder.name}`}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-full w-full items-center justify-center font-display text-8xl text-candle"
          >
            {initial}
          </div>
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-night-deep/55 via-transparent to-transparent"
        />
        <p className="absolute bottom-4 left-5 font-display text-sm font-medium text-night-foreground">
          {elder.age} anos
        </p>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <h3 className="text-2xl font-medium tracking-tight">{elder.name}</h3>

        <dl className="mt-4 space-y-3 text-[0.95rem] leading-relaxed">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Sobre mim
            </dt>
            <dd>{elder.likes}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-primary">Desejo</dt>
            <dd>{elder.wish}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={onGift}
          className="group/btn mt-6 inline-flex h-12 items-center justify-between rounded-full bg-primary px-6 font-medium text-primary-foreground transition-[background-color,box-shadow,transform] duration-300 hover:bg-primary/90 hover:shadow-[0_8px_20px_-8px_var(--primary)] active:scale-[0.98]"
        >
          Presentear {elder.name.split(" ")[0]}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </article>
  );
};
