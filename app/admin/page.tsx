"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Check, X, Gift, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

// Senha simples para acesso admin (em produção, usar autenticação real)
const ADMIN_PASSWORD = "admin1234";

interface Elder {
  id: string;
  name: string;
  age: number;
  photo: string;
  likes: string;
  wish: string;
  adopted?: boolean;
}

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [elders, setElders] = useState<Elder[]>([]);

  // Carregar estado dos idosos do localStorage
  useEffect(() => {
    if (isAuthenticated) {
      const savedElders = localStorage.getItem("elders");
      if (savedElders) {
        setElders(JSON.parse(savedElders));
      } else {
        // Inicializar com dados padrão
        const initialElders = [
          {
            id: "1",
            name: "Dona Maria",
            age: 78,
            photo: "/elderly-woman-illustration-warm-smile-grandmother.jpg",
            likes: "Tricô, ouvir músicas antigas e tomar chá",
            wish: "Um kit de tricô com lãs coloridas e um rádio",
            adopted: false,
          },
          {
            id: "2",
            name: "Seu João",
            age: 82,
            photo: "/elderly-man-illustration-kind-face-grandfather.jpg",
            likes: "Jogar damas, jardinagem e contar histórias",
            wish: "Um jogo de damas e ferramentas de jardinagem",
            adopted: false,
          },
          {
            id: "3",
            name: "Dona Ana",
            age: 75,
            photo: "/elderly-woman-illustration-sweet-smile-reading.jpg",
            likes: "Ler romances, cozinhar e cuidar de plantas",
            wish: "Livros de romance e um kit de temperos",
            adopted: false,
          },
          {
            id: "4",
            name: "Seu Pedro",
            age: 80,
            photo: "/elderly-man-illustration-gentle-smile-painter.jpg",
            likes: "Pintar paisagens, ouvir rádio e fazer palavras-cruzadas",
            wish: "Tintas e pincéis para pintura",
            adopted: false,
          },
          {
            id: "5",
            name: "Dona Rosa",
            age: 76,
            photo: "/elderly-woman-illustration-happy-face-cooking.jpg",
            likes: "Cozinhar doces, bordar e assistir novelas",
            wish: "Linhas de bordar e um cobertor quentinho",
            adopted: false,
          },
          {
            id: "6",
            name: "Seu Antônio",
            age: 84,
            photo: "/elderly-man-illustration-wise-face-chess-player.jpg",
            likes: "Jogar xadrez, ler jornais e fazer caminhadas",
            wish: "Um tabuleiro de xadrez e um par de tênis confortável",
            adopted: false,
          },
        ];
        localStorage.setItem("elders", JSON.stringify(initialElders));
        setElders(initialElders);
      }
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Senha incorreta");
    }
  };

  const handleToggleAdopted = (id: string) => {
    const updatedElders = elders.map((elder) =>
      elder.id === id ? { ...elder, adopted: !elder.adopted } : elder
    );
    setElders(updatedElders);
    localStorage.setItem("elders", JSON.stringify(updatedElders));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleBackToSite = () => {
    router.push("/");
  };

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
        <Card className="w-full max-w-md p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">
              Painel Admin
            </h1>
            <p className="text-sm text-muted-foreground">
              Digite a senha para acessar o painel administrativo
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className="mt-1"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </Card>
      </main>
    );
  }

  const adoptedCount = elders.filter((elder) => elder.adopted).length;
  const availableCount = elders.length - adoptedCount;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Painel Administrativo
            </h1>
            <p className="text-sm text-muted-foreground">
              Gerencie os idosos do projeto
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleBackToSite}>
              Ver Site
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Total de Idosos
            </div>
            <div className="mt-2 text-3xl font-bold text-foreground">
              {elders.length}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Disponíveis
            </div>
            <div className="mt-2 text-3xl font-bold text-green-600">
              {availableCount}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Já Presenteados
            </div>
            <div className="mt-2 text-3xl font-bold text-primary">
              {adoptedCount}
            </div>
          </Card>
        </div>

        {/* Elders List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Lista de Idosos
          </h2>

          {elders.map((elder) => (
            <Card key={elder.id} className="overflow-hidden">
              <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center">
                {/* Photo */}
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full">
                  <img
                    src={elder.photo || "/placeholder.svg"}
                    alt={elder.name}
                    className="h-full w-full object-cover"
                  />
                  {elder.adopted && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/80">
                      <Check className="h-8 w-8 text-primary-foreground" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {elder.name}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      • {elder.age} anos
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    <strong>Gosta de:</strong> {elder.likes}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <Gift className="mr-1 inline h-4 w-4" />
                    <strong>Deseja:</strong> {elder.wish}
                  </p>
                </div>

                {/* Action Button */}
                <div className="flex flex-col items-center gap-2">
                  {elder.adopted ? (
                    <>
                      <div className="mb-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                        Presenteado
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleAdopted(elder.id)}
                        className="w-full"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Desmarcar
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => handleToggleAdopted(elder.id)}
                      className="w-full"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Marcar como Presenteado
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
