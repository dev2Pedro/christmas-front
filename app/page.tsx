"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowDown, Star } from "lucide-react";
import { Snowfall } from "@/components/snow-fall";
import { ChristmasLights } from "@/components/christmas-lights";
import { ElderCard } from "@/components/elder-cards";
import { GiftFormModal } from "@/components/gift-form-modal";
import { NoEldersAvailable } from "@/components/no-elders-available";
import { api } from "@/lib/api";

interface Elder {
  id: string;
  name: string;
  age: number;
  likes: string;
  wish: string;
  adopted: boolean;
  image?: string;
}

const STEPS = [
  {
    title: "Escolha",
    text: "Conheça as histórias e escolha o idoso que você quer presentear.",
  },
  {
    title: "Preencha",
    text: "Complete o formulário com seus dados e confirme sua participação.",
  },
  {
    title: "Presenteie",
    text: "Nossa equipe coordena tudo e você traz alegria para o Natal de alguém.",
  },
];

export default function Home() {
  const [selectedElder, setSelectedElder] = useState<Elder | null>(null);
  const [idosos, setIdosos] = useState<Elder[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function carregarIdosos() {
      try {
        const res = await api.get<Elder[]>("/elders");
        const idososDisponiveis = res.data.filter((idoso) => !idoso.adopted);
        setIdosos(idososDisponiveis);
      } catch (err) {
        console.error("Erro ao carregar idosos:", err);
      }
    }

    carregarIdosos();
  }, []);

  const handleGiftClick = (elder: Elder) => {
    setSelectedElder(elder);
    setIsModalOpen(true);
  };

  return (
    <main>
      <section className="on-night relative flex min-h-[min(100svh,54rem)] flex-col overflow-hidden bg-night text-night-foreground">
        <Snowfall />
        <ChristmasLights />
        <div
          aria-hidden
          className="halo pointer-events-none absolute left-1/2 top-[46%] size-[46rem] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--candle)_22%,transparent),transparent)]"
        />

        <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-24 pt-32 text-center">
          <Star
            className="enter sway mb-8 size-9 fill-candle text-candle"
            strokeWidth={1.5}
            aria-hidden
            style={{ ["--d" as string]: "100ms" }}
          />
          <h1
            className="enter text-[clamp(2.25rem,8vw,6rem)] font-medium leading-[0.98] tracking-tight"
            style={{ ["--d" as string]: "250ms" }}
          >
            Presentear um Idoso
            <br />
            <span className="text-candle">neste Natal</span>
          </h1>
          <p
            className="enter mt-8 max-w-xl text-lg text-night-muted md:text-xl"
            style={{ ["--d" as string]: "450ms" }}
          >
            Espalhe amor, alegria e esperança neste Natal. Seja um anjo na vida
            de alguém especial.
          </p>
          <a
            href="#idosos"
            className="enter group mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-candle px-8 text-lg font-medium text-night-deep transition-[transform,box-shadow] duration-300 hover:shadow-[0_10px_30px_-10px_var(--candle)] active:scale-[0.98]"
            style={{ ["--d" as string]: "650ms" }}
          >
            Quero presentear
            <ArrowDown className="size-5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <h2 className="reveal max-w-md text-4xl font-medium tracking-tight md:text-5xl">
          Como funciona
        </h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="reveal border-t border-foreground/20 pt-5"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <h3 className="text-2xl font-medium">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {idosos.length === 0 ? (
        <NoEldersAvailable />
      ) : (
        <section id="idosos" className="scroll-mt-4 bg-muted py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="reveal max-w-xl">
              <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
                Conheça nossos idosos
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Cada um tem uma história única e um desejo especial.
              </p>
            </div>

            <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {idosos.map((elder, i) => (
                <ElderCard
                  key={elder.id}
                  elder={elder}
                  index={i}
                  onGift={() => handleGiftClick(elder)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <h2 className="reveal text-4xl font-medium tracking-tight md:text-5xl">
          Sobre o projeto
        </h2>
        <p className="reveal mt-6 text-lg leading-relaxed text-muted-foreground">
          Este é um projeto acadêmico desenvolvido por estudantes universitários
          com o objetivo de promover solidariedade e conexão entre gerações.
          Queremos proporcionar momentos especiais para idosos que podem estar
          vivenciando o Natal de forma solitária.
        </p>
      </section>

      <footer className="on-night bg-night-deep py-10 text-night-muted">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm sm:flex-row">
          <p>Projeto acadêmico · Natal 2025</p>
          <Link
            href="/admin/login"
            className="underline decoration-night-muted/40 transition-colors hover:text-night-foreground"
          >
            Acesso administrativo
          </Link>
        </div>
      </footer>

      {selectedElder && (
        <GiftFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          elderName={selectedElder.name}
        />
      )}
    </main>
  );
}
