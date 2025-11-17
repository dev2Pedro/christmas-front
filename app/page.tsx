"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Gift, Sparkles, Star } from "lucide-react";
import { Snowfall } from "@/components/snow-fall";
import { ChristmasLights } from "@/components/christmas-lights";
import { ElderCard } from "@/components/elder-cards";
import { GiftFormModal } from "@/components/gift-form-modal";
import { api } from "@/services/api";

interface Elder {
  id: string;
  name: string;
  age: number;
  likes: string;
  wish: string;
  adopted: boolean;
}

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

  const handleGiftClick = (elder: any) => {
    setSelectedElder(elder);
    setIsModalOpen(true);
  };

  const scrollToElders = () => {
    const eldersSection = document.getElementById("idosos");
    eldersSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-green-900 via-red-900 to-green-900">
      <Snowfall />

      <section className="relative overflow-hidden">
        <ChristmasLights />

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-spin-slow">
            🎄
          </div>
          <div className="absolute top-20 right-20 text-5xl animate-bounce-slow">
            ⭐
          </div>
          <div className="absolute bottom-20 left-20 text-5xl animate-pulse">
            🎁
          </div>
          <div className="absolute bottom-10 right-10 text-6xl animate-spin-slow">
            ❄️
          </div>
        </div>

        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center animate-bounce-slow">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-xl border-4 border-yellow-400">
                <Star className="h-5 w-5 text-yellow-300 animate-pulse" />
                <span>Natal 2025 • Projeto Universitário</span>
                <Star className="h-5 w-5 text-yellow-300 animate-pulse" />
              </div>
            </div>

            <h1
              className="mb-6 text-6xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl animate-fade-in"
              style={{
                fontFamily: "serif",
                textShadow: "4px 4px 8px rgba(0,0,0,0.5)",
              }}
            >
              🎄 Adote um Idoso
              <br />
              neste Natal 🎅
            </h1>

            <p className="mb-8 text-xl md:text-2xl text-green-100 drop-shadow-lg font-medium">
              Espalhe amor, alegria e esperança neste Natal.
              <br />
              Seja um anjo na vida de alguém especial! ✨
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={scrollToElders}
                className="group h-14 gap-2 rounded-full bg-linear-to-r from-red-600 to-green-700 px-10 text-lg font-bold text-white shadow-2xl transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(255,0,0,0.5)] border-4 border-yellow-400"
              >
                <Heart className="h-6 w-6 animate-pulse" />
                Quero Presentear!
                <Sparkles className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
        `}</style>
      </section>

      <section className="py-16 md:py-24 bg-white/95 backdrop-blur relative">
        <div className="absolute top-0 left-0 right-0 h-16 flex justify-center items-center gap-4 text-3xl">
          <span className="animate-bounce-slow">🎄</span>
          <span className="animate-pulse">⭐</span>
          <span className="animate-bounce-slow">🎁</span>
          <span className="animate-pulse">⭐</span>
          <span className="animate-bounce-slow">🎄</span>
        </div>

        <div className="container mx-auto px-4 pt-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2
              className="mb-4 text-4xl md:text-5xl font-bold text-green-800"
              style={{ fontFamily: "serif" }}
            >
              🔔 Como Funciona 🔔
            </h2>
            <p className="text-lg text-gray-700 font-medium">
              Três passos simples para espalhar amor neste Natal
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            <Card className="border-4 border-red-600 bg-linear-to-br from-red-50 to-green-50 p-8 shadow-xl hover:scale-105 transition-all">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-red-600 to-red-700 text-3xl font-bold text-white shadow-lg border-4 border-yellow-400">
                1
              </div>
              <h3 className="mb-3 text-2xl font-bold text-green-800">
                🎅 Escolha
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Conheça as histórias e escolha o idoso que você quer presentear
              </p>
            </Card>

            <Card className="border-4 border-green-600 bg-linear-to-br from-green-50 to-red-50 p-8 shadow-xl hover:scale-105 transition-all">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-green-600 to-green-700 text-3xl font-bold text-white shadow-lg border-4 border-yellow-400">
                2
              </div>
              <h3 className="mb-3 text-2xl font-bold text-green-800">
                📝 Preencha
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Complete o formulário com seus dados e confirme sua participação
              </p>
            </Card>

            <Card className="border-4 border-red-600 bg-linear-to-br from-red-50 to-green-50 p-8 shadow-xl hover:scale-105 transition-all">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-yellow-500 to-yellow-600 text-3xl font-bold text-white shadow-lg border-4 border-red-600">
                3
              </div>
              <h3 className="mb-3 text-2xl font-bold text-green-800">
                🎁 Presenteie
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Nossa equipe coordena tudo e você traz alegria para o Natal de
                alguém!
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="idosos"
        className="py-16 md:py-24 bg-linear-to-b from-red-800 to-green-900 relative"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2
              className="mb-4 text-4xl md:text-5xl font-bold text-white drop-shadow-lg"
              style={{ fontFamily: "serif" }}
            >
              ⭐ Conheça Nossos Idosos ⭐
            </h2>
            <p className="text-xl text-green-100 font-medium">
              Cada um tem uma história única e um desejo especial
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {idosos.map((elder) => (
              <ElderCard
                key={elder.id}
                elder={elder}
                onGift={() => handleGiftClick(elder)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 text-6xl animate-bounce-slow">🎁</div>
            <h2
              className="mb-6 text-4xl md:text-5xl font-bold text-green-800"
              style={{ fontFamily: "serif" }}
            >
              Sobre o Projeto
            </h2>
            <p className="mb-8 text-lg text-gray-700 leading-relaxed">
              Este é um projeto acadêmico desenvolvido por estudantes
              universitários com o objetivo de promover solidariedade e conexão
              entre gerações. Queremos proporcionar momentos especiais para
              idosos que podem estar vivenciando o Natal de forma solitária.
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="p-6 rounded-xl bg-linear-to-br from-red-100 to-green-100 border-4 border-red-600 shadow-lg">
                <div className="mb-2 text-5xl font-bold text-red-700">
                  {idosos.length}
                </div>
                <div className="text-sm font-bold uppercase text-green-800">
                  Idosos Disponíveis
                </div>
              </div>
              <div className="p-6 rounded-xl bg-linear-to-br from-green-100 to-red-100 border-4 border-green-600 shadow-lg">
                <div className="mb-2 text-5xl font-bold text-green-700">
                  2025
                </div>
                <div className="text-sm font-bold uppercase text-green-800">
                  Primeira Edição
                </div>
              </div>
              <div className="p-6 rounded-xl bg-linear-to-br from-red-100 to-green-100 border-4 border-yellow-500 shadow-lg">
                <div className="mb-2 text-5xl">❤️</div>
                <div className="text-sm font-bold uppercase text-green-800">
                  Feito com Carinho
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-linear-to-b from-green-900 to-red-900 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-pulse">
            ⭐
          </div>
          <div className="absolute top-10 right-10 text-6xl animate-pulse">
            ⭐
          </div>
          <div className="absolute bottom-10 left-10 text-6xl animate-pulse">
            🎄
          </div>
          <div className="absolute bottom-10 right-10 text-6xl animate-pulse">
            🎄
          </div>
        </div>

        <div className="container relative mx-auto px-4">
          <Card className="mx-auto max-w-3xl border-8 border-yellow-400 bg-linear-to-br from-red-600 to-green-700 shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <div className="mb-6 text-7xl animate-bounce-slow">🎅</div>
              <h2
                className="mb-4 text-4xl md:text-5xl font-bold text-white drop-shadow-lg"
                style={{ fontFamily: "serif" }}
              >
                Participe Agora!
              </h2>
              <p className="mb-8 text-xl text-white/90 font-medium drop-shadow">
                Sua participação pode transformar o Natal de alguém.
                <br />
                Seja a estrela que ilumina a vida de um idoso! ⭐
              </p>
              <Button
                size="lg"
                onClick={scrollToElders}
                className="h-16 gap-3 rounded-full bg-yellow-400 px-12 text-xl font-bold text-green-900 shadow-2xl transition-all hover:scale-110 hover:bg-yellow-300 border-4 border-white"
              >
                <Heart className="h-6 w-6 animate-pulse" />
                Adote um Idoso Agora
                <Gift className="h-6 w-6" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <footer className="border-t-4 border-yellow-400 bg-green-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 flex justify-center gap-4 text-3xl">
            <span className="animate-bounce-slow">🎄</span>
            <span className="animate-pulse">⭐</span>
            <span className="animate-bounce-slow">🎁</span>
          </div>
          <p className="text-white font-semibold">
            Projeto Acadêmico • Desenvolvido com ❤️ • Natal 2025
          </p>
          <p className="mt-2 text-green-200 text-sm">
            Espalhando amor e alegria neste Natal 🎅✨
          </p>
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
