import { z } from "zod";
// export type ProductType = {
//   id: string | number;
//   name: string;
//   shortDescription: string;
//   description: string;
//   price: number;
//   sizes: string[];
//   colors: string[];
//   images: Record<string, string>;
// };

// export type ProductsType = ProductType[];

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


export interface CartItemType extends ProductType {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

/*✅ Usage example:
const ProductsType: ProductType = [
  { id: 1, name: 'Shirt', shortDescription: 'Cotton', description: 'Soft cotton shirt', price: 20, sizes: ['M'], colors: ['Blue'], images: {} },
];

*/

export type ProductsType = ProductType[];
export type CartItemsType = CartItemType[];
// If you don’t define the alias, it’s perfectly fine — you can just use Product[] directly anywhere you need an array of products. and use in this way
/*
const ProductsType: ProductType[] = [
  { id: 1, name: 'Shirt', shortDescription: 'Cotton', description: 'Soft cotton shirt', price: 20, sizes: ['M'], colors: ['Blue'], images: {} },
];

*/

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.email().min(1, "Email is required!"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 and 10 digits!")
    .max(10, "Phone number must be between 7 and 10 digits!")
    .regex(/^\d+$/, "Phone number must contain only numbers!"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;


export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required!"),
  cardNumber: z
    .string()
    .min(16, "Card Number is required!")
    .max(16, "Card Number is required!"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format!"
    ),
  cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;