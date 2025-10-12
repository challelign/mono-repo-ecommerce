"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

interface CartItemProps {
  item: {
    id: string | number;
    name: string;
    images: Record<string, string>;
    selectedColor: string;
    selectedSize: string;
    quantity: number;
    price: number;
  };
  onRemoveCart: (item: any) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemoveCart }) => {
  return (
    <div
      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
      className="flex items-center justify-between"
    >
      {/* IMAGE & DETAILS */}
      <div className="flex gap-8">
        <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={item.images[item.selectedColor]}
            alt={item.name}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
            <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
          </div>
          <p className="font-medium">${item.price.toFixed(2)}</p>
        </div>
      </div>

      {/* DELETE BUTTON */}
      <button
        onClick={() => onRemoveCart(item)}
        className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition text-red-400 flex items-center justify-center"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
};

export default CartItem;
