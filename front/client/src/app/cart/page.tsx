"use client";

import CartItemCard from "@/components/CartItemCard";
import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import { cartItems } from "@/sample/data";
import { ShippingFormInputs } from "@/types/types";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const steps = [
  {
    slug: 1,
    title: "Shopping Cart",
  },
  {
    slug: 2,
    title: "Shipping Address",
  },
  {
    slug: 3,
    title: "Payment Method",
  },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const activeStep = parseInt(searchParams.get("step") || "1");

//   const { cart, removeFromCart } = useCartStore();

//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const discount = 10;
//   const shippingFee = 10;
//   const total = subtotal - discount + shippingFee;

  const nextStep = () =>
    router.push(`/cart?step=${activeStep + 1}`, { scroll: false });

  const renderStep = () => {
    if (activeStep === 1) {
      return cartItems.map((item) => (
        <CartItemCard
          key={item.id + item.selectedColor}
          item={item}
        //   removeFromCart={removeFromCart}
        />
      ));
    }

    if (activeStep === 2) {
      return <ShippingForm setShippingForm={setShippingForm} />;
    }
    if (activeStep === 3 && shippingForm) {
      return <PaymentForm />;
    }

    return (
      <p className="text-sm text-gray-500">
        Please fill in the shipping form to continue.
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
      {/* STEPS */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            className={`flex items-center gap-2 border-b-2 pb-4 ${
              step.slug === activeStep ? "border-gray-800" : "border-gray-200"
            }`}
            key={step.slug}
          >
            <div
              className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${
                step.slug === activeStep ? "bg-gray-800" : "bg-gray-400"
              }`}
            >
              {step.slug}
            </div>
            <p
              className={`text-sm font-medium ${
                step.slug === activeStep ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
      {/* STEPS & DETAILS */}
      {/* Step content */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* Left: Step Content */}
        <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {renderStep()}
        </div>

        {/* Right: Summary */}
        <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              {/* <p className="font-medium">${subtotal.toFixed(2)}</p> */}
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Discount</p>
              {/* <p className="font-medium">${discount.toFixed(2)}</p> */}
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Shipping Fee</p>
              {/* <p className="font-medium">${shippingFee.toFixed(2)}</p> */}
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <p className="text-gray-800 font-semibold">Total</p>
              {/* <p className="font-medium">${total.toFixed(2)}</p> */}
            </div>
          </div>

          {activeStep === 1 && (
            <button
              onClick={nextStep}
              className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default CartPage;
