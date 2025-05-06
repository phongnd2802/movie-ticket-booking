"use client";

import { FoodItem } from "./food-item";

export function FoodGrid({ addToCart, removeFromCart, getItemQuantity }) {
  const foodItems = [
    {
      id: 1,
      name: "Combo 1 - Bắp + Nước",
      description: "1 bắp lớn + 1 nước lớn tùy chọn",
      price: 85000,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 2,
      name: "Combo 2 - Bắp + 2 Nước",
      description: "1 bắp lớn + 2 nước vừa tùy chọn",
      price: 99000,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      name: "Combo Gia Đình",
      description: "2 bắp lớn + 4 nước vừa tùy chọn",
      price: 175000,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 4,
      name: "Bắp Rang Bơ (Lớn)",
      description: "Hộp bắp rang bơ cỡ lớn",
      price: 45000,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 5,
      name: "Coca Cola (Lớn)",
      description: "Ly nước ngọt Coca Cola cỡ lớn",
      price: 40000,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 6,
      name: "Snack Mix",
      description: "Hỗn hợp snack khoai tây, bắp và đậu phộng",
      price: 55000,
      image: "/placeholder.svg?height=150&width=150",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {foodItems.map((item) => (
        <FoodItem
          key={item.id}
          item={item}
          quantity={getItemQuantity(item.id)}
          onAdd={() => addToCart(item)}
          onRemove={() => removeFromCart(item.id)}
        />
      ))}
    </div>
  );
}
