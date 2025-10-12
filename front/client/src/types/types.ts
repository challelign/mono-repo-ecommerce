import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                              🧩 Product Types                              */
/* -------------------------------------------------------------------------- */

export interface ProductType {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
}

export type ProductsType = ProductType[];

/* -------------------------------------------------------------------------- */
/*                               🛒 Cart Types                                */
/* -------------------------------------------------------------------------- */

export interface CartItemType extends ProductType {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export type CartItemsType = CartItemType[];

export interface CartStoreStateType {
  cart: CartItemsType;
  hasHydrated: boolean;
}

export interface CartStoreActionsType {
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
  clearCart: () => void;
}

/* -------------------------------------------------------------------------- */
/*                            📦 Shipping Schema                              */
/* -------------------------------------------------------------------------- */

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.string().email("Invalid email address!").min(1, "Email is required!"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 and 10 digits!")
    .max(10, "Phone number must be between 7 and 10 digits!")
    .regex(/^\d+$/, "Phone number must contain only numbers!"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

/* -------------------------------------------------------------------------- */
/*                            💳 Payment Schema                               */
/* -------------------------------------------------------------------------- */

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required!"),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must be 16 digits!"),
  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration date must be in MM/YY format!"),
  cvv: z.string().regex(/^\d{3}$/, "CVV must be 3 digits!"),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;
