"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, Star } from "lucide-react";

const Confetti = () => {
  const [confetti, setConfetti] = useState<
    Array<{
      id: number;
      left: number;
      animationDuration: number;
      size: number;
      color: string;
      rotation: number;
    }>
  >([]);

  useEffect(() => {
    const pieces = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 3 + Math.random() * 4,
      size: 8 + Math.random() * 8,
      color: ["#ef4444", "#22c55e", "#eab308", "#3b82f6", "#ec4899", "#f97316"][
        Math.floor(Math.random() * 6)
      ],
      rotation: Math.random() * 360,
    }));
    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animationDuration: `${piece.animationDuration}s`,
            animationDelay: `${Math.random() * 2}s`,
            transform: `rotate(${piece.rotation}deg)`,
            top: "-20px",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti-fall {
          animation: confetti-fall linear infinite;
        }
      `}</style>
    </div>
  );
};

export const NoEldersAvailable = () => {
  return (
    <>
      <Confetti />

      <section
        id="idosos"
        className="py-16 md:py-24 bg-linear-to-b from-red-800 to-green-900 relative min-h-[600px] flex items-center"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="border-8 border-yellow-400 bg-linear-to-br from-white via-green-50 to-red-50 shadow-2xl overflow-hidden">
              <div className="p-8 md:p-16 text-center">
                <div className="mb-8 flex justify-center gap-4 text-7xl">
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0s" }}
                  >
                    🎉
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  >
                    🎅
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  >
                    🎄
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  >
                    ⭐
                  </span>
                </div>

                <h2
                  className="mb-6 text-5xl md:text-6xl font-bold bg-linear-to-r from-red-600 via-green-600 to-red-600 bg-clip-text text-transparent animate-pulse"
                  style={{ fontFamily: "serif" }}
                >
                  Missão Cumprida! 🎊
                </h2>

                <div className="mb-8 space-y-4">
                  <p className="text-2xl md:text-3xl font-bold text-green-800">
                    Todos os Idosos Foram Presenteados! 💝
                  </p>

                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                    Graças à generosidade de pessoas maravilhosas como você,
                    conseguimos levar alegria e amor para todos os nossos idosos
                    neste Natal! ✨
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3 mb-8">
                  <div className="p-6 rounded-xl bg-linear-to-br from-red-100 to-red-200 border-4 border-red-500 shadow-lg">
                    <Heart className="h-12 w-12 mx-auto mb-3 text-red-600 animate-pulse" />
                    <div className="text-3xl font-bold text-red-700 mb-2">
                      100%
                    </div>
                    <div className="text-sm font-bold uppercase text-red-800">
                      Idosos Adotados
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-linear-to-br from-green-100 to-green-200 border-4 border-green-500 shadow-lg">
                    <Sparkles className="h-12 w-12 mx-auto mb-3 text-green-600 animate-pulse" />
                    <div className="text-3xl font-bold text-green-700 mb-2">
                      🎁
                    </div>
                    <div className="text-sm font-bold uppercase text-green-800">
                      Presentes Confirmados
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-linear-to-br from-yellow-100 to-yellow-200 border-4 border-yellow-500 shadow-lg">
                    <Star className="h-12 w-12 mx-auto mb-3 text-yellow-600 animate-pulse" />
                    <div className="text-3xl font-bold text-yellow-700 mb-2">
                      ❤️
                    </div>
                    <div className="text-sm font-bold uppercase text-yellow-800">
                      Amor Espalhado
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-linear-to-r from-red-600 to-green-700 border-4 border-yellow-400 shadow-xl mb-6">
                  <p className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                    "O amor não se divide, multiplica-se."
                  </p>
                  <p className="text-lg text-white/90 mt-2">
                    Obrigado por fazer parte desta corrente de amor! 🙏✨
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-lg text-gray-700 font-semibold">
                    Este Natal será especial para muitos graças a você! 🎅
                  </p>
                  <p className="text-md text-gray-600">
                    Continue espalhando amor e solidariedade por onde passar.
                  </p>
                  <div className="text-4xl mt-4 flex justify-center gap-3">
                    <span
                      className="animate-bounce"
                      style={{ animationDelay: "0s" }}
                    >
                      🎄
                    </span>
                    <span
                      className="animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    >
                      ⭐
                    </span>
                    <span
                      className="animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    >
                      🎁
                    </span>
                    <span
                      className="animate-bounce"
                      style={{ animationDelay: "0.6s" }}
                    >
                      ⭐
                    </span>
                    <span
                      className="animate-bounce"
                      style={{ animationDelay: "0.8s" }}
                    >
                      🎄
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
