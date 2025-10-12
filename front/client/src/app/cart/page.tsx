"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

import useCartStore from "@/stores/cartStore";
import ShippingForm from "@/components/ShippingForm";
import PaymentForm from "@/components/PaymentForm";
import CartItem from "@/components/CartItem";
import { ShippingFormInputs } from "@/types/types";

// ---------------------------------------------------------------------------
// 🧭 Step Configuration
// ---------------------------------------------------------------------------

const checkoutSteps = [
  { id: 1, title: "Shopping Cart" },
  { id: 2, title: "Shipping Address" },
  { id: 3, title: "Payment Method" },
];

// ---------------------------------------------------------------------------
// 🛒 Cart Page Component
// ---------------------------------------------------------------------------

const CartPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeStep = Number(searchParams.get("step")) || 1;

  const { cart, removeFromCart, hasHydrated } = useCartStore();
  const itemCount = useCartStore((s) => s.getItemCount()); //all number of cart item
  const uniqueItems = useCartStore((s) => s.getUniqueItemCount()); // number of unique cart item
  const subtotal = useCartStore((s) => s.getCartTotal()); // sum of cart item price
  const discount = useCartStore((s) => s.getDiscount()); // 2% of subtotal
  const shippingFee = useCartStore((s) => s.getShippingFee()); // shipping fee 5
  const totalWithVat = useCartStore((s) => s.getTotalWithVat()); // includes discount, shipping, VAT
  const vatOnly = useCartStore((s) => s.getVat()); //  VAT only price

  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  // -------------------------------------------------------------------------
  // 🧱 Step Components Renderer
  // -------------------------------------------------------------------------
  const renderStepContent = () => {
    if (activeStep === 1) {
      return cart.length > 0 ? (
        cart.map((item) => (
          <CartItem
            key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
            item={item}
            onRemoveCart={removeFromCart}
          />
        ))
      ) : (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      );
    }

    if (activeStep === 2)
      return <ShippingForm setShippingForm={setShippingForm} />;
    if (activeStep === 3 && shippingForm) return <PaymentForm />;

    return (
      <p className="text-sm text-gray-500">
        Please fill in the shipping form to continue.
      </p>
    );
  };

  // -------------------------------------------------------------------------
  // 💳 Render
  // -------------------------------------------------------------------------
  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {hasHydrated && uniqueItems > 0 ? (
        <>
          {/* Title & Stats */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              Your Shopping Cart
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-600 text-sm mt-1">
              <p>
                <span className="font-medium">Total Price:</span> $
                {subtotal.toFixed(2)}
              </p>
              <p>
                <span className="font-medium">Total Quantity:</span> {itemCount}
              </p>
              <p>
                <span className="font-medium">Unique Items:</span> {uniqueItems}
              </p>
            </div>
          </div>

          {/* Steps Navigation */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {checkoutSteps.map(({ id, title }) => {
              const isActive = id === activeStep;
              return (
                <div
                  key={id}
                  className={`flex items-center gap-2 border-b-2 pb-4 transition-colors ${
                    isActive ? "border-gray-800" : "border-gray-200"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${
                      isActive ? "bg-gray-800" : "bg-gray-400"
                    }`}
                  >
                    {id}
                  </div>
                  <p
                    className={`text-sm font-medium ${
                      isActive ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    {title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Main Layout */}
          <div className="w-full flex flex-col lg:flex-row gap-16">
            {/* Left Section - Step Content */}
            <div className="w-full lg:w-7/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8">
              {renderStepContent()}
            </div>

            {/* Right Section - Order Summary */}
            <div className="w-full lg:w-5/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
              <h2 className="font-semibold text-lg">Order Summary</h2>

              <div className="flex flex-col gap-4 text-sm text-gray-700">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>

                {/* Discount */}
                <div className="flex justify-between text-green-600">
                  <p>Discount (2%)</p>
                  <p>- ${discount.toFixed(2)}</p>
                </div>

                {/* Shipping */}
                <div className="flex justify-between">
                  <p>Shipping Fee</p>
                  <p>${shippingFee.toFixed(2)}</p>
                </div>

                {/* VAT */}
                <div className="flex justify-between text-blue-600">
                  <p>VAT (15%)</p>
                  {/* <p>+ ${useCartStore.getState().getVat().toFixed(2)}</p> */}
                  <p>+ ${vatOnly.toFixed(2)}</p>
                </div>

                <hr className="border-gray-200" />

                {/* Total */}
                <div className="flex justify-between font-semibold text-gray-800 text-lg">
                  <p>Total</p>
                  <p>${totalWithVat.toFixed(2)}</p>
                </div>
              </div>

              {activeStep === 1 && (
                <button
                  onClick={() => router.push("/cart?step=2", { scroll: false })}
                  className="w-full mt-4 px-5 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
          <div className="flex items-center justify-center gap-3 text-amber-600">
            <ShoppingCart className="w-8 h-8" />
            <h1 className="text-2xl font-semibold">
              Your Shopping Cart is Empty
            </h1>
          </div>
          <p className="text-gray-500 text-sm">
            Looks like you haven’t added anything yet. Start exploring our
            products!
          </p>
          <Link
            href="/"
            className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 active:scale-[0.98] rounded-lg transition-all duration-300 ease-in-out shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
