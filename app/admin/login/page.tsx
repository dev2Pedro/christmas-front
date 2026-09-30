"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Eye, EyeOff, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Snowfall } from "@/components/snow-fall";
import { api } from "@/lib/api";

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
        toast.error("E-mail ou senha incorretos.");
        setLoading(false);
      }
    } catch (error: unknown) {
      toast.error("Não foi possível entrar. Tente novamente.");
      console.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="on-night relative flex min-h-svh items-center justify-center overflow-hidden bg-night px-6 py-16 text-night-foreground">
      <Snowfall count={45} />
      <div
        aria-hidden
        className="halo pointer-events-none absolute left-1/2 top-1/2 size-[40rem] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--candle)_16%,transparent),transparent)]"
      />

      <Link
        href="/"
        className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm text-night-muted transition-colors hover:text-night-foreground"
      >
        <ArrowLeft className="size-4" />
        Voltar
      </Link>

      <form onSubmit={handleSubmit} className="enter relative w-full max-w-sm">
        <Star
          className="sway mb-6 size-8 fill-candle text-candle"
          strokeWidth={1.5}
          aria-hidden
        />
        <h1 className="text-4xl font-medium tracking-tight">
          Acesso administrativo
        </h1>
        <p className="mt-2 text-night-muted">
          Painel de gerenciamento · Presentear um Idoso
        </p>

        <div className="mt-10 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-night-foreground">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@exemplo.com"
              className="h-12 border-night-muted/30 bg-night-deep/60 text-night-foreground placeholder:text-night-muted/60 focus-visible:border-candle focus-visible:ring-candle/30"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-night-foreground">
              Senha
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="h-12 border-night-muted/30 bg-night-deep/60 pr-12 text-night-foreground placeholder:text-night-muted/60 focus-visible:border-candle focus-visible:ring-candle/30"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-night-muted transition-colors hover:text-night-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-full bg-candle text-base font-medium text-night-deep transition-transform hover:bg-candle/90 active:scale-[0.98]"
          >
            {loading ? "Entrando…" : "Entrar"}
          </Button>
        </div>

        <p className="mt-8 text-sm text-night-muted">
          Área restrita à equipe organizadora.
        </p>
      </form>
    </div>
  );
}
