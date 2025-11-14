"use client";

import type React from "react";

import { useState } from "react";
import { api } from "@/services/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";

interface GiftFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  elderName: string;
}

export function GiftFormModal({
  isOpen,
  onClose,
  elderName,
}: GiftFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/gifts", {
        ...formData,
        elderName,
      });

      toast.success(
        `🎁 Doação feita! Vamos entrar em contato com você em breve.`
      );

      setTimeout(() => {
        onClose();
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 800);
    } catch (error) {
      console.error("Erro ao enviar presente:", error);
      toast.error("❌ Não foi possível enviar. Tente novamente.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Presentear {elderName}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha seus dados para adotar este idoso neste Natal. Entraremos
            em contato para coordenar a entrega.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Seu Nome</Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem (opcional)</Label>
            <Textarea
              id="message"
              placeholder="Deixe uma mensagem carinhosa para o idoso..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 gap-2 bg-primary font-semibold text-primary-foreground"
            >
              <Heart className="h-4 w-4" />
              Confirmar Adoção
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
