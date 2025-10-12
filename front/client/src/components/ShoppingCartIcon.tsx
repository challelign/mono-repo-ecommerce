"use client";

import useCartStore from "@/stores/cartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const ShoppingCartIcon = () => {
  const { cart, hasHydrated } = useCartStore();
  const total = useCartStore((s) => s.getCartTotal());
  const totalQty = useCartStore((s) => s.getItemCount());
  const uniqueItems = useCartStore((s) => s.getUniqueItemCount());

  if (!hasHydrated) return null;
  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-4 h-4 text-gray-600" />
      <span className="absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium">
        {/* {cart.length} */}

        {uniqueItems}
      </span>
    </Link>
  );
};

export default ShoppingCartIcon;
