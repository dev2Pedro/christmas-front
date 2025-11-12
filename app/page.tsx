"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Gift, Sparkles } from "lucide-react";
import { ElderCard } from "@/components/elder-card";
import { GiftFormModal } from "@/components/gift-form-modal";

interface Elder {
  id: string;
  name: string;
  age: number;
  photo: string;
  likes: string;
  wish: string;
  adopted?: boolean;
}

// Dados iniciais dos idosos
const initialElders: Elder[] = [
  {
    id: "1",
    name: "Dona Maria",
    age: 78,
    photo: "/elderly-woman-illustration-warm-smile-grandmother.jpg",
    likes: "Tricô, ouvir músicas antigas e tomar chá",
    wish: "Um kit de tricô com lãs coloridas e um rádio",
  },
  {
    id: "2",
    name: "Seu João",
    age: 82,
    photo: "/elderly-man-illustration-kind-face-grandfather.jpg",
    likes: "Jogar damas, jardinagem e contar histórias",
    wish: "Um jogo de damas e ferramentas de jardinagem",
  },
  {
    id: "3",
    name: "Dona Ana",
    age: 75,
    photo: "/elderly-woman-illustration-sweet-smile-reading.jpg",
    likes: "Ler romances, cozinhar e cuidar de plantas",
    wish: "Livros de romance e um kit de temperos",
  },
  {
    id: "4",
    name: "Seu Pedro",
    age: 80,
    photo: "/elderly-man-illustration-gentle-smile-painter.jpg",
    likes: "Pintar paisagens, ouvir rádio e fazer palavras-cruzadas",
    wish: "Tintas e pincéis para pintura",
  },
  {
    id: "5",
    name: "Dona Rosa",
    age: 76,
    photo: "/elderly-woman-illustration-happy-face-cooking.jpg",
    likes: "Cozinhar doces, bordar e assistir novelas",
    wish: "Linhas de bordar e um cobertor quentinho",
  },
  {
    id: "6",
    name: "Seu Antônio",
    age: 84,
    photo: "/elderly-man-illustration-wise-face-chess-player.jpg",
    likes: "Jogar xadrez, ler jornais e fazer caminhadas",
    wish: "Um tabuleiro de xadrez e um par de tênis confortável",
  },
];

export default function Home() {
  const [selectedElder, setSelectedElder] = useState<Elder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [elders, setElders] = useState<Elder[]>(initialElders);

  useEffect(() => {
    const savedElders = localStorage.getItem("elders");
    if (savedElders) {
      setElders(JSON.parse(savedElders));
    } else {
      localStorage.setItem("elders", JSON.stringify(initialElders));
    }
  }, []);

  const availableElders = elders.filter((elder) => !elder.adopted);

  const handleGiftClick = (elder: Elder) => {
    setSelectedElder(elder);
    setIsModalOpen(true);
  };

  const scrollToElders = () => {
    const eldersSection = document.getElementById("idosos");
    eldersSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-[url('/subtle-christmas-snowflakes-pattern.jpg')] opacity-5" />

        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            {/* Decorative element */}
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent-foreground">
                <Sparkles className="h-4 w-4" />
                <span>Projeto Acadêmico • Natal 2024</span>
              </div>
            </div>

            {/* Main heading */}
            <h1 className="mb-6 text-balance font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Adote um Idoso neste Natal
            </h1>

            {/* Subtitle */}
            <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              Projeto universitário dedicado a conectar pessoas e levar alegria
              para idosos neste Natal. Participe dessa iniciativa de
              solidariedade e faça a diferença!
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={scrollToElders}
                className="group h-12 gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <Heart className="h-5 w-5 transition-transform group-hover:scale-110" />
                Quero Adotar
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-2 px-8 text-base font-semibold bg-transparent"
              >
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Como Funciona
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Participar é simples e cada passo traz um sorriso para alguém
              especial
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {/* Step 1 */}
            <Card className="relative overflow-hidden border-2 bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                Escolha um Idoso
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                Conheça as histórias e escolha quem você gostaria de presentear
                neste Natal
              </p>
            </Card>

            {/* Step 2 */}
            <Card className="relative overflow-hidden border-2 bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-2xl font-bold text-secondary">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                Preencha o Formulário
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                Informe seus dados e nos conte como deseja participar e
                presentear
              </p>
            </Card>

            {/* Step 3 */}
            <Card className="relative overflow-hidden border-2 bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-2xl font-bold text-accent-foreground">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                Espalhe Alegria
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                Nossa equipe coordena a entrega e você ajuda a tornar o Natal
                mais especial
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Elders Gallery Section */}
      <section id="idosos" className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Conheça Nossos Idosos
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Cada um tem uma história única e um desejo especial para este
              Natal. Escolha quem você gostaria de fazer feliz.
            </p>
          </div>

          {availableElders.length > 0 ? (
            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {availableElders.map((elder) => (
                <ElderCard
                  key={elder.id}
                  elder={elder}
                  onGift={() => handleGiftClick(elder)}
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl text-center">
              <Gift className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                Todos os idosos já foram adotados! Agradecemos sua generosidade.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Gift className="mx-auto mb-6 h-16 w-16 text-primary" />
            <h2 className="mb-6 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Sobre o Projeto
            </h2>
            <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">
              Este é um projeto acadêmico desenvolvido por estudantes
              universitários com o objetivo de promover solidariedade e conexão
              entre gerações. A iniciativa busca proporcionar momentos especiais
              para idosos que podem estar vivenciando o Natal de forma
              solitária.
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <div className="mb-2 text-4xl font-bold text-primary">
                  {availableElders.length}
                </div>
                <div className="text-sm uppercase tracking-wide text-muted-foreground">
                  Idosos Disponíveis
                </div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold text-secondary">
                  2025
                </div>
                <div className="text-sm uppercase tracking-wide text-muted-foreground">
                  Primeira Edição
                </div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold text-accent-foreground">
                  ❤️
                </div>
                <div className="text-sm uppercase tracking-wide text-muted-foreground">
                  Feito com Carinho
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-3xl overflow-hidden border-2 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg">
            <div className="p-8 text-center md:p-12">
              <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
                Participe do Projeto
              </h2>
              <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">
                Sua participação neste projeto pode trazer alegria e esperança.
                Juntos, vamos tornar este Natal mais especial para quem mais
                precisa de carinho e atenção.
              </p>
              <Button
                size="lg"
                onClick={scrollToElders}
                className="h-14 gap-2 rounded-full bg-primary px-10 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <Heart className="h-5 w-5" />
                Adote um Idoso Agora
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Projeto Acadêmico • Desenvolvido com carinho • Natal 2025
          </p>
        </div>
      </footer>

      {/* Gift Form Modal */}
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
