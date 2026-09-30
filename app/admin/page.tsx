"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Gift {
  id: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
  elderName: string;
  createdAt: string;
  status: Status;
}

interface Elder {
  id: number;
  name: string;
  age: number;
  likes: string;
  wish: string;
  adopted: boolean;
}

type Status = "pendente" | "em-contato" | "confirmado" | "entregue";

const STATUS_CONFIG = {
  pendente: { label: "Pendente", dot: "bg-amber-500" },
  "em-contato": { label: "Em contato", dot: "bg-sky-600" },
  confirmado: { label: "Confirmado", dot: "bg-emerald-600" },
  entregue: { label: "Entregue", dot: "bg-berry" },
} as const;

function StatusDot({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span
        aria-hidden
        className={`size-2 rounded-full ${cfg?.dot ?? "bg-muted-foreground"}`}
      />
      {cfg?.label ?? "Status desconhecido"}
    </span>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Gift[]>([]);
  const [idosos, setIdosos] = useState<Elder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");
  const [selectedPedido, setSelectedPedido] = useState<Gift | null>(null);
  const [viewMode, setViewMode] = useState("pedidos");

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin/login");
      return;
    }

    carregarDados();
  }, [router]);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [pedidosRes, idososRes] = await Promise.all([
        api.get<Gift[]>("/gifts"),
        api.get("/elders"),
      ]);

      if (pedidosRes.data) {
        const ordenados = pedidosRes.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPedidos(ordenados);
      }

      if (idososRes.data) {
        setIdosos(idososRes.data);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast.error("Erro ao carregar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const atualizarStatus = async (pedidoId: number, novoStatus: Status) => {
    try {
      await api.put(`/gifts/${pedidoId}`, { status: novoStatus });

      setPedidos((prev) =>
        prev.map((p) => (p.id === pedidoId ? { ...p, status: novoStatus } : p))
      );

      setSelectedPedido((prev) =>
        prev && prev.id === pedidoId ? { ...prev, status: novoStatus } : prev
      );
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro ao atualizar status. Tente novamente.");
    }
  };

  const toggleIdosoAdotado = async (idosoId: number) => {
    try {
      const idoso = idosos.find((i) => i.id === idosoId);
      if (!idoso) return;

      await api.put(`/elders/${idosoId}`, { adopted: !idoso.adopted });

      setIdosos((prev) =>
        prev.map((i) => (i.id === idosoId ? { ...i, adopted: !i.adopted } : i))
      );
    } catch (error) {
      console.error("Erro ao atualizar idoso:", error);
      toast.error("Erro ao atualizar idoso. Tente novamente.");
    }
  };

  const deletarPedido = async (pedidoId: number) => {
    if (!confirm("Tem certeza que deseja deletar este pedido?")) return;

    try {
      await api.delete(`/gifts/${pedidoId}`);
      setPedidos(pedidos.filter((p) => p.id !== pedidoId));
      setSelectedPedido(null);
    } catch (error: unknown) {
      toast.error("Erro ao deletar pedido. Tente novamente.");
    }
  };

  const pedidosFiltrados =
    filter === "todos" ? pedidos : pedidos.filter((p) => p.status === filter);

  const estatisticas = {
    total: pedidos.length,
    pendente: pedidos.filter((p) => p.status === "pendente").length,
    emContato: pedidos.filter((p) => p.status === "em-contato").length,
    confirmado: pedidos.filter((p) => p.status === "confirmado").length,
    entregue: pedidos.filter((p) => p.status === "entregue").length,
    idososAdotados: idosos.filter((i) => i.adopted).length,
    idososDisponiveis: idosos.filter((i) => !i.adopted).length,
  };

  const proximoStatus = (s: Status): Status =>
    s === "pendente"
      ? "em-contato"
      : s === "em-contato"
      ? "confirmado"
      : "entregue";

  const tabs = [
    { id: "pedidos", label: "Pedidos", count: estatisticas.total },
    { id: "idosos", label: "Idosos", count: idosos.length },
  ];

  return (
    <div className="min-h-svh bg-background">
      <header className="on-night bg-night text-night-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">
              Painel administrativo
            </h1>
            <p className="text-sm text-night-muted">
              Presentear um Idoso · Natal 2025
            </p>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-night-muted transition-colors hover:text-night-foreground"
          >
            <ArrowLeft className="size-4" />
            Voltar ao site
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <dl className="pop grid grid-cols-2 gap-x-8 gap-y-6 border-b pb-8 sm:grid-cols-3 lg:grid-cols-6">
          {[
            ["Pedidos", estatisticas.total],
            ["Pendentes", estatisticas.pendente],
            ["Em contato", estatisticas.emContato],
            ["Confirmados", estatisticas.confirmado],
            ["Entregues", estatisticas.entregue],
            [
              "Idosos presenteados",
              `${estatisticas.idososAdotados}/${idosos.length}`,
            ],
          ].map(([label, value]) => (
            <div key={label}>
              <dd className="font-display text-3xl font-medium tabular-nums">
                {value}
              </dd>
              <dt className="mt-1 text-sm text-muted-foreground">{label}</dt>
            </div>
          ))}
        </dl>

        <div role="tablist" className="mt-8 flex gap-6 border-b">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={viewMode === t.id}
              onClick={() => setViewMode(t.id)}
              className={`-mb-px border-b-2 pb-3 text-base font-medium transition-colors ${
                viewMode === t.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
              <span className="ml-2 text-sm tabular-nums text-muted-foreground">
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {viewMode === "pedidos" && (
          <section className="mt-6">
            <div className="flex flex-wrap gap-2">
              {(["todos", ...Object.keys(STATUS_CONFIG)] as string[]).map(
                (f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                    className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                      filter === f
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    {f === "todos" ? "Todos" : STATUS_CONFIG[f as Status].label}
                  </button>
                )
              )}
            </div>

            {loading ? (
              <p className="py-20 text-center text-muted-foreground">
                Carregando pedidos…
              </p>
            ) : pedidosFiltrados.length === 0 ? (
              <p className="py-20 text-center text-muted-foreground">
                Nenhum pedido encontrado.
              </p>
            ) : (
              <ul className="mt-4 divide-y">
                {pedidosFiltrados.map((pedido) => (
                  <li
                    key={pedido.id}
                    className="group grid cursor-pointer grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-4 transition-colors hover:bg-muted/60 sm:grid-cols-[1.2fr_1.2fr_auto_auto] sm:px-3"
                    onClick={() => setSelectedPedido(pedido)}
                  >
                    <button
                      className="col-span-1 text-left text-lg font-medium underline-offset-4 group-hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPedido(pedido);
                      }}
                    >
                      {pedido.elderName}
                    </button>
                    <div className="order-3 col-span-2 text-sm text-muted-foreground sm:order-none sm:col-span-1">
                      {pedido.name} ·{" "}
                      <time>
                        {new Date(pedido.createdAt).toLocaleString("pt-BR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </time>
                    </div>
                    <StatusDot status={pedido.status} />
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      disabled={pedido.status === "entregue"}
                      onClick={(e) => {
                        e.stopPropagation();
                        atualizarStatus(pedido.id, proximoStatus(pedido.status));
                      }}
                    >
                      {pedido.status === "entregue" ? (
                        "Concluído"
                      ) : (
                        <>
                          Avançar
                          <ArrowRight className="size-3.5" />
                        </>
                      )}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {viewMode === "idosos" && (
          <ul className="mt-2 divide-y">
            {idosos.map((idoso) => (
              <li
                key={idoso.id}
                className="flex items-center justify-between gap-4 py-4 sm:px-3"
              >
                <div>
                  <p className="text-lg font-medium">{idoso.name}</p>
                  <p className="mt-0.5 inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <span
                      aria-hidden
                      className={`size-2 rounded-full ${
                        idoso.adopted ? "bg-berry" : "bg-emerald-600"
                      }`}
                    />
                    {idoso.adopted ? "Adotado" : "Disponível"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => toggleIdosoAdotado(idoso.id)}
                >
                  {idoso.adopted
                    ? "Marcar como disponível"
                    : "Marcar como adotado"}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog
        open={!!selectedPedido}
        onOpenChange={(o) => !o && setSelectedPedido(null)}
      >
        {selectedPedido && (
          <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto rounded-2xl border-0 p-8">
            <DialogHeader>
              <DialogTitle className="text-3xl font-medium tracking-tight">
                {selectedPedido.elderName}
              </DialogTitle>
              <DialogDescription asChild>
                <div>
                  <StatusDot status={selectedPedido.status} />
                </div>
              </DialogDescription>
            </DialogHeader>

            <dl className="space-y-5 text-[0.95rem]">
              <div>
                <dt className="text-sm text-muted-foreground">Presenteador</dt>
                <dd className="text-lg font-medium">{selectedPedido.name}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Telefone</dt>
                <dd>
                  <a
                    href={`https://wa.me/55${selectedPedido.phone.replace(
                      /\D/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline"
                  >
                    {selectedPedido.phone}
                  </a>{" "}
                  <span className="text-sm text-muted-foreground">
                    (abre o WhatsApp)
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">E-mail</dt>
                <dd>
                  <a
                    href={`mailto:${selectedPedido.email}`}
                    className="text-primary underline"
                  >
                    {selectedPedido.email}
                  </a>
                </dd>
              </div>
              {selectedPedido.message && (
                <div>
                  <dt className="text-sm text-muted-foreground">Mensagem</dt>
                  <dd className="rounded-xl bg-muted p-4 leading-relaxed">
                    {selectedPedido.message}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-muted-foreground">
                  Data do pedido
                </dt>
                <dd>
                  {new Date(selectedPedido.createdAt).toLocaleString("pt-BR", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </dd>
              </div>
            </dl>

            <div>
              <p className="mb-3 text-sm text-muted-foreground">
                Atualizar status
              </p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(STATUS_CONFIG) as Status[]).map((status) => (
                  <button
                    key={status}
                    aria-pressed={selectedPedido.status === status}
                    onClick={() => atualizarStatus(selectedPedido.id, status)}
                    className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                      selectedPedido.status === status
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    {STATUS_CONFIG[status].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between gap-3 border-t pt-6">
              <Button
                variant="ghost"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => deletarPedido(selectedPedido.id)}
              >
                <Trash2 className="size-4" />
                Excluir pedido
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setSelectedPedido(null)}
              >
                Fechar
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
