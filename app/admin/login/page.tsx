"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await api.post("/admin/login", { email, password });

      if (response.data.isAdmin) {
        localStorage.setItem("isAdmin", "true");
        router.push("/admin");
      } else {
        alert("❌ Email ou senha incorretos!");
        setLoading(false);
      }
    } catch (error: any) {
      alert("❌ Erro ao tentar logar!");
      console.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-900 via-red-900 to-green-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl animate-spin-slow">
          🎄
        </div>
        <div className="absolute top-20 right-20 text-7xl animate-bounce-slow">
          ⭐
        </div>
        <div className="absolute bottom-20 left-20 text-7xl animate-pulse">
          🎁
        </div>
        <div className="absolute bottom-10 right-10 text-8xl animate-spin-slow">
          ❄️
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-70 animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 10 + 10}px`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <Button
        onClick={() => window.location.assign("/")}
        className="fixed top-6 left-6 z-50 bg-white/20 backdrop-blur-sm 
  text-white border-2 border-white/30 hover:bg-white/30"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md border-8 border-yellow-400 bg-white shadow-2xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4 animate-bounce-slow">🎅</div>
              <h1
                className="text-4xl font-bold text-green-800 mb-2"
                style={{ fontFamily: "serif" }}
              >
                Acesso Administrativo
              </h1>
              <p className="text-gray-600">
                Painel de gerenciamento do projeto
                <br />
                <span className="text-sm text-red-600 font-semibold">
                  Presentear um Idoso Natal 2025
                </span>
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-800 font-semibold">
                  📧 Email do Administrador
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    placeholder="admin@exemplo.com"
                    className="pl-10 border-2 border-green-300 focus:border-green-600 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-green-800 font-semibold"
                >
                  🔒 Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    placeholder="Digite sua senha"
                    className="pl-10 pr-10 border-2 border-green-300 focus:border-green-600 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3">
                <p className="text-xs text-yellow-800 text-center">
                  <span className="font-bold">⚠️ Área Restrita</span>
                  <br />
                  Apenas responsáveis pelo projeto têm acesso
                </p>
              </div>

              <Button
                onClick={handleLogin}
                disabled={loading}
                className="w-full h-12 bg-linear-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white text-lg font-bold border-4 border-yellow-400 shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">🎄</span>
                    Entrando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    🔓 Entrar no Painel
                  </span>
                )}
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t-2 border-gray-200">
              <p className="text-center text-xs text-gray-500">
                Problemas para acessar?
                <br />
                Entre em contato com a equipe do projeto
              </p>
            </div>
          </div>
        </Card>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
          animation-duration: 10s;
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
          animation: spin-slow 20s linear infinite;
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
