"use client";

import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FoodItem({ item, quantity, onAdd, onRemove }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(amount)
      .replace(/\s/g, "")
      .replace("₫", " ₫");
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold">{formatCurrency(item.price)}</span>

          {quantity > 0 ? (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onRemove(item.id)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onAdd(item)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => onAdd(item)}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
