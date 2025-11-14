"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

interface Elder {
  id: string;
  name: string;
  age: number;
  likes: string;
  wish: string;
}

interface ElderCardProps {
  elder: Elder | undefined;
  onGift: () => void;
}

export const ElderCard = ({ elder, onGift }: ElderCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!elder) {
    return null;
  }

  const getEmoji = (id: string) => {
    const emojis: Record<string, string> = {
      "1": "👵",
      "2": "👴",
      "3": "👵",
      "4": "👴",
      "5": "👵",
    };
    return emojis[id] || "👴";
  };

  return (
    <Card
      className="relative overflow-hidden border-4 border-red-600 bg-linear-to-br from-green-50 to-red-50 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 left-0 w-16 h-16">
        <div className="absolute top-2 left-2 text-yellow-500 animate-spin-slow">
          ⭐
        </div>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16">
        <div className="absolute top-2 right-2 text-red-600 animate-bounce-slow">
          🎄
        </div>
      </div>

      <div className="absolute top-8 left-0 right-0 h-8 bg-linear-to-r from-red-600 via-red-700 to-red-600 transform -skew-y-2 shadow-md"></div>
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="w-12 h-12 bg-yellow-400 rounded-full border-4 border-red-700 flex items-center justify-center shadow-lg">
          <Gift className="w-6 h-6 text-red-700" />
        </div>
      </div>

      <div className="p-6 pt-20">
        <div className="mb-4 flex justify-center">
          <div className="relative w-32 h-32 rounded-full border-4 border-green-700 overflow-hidden shadow-xl bg-white">
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {getEmoji(elder.id)}
            </div>
          </div>
        </div>

        <h3
          className="mb-2 text-center text-2xl font-bold text-green-800"
          style={{ fontFamily: "serif" }}
        >
          {elder.name}
        </h3>
        <p className="mb-1 text-center text-sm font-medium text-red-700">
          {elder.age} anos
        </p>

        <div className="my-4 space-y-3 rounded-lg bg-white/60 p-4 border-2 border-green-200">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-green-700">
              ❤️ Gosta de:
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              {elder.likes}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-700">
              🎁 Desejo:
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              {elder.wish}
            </p>
          </div>
        </div>

        <Button
          onClick={onGift}
          className="w-full h-12 gap-2 rounded-full bg-linear-to-r from-red-600 to-green-700 text-white font-bold text-base shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:from-red-700 hover:to-green-800 group-hover:animate-pulse"
        >
          <Gift className="h-5 w-5" />
          Presentear {elder.name}
        </Button>
      </div>

      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-yellow-200/20 to-transparent animate-shimmer"></div>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </Card>
  );
};
