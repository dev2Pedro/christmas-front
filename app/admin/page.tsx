"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gift,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  Clock,
  Eye,
  Trash2,
  RefreshCw,
  Users,
  Package,
} from "lucide-react";

import { api } from "@/services/api";

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
  pendente: {
    label: "⏰ Pendente",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    buttonColor: "bg-yellow-600 hover:bg-yellow-700",
  },
  "em-contato": {
    label: "📞 Em Contato",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
  },
  confirmado: {
    label: "✅ Confirmado",
    color: "bg-green-100 text-green-800 border-green-300",
    buttonColor: "bg-green-600 hover:bg-green-700",
  },
  entregue: {
    label: "🎁 Entregue",
    color: "bg-purple-100 text-purple-800 border-purple-300",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
  },
} as const;

export default function AdminDashboard() {
  const [pedidos, setPedidos] = useState<Gift[]>([]);
  const [idosos, setIdosos] = useState<Elder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");
  const [selectedPedido, setSelectedPedido] = useState<Gift | null>(null);
  const [viewMode, setViewMode] = useState("pedidos");

  useEffect(() => {
    carregarDados();
  }, []);

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
      alert("Erro ao carregar dados. Tente novamente.");
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
      alert("Erro ao atualizar status. Tente novamente.");
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
      alert("Erro ao atualizar idoso. Tente novamente.");
    }
  };

  const deletarPedido = async (pedidoId: number) => {
    if (!confirm("Tem certeza que deseja deletar este pedido?")) return;

    try {
      await api.delete(`/gifts/${pedidoId}`);
      setPedidos(pedidos.filter((p) => p.id !== pedidoId));
      setSelectedPedido(null);
    } catch (error: any) {
      alert("Erro ao deletar pedido. Tente novamente.");
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

  const mapaStatus: Record<
    "pendente" | "em-contato" | "confirmado" | "entregue",
    keyof typeof estatisticas
  > = {
    pendente: "pendente",
    "em-contato": "emContato",
    confirmado: "confirmado",
    entregue: "entregue",
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-red-50 to-green-50">
      <div className="bg-linear-to-r from-red-600 to-green-700 text-white py-8 shadow-xl border-b-4 border-yellow-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1
                className="text-4xl font-bold mb-2"
                style={{ fontFamily: "serif" }}
              >
                🎄 Painel Administrativo
              </h1>
              <p className="text-green-100">
                Gerenciamento - Adote um Idoso Natal 2025
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => (window.location.href = "/")}
                className="bg-yellow-500 text-white hover:bg-yellow-400 font-semibold"
              >
                ← Voltar
              </Button>

              <Button
                onClick={() => setViewMode("pedidos")}
                className={`font-semibold ${
                  viewMode === "pedidos"
                    ? "bg-white text-green-800"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                <Package className="w-4 h-4 mr-2" />
                Pedidos
              </Button>

              <Button
                onClick={() => setViewMode("idosos")}
                className={`font-semibold ${
                  viewMode === "idosos"
                    ? "bg-white text-green-800"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Idosos
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card className="p-4 text-center border-4 border-gray-300 bg-white shadow-lg hover:scale-105 transition-all">
            <div className="text-3xl font-bold text-gray-800">
              {estatisticas.total}
            </div>
            <div className="text-sm text-gray-600 font-semibold mt-1">
              Total Pedidos
            </div>
          </Card>
          <Card className="p-4 text-center border-4 border-yellow-300 bg-yellow-50 shadow-lg hover:scale-105 transition-all">
            <div className="text-3xl font-bold text-yellow-800">
              {estatisticas.pendente}
            </div>
            <div className="text-sm text-yellow-700 font-semibold mt-1">
              Pendentes
            </div>
          </Card>
          <Card className="p-4 text-center border-4 border-blue-300 bg-blue-50 shadow-lg hover:scale-105 transition-all">
            <div className="text-3xl font-bold text-blue-800">
              {estatisticas.emContato}
            </div>
            <div className="text-sm text-blue-700 font-semibold mt-1">
              Em Contato
            </div>
          </Card>
          <Card className="p-4 text-center border-4 border-green-300 bg-green-50 shadow-lg hover:scale-105 transition-all">
            <div className="text-3xl font-bold text-green-800">
              {estatisticas.confirmado}
            </div>
            <div className="text-sm text-green-700 font-semibold mt-1">
              Confirmados
            </div>
          </Card>
          <Card className="p-4 text-center border-4 border-purple-300 bg-purple-50 shadow-lg hover:scale-105 transition-all">
            <div className="text-3xl font-bold text-purple-800">
              {estatisticas.entregue}
            </div>
            <div className="text-sm text-purple-700 font-semibold mt-1">
              Entregues
            </div>
          </Card>
          <Card className="p-4 text-center border-4 border-red-300 bg-red-50 shadow-lg hover:scale-105 transition-all">
            <div className="text-2xl font-bold text-red-800">
              {estatisticas.idososAdotados}/{idosos.length}
            </div>
            <div className="text-sm text-red-700 font-semibold mt-1">
              Idosos Adotados
            </div>
          </Card>
        </div>

        {viewMode === "pedidos" && (
          <>
            <Card className="p-4 mb-6 border-4 border-red-600 bg-white shadow-lg">
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setFilter("todos")}
                  variant={filter === "todos" ? "default" : "outline"}
                  className={filter === "todos" ? "bg-gray-800 text-white" : ""}
                >
                  Todos ({estatisticas.total})
                </Button>

                {(
                  Object.entries(STATUS_CONFIG) as [
                    Status,
                    (typeof STATUS_CONFIG)[Status]
                  ][]
                ).map(([status, config]) => (
                  <Button
                    key={status}
                    onClick={() => setFilter(status)}
                    variant={filter === status ? "default" : "outline"}
                    className={
                      filter === status
                        ? config.buttonColor + " text-white"
                        : ""
                    }
                  >
                    {config.label} ({estatisticas[mapaStatus[status]]})
                  </Button>
                ))}
              </div>
            </Card>

            {loading ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 animate-spin">🎄</div>
                <p className="text-gray-600 font-semibold text-xl">
                  Carregando pedidos...
                </p>
              </div>
            ) : pedidosFiltrados.length === 0 ? (
              <Card className="p-12 text-center border-4 border-gray-300 bg-white">
                <Gift className="w-20 h-20 mx-auto mb-4 text-gray-400" />
                <p className="text-xl text-gray-600 font-semibold">
                  Nenhum pedido encontrado
                </p>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pedidosFiltrados.map((pedido) => (
                  <Card
                    key={pedido.id}
                    className="border-4 border-red-600 bg-linear-to-br from-white to-green-50 shadow-xl hover:scale-105 transition-all cursor-pointer"
                    onClick={() => setSelectedPedido(pedido)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-green-800 mb-2">
                            🎁 {pedido.elderName}
                          </h3>

                          <div
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold border-2 ${
                              STATUS_CONFIG[pedido.status]?.color ??
                              "border-gray-400 bg-gray-100 text-gray-600"
                            }`}
                          >
                            {STATUS_CONFIG[pedido.status]?.label ??
                              "Status Desconhecido"}
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPedido(pedido);
                          }}
                          className="text-green-700 hover:text-green-900"
                        >
                          <Eye className="w-5 h-5" />
                        </Button>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold text-gray-700">
                            👤
                          </span>
                          <span className="text-gray-800 font-medium">
                            {pedido.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">{pedido.phone}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-600 text-xs truncate">
                            {pedido.email}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 mb-4">
                        📅 {new Date(pedido.createdAt).toLocaleString("pt-BR")}
                      </div>

                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          const proximoStatus =
                            pedido.status === "pendente"
                              ? "em-contato"
                              : pedido.status === "em-contato"
                              ? "confirmado"
                              : pedido.status === "confirmado"
                              ? "entregue"
                              : "entregue";

                          atualizarStatus(pedido.id, proximoStatus);
                        }}
                        className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-semibold"
                        disabled={pedido.status === "entregue"}
                      >
                        {pedido.status === "entregue"
                          ? "✓ Concluído"
                          : "➜ Avançar Status"}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {viewMode === "idosos" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {idosos.map((idoso) => (
              <Card
                key={idoso.id}
                className={`border-4 ${
                  idoso.adopted
                    ? "border-purple-600 bg-linear-to-br from-purple-50 to-green-50"
                    : "border-green-600 bg-linear-to-br from-white to-green-50"
                } shadow-xl hover:scale-105 transition-all`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-green-800 mb-2">
                        {idoso.adopted ? "✓" : "○"} {idoso.name}
                      </h3>
                      <Badge
                        className={
                          idoso.adopted ? "bg-purple-600" : "bg-green-600"
                        }
                      >
                        {idoso.adopted ? "🎁 Adotado" : "📋 Disponível"}
                      </Badge>
                    </div>
                  </div>

                  <Button
                    onClick={() => toggleIdosoAdotado(idoso.id)}
                    className={`w-full ${
                      idoso.adopted
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-purple-600 hover:bg-purple-700"
                    } text-white font-semibold`}
                  >
                    {idoso.adopted
                      ? "Marcar como Disponível"
                      : "Marcar como Adotado"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedPedido && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPedido(null)}
        >
          <Card
            className="w-full max-w-2xl border-4 border-red-600 bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2
                    className="text-3xl font-bold text-green-800 mb-2"
                    style={{ fontFamily: "serif" }}
                  >
                    🎁 {selectedPedido.elderName}
                  </h2>

                  <div
                    className={`inline-block px-4 py-2 rounded-full text-sm font-bold border-2 ${
                      STATUS_CONFIG[selectedPedido.status]?.color ??
                      "border-gray-400 bg-gray-100 text-gray-600"
                    }`}
                  >
                    {STATUS_CONFIG[selectedPedido.status]?.label ??
                      "Status Desconhecido"}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedPedido(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <p className="text-sm font-semibold text-green-800 mb-2">
                    👤 Presenteador
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {selectedPedido.name}
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <p className="text-sm font-semibold text-blue-800 mb-2">
                    📞 Telefone
                  </p>
                  <a
                    href={`https://wa.me/55${selectedPedido.phone.replace(
                      /\D/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-blue-700 hover:underline flex items-center gap-2"
                  >
                    {selectedPedido.phone}
                    <span className="text-sm font-normal">
                      (Abrir WhatsApp)
                    </span>
                  </a>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <p className="text-sm font-semibold text-purple-800 mb-2">
                    📧 Email
                  </p>
                  <a
                    href={`mailto:${selectedPedido.email}`}
                    className="text-lg text-purple-700 hover:underline"
                  >
                    {selectedPedido.email}
                  </a>
                </div>

                {selectedPedido.message && (
                  <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                    <p className="text-sm font-semibold text-yellow-800 mb-2">
                      💬 Mensagem
                    </p>
                    <p className="text-gray-800 italic">
                      "{selectedPedido.message}"
                    </p>
                  </div>
                )}

                <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    📅 Data do Pedido
                  </p>
                  <p className="text-gray-800">
                    {new Date(selectedPedido.createdAt).toLocaleString(
                      "pt-BR",
                      {
                        dateStyle: "long",
                        timeStyle: "short",
                      }
                    )}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Atualizar Status:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    Object.entries(STATUS_CONFIG) as [
                      Status,
                      (typeof STATUS_CONFIG)[Status]
                    ][]
                  ).map(([status, config]) => (
                    <Button
                      key={status}
                      onClick={() => atualizarStatus(selectedPedido.id, status)}
                      variant={
                        selectedPedido.status === status ? "default" : "outline"
                      }
                      className={
                        selectedPedido.status === status
                          ? config.buttonColor + " text-white"
                          : ""
                      }
                    >
                      {config.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setSelectedPedido(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Fechar
                </Button>
                <Button
                  onClick={() => deletarPedido(selectedPedido.id)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Deletar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
