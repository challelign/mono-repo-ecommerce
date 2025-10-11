"use client";
import { CartItemsType } from "@/types/types";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
interface CartItemCardProps {
  item: CartItemsType;
  removeFromCart: (item: CartItemsType) => void;
}

const CartItemCard = ({ item, removeFromCart }: CartItemCardProps) => (
  <div className="flex items-center justify-between">
    <div className="flex gap-6">
      <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={item.images[item.selectedColor]}
          alt={item.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="space-y-1 text-sm">
          <p className="font-medium">{item.name}</p>
          <p className="text-gray-500">Qty: {item.quantity}</p>
          <p className="text-gray-500">Size: {item.selectedSize}</p>
          <p className="text-gray-500">Color: {item.selectedColor}</p>
        </div>
        <p className="font-medium">${item.price.toFixed(2)}</p>
      </div>
    </div>
    <button
      onClick={() => removeFromCart(item)}
      className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full text-red-500 flex items-center justify-center"
    >
      <Trash2 className="w-3 h-3" />
    </button>
  </div>
);

export default CartItemCard;
