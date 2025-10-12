import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartStoreStateType, CartStoreActionsType } from "@/types/types";

type CartStore = CartStoreStateType &
  CartStoreActionsType & {
    getCartTotal: () => number; // subtotal
    getItemCount: () => number; // total quantity
    getUniqueItemCount: () => number; // unique items count
    getDiscount: () => number; // 2% discount
    getVat: () => number; // 15% VAT
    getShippingFee: () => number; // flat or dynamic
    getTotalWithVat: () => number; // final total
    setHasHydrated: (value: boolean) => void;
  };

/*

Real-World Scenario

Subtotal: Sum of (price × quantity) for all cart items.

Discount: Usually a percentage off the subtotal (or a fixed amount). Applied before tax.

Shipping Fee: Added after subtotal-discount. Could vary by shipping method.

VAT / Tax: Usually applied after discount, sometimes after shipping depending on local law.

Total: Subtotal - Discount + Shipping Fee + VAT.
  */
const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      hasHydrated: false,

      /** Add or increment product */
      addToCart: (product) =>
        set((state) => {
          const { id, selectedSize, selectedColor } = product;
          const existingIndex = state.cart.findIndex(
            (item) =>
              item.id === id &&
              item.selectedSize === selectedSize &&
              item.selectedColor === selectedColor
          );

          if (existingIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingIndex] = {
              ...updatedCart[existingIndex],
              quantity:
                (updatedCart[existingIndex].quantity ?? 1) +
                (product.quantity ?? 1),
            };
            return { cart: updatedCart };
          }

          return {
            cart: [
              ...state.cart,
              { ...product, quantity: product.quantity ?? 1 },
            ],
          };
        }),

      /** Remove a product variant */
      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(
                item.id === product.id &&
                item.selectedSize === product.selectedSize &&
                item.selectedColor === product.selectedColor
              )
          ),
        })),

      /** Clear cart */
      clearCart: () => set({ cart: [] }),

      /** Hydration flag */
      setHasHydrated: (value) => set({ hasHydrated: value }),

      /** Derived Getters */
      getCartTotal: () =>
        get().cart.reduce(
          (sum, item) => sum + item.price * (item.quantity ?? 1),
          0
        ),

      getItemCount: () =>
        get().cart.reduce((count, item) => count + (item.quantity ?? 1), 0),

      getUniqueItemCount: () => {
        const uniqueKeys = new Set<string>();
        get().cart.forEach((item) => {
          uniqueKeys.add(
            `${item.id}-${item.selectedSize}-${item.selectedColor}`
          );
        });
        return uniqueKeys.size;
      },

      getDiscount: () => {
        const subtotal = get().getCartTotal();
        return subtotal * 0.02; // 2% discount
      },

      getShippingFee: () => 5, // flat fee for simplicity, could be dynamic

      getVat: () => {
        const subtotalAfterDiscount =
          get().getCartTotal() - get().getDiscount();
        return subtotalAfterDiscount * 0.15; // 15% VAT
      },

      getTotalWithVat: () => {
        const subtotal = get().getCartTotal();
        const discount = get().getDiscount();
        const shipping = get().getShippingFee();
        const vat = get().getVat();
        return subtotal - discount + shipping + vat;
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      },
    }
  )
);

export default useCartStore;
