"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import Image from "next/image";

interface ElderCardProps {
  elder: {
    id: string;
    name: string;
    age: number;
    photo: string;
    likes: string;
    wish: string;
  };
  onGift: () => void;
}

export function ElderCard({ elder, onGift }: ElderCardProps) {
  return (
    <Card className="overflow-hidden border-2 transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={elder.photo || "/placeholder.svg"}
          alt={`Foto de ${elder.name}`}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-xl font-semibold text-foreground">
            {elder.name}
          </h3>
          <p className="text-sm text-muted-foreground">{elder.age} anos</p>
        </div>

        <div className="mb-4 space-y-2 text-sm">
          <div>
            <span className="font-medium text-foreground">Gosta de:</span>
            <p className="text-muted-foreground">{elder.likes}</p>
          </div>
          <div>
            <span className="font-medium text-foreground">Desejo:</span>
            <p className="text-muted-foreground">{elder.wish}</p>
          </div>
        </div>

        <Button
          onClick={onGift}
          className="w-full gap-2 bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Gift className="h-4 w-4" />
          Presentear
        </Button>
      </div>
    </Card>
  );
}
