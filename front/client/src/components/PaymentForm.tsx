import { PaymentFormInputs, paymentFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const PaymentForm = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const activeStep = parseInt(searchParams.get("step") || "3");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  const prevStep = () =>
    router.push(`/cart?step=${activeStep - 1}`, { scroll: false });

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = (data) => {};

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handlePaymentForm)}
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="cardHolder"
          className="text-xs text-gray-500 font-medium"
        >
          Name on card
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="cardHolder"
          placeholder="John Doe"
          {...register("cardHolder")}
        />
        {errors.cardHolder && (
          <p className="text-xs text-red-500">{errors.cardHolder.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="cardNumber"
          className="text-xs text-gray-500 font-medium"
        >
          Card Number
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="cardNumber"
          placeholder="123456789123"
          {...register("cardNumber")}
        />
        {errors.cardNumber && (
          <p className="text-xs text-red-500">{errors.cardNumber.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="expirationDate"
          className="text-xs text-gray-500 font-medium"
        >
          Expiration Date
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="expirationDate"
          placeholder="01/32"
          {...register("expirationDate")}
        />
        {errors.expirationDate && (
          <p className="text-xs text-red-500">
            {errors.expirationDate.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="cvv" className="text-xs text-gray-500 font-medium">
          CVV
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="cvv"
          placeholder="123"
          {...register("cvv")}
        />
        {errors.cvv && (
          <p className="text-xs text-red-500">{errors.cvv.message}</p>
        )}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Image
          src="/klarna.png"
          alt="klarna"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src="/cards.png"
          alt="cards"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src="/stripe.png"
          alt="stripe"
          width={50}
          height={25}
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={prevStep}
          className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-5 py-3 
               text-sm font-medium text-white bg-gray-600 
               hover:bg-gray-700 active:scale-[0.98] 
               rounded-lg transition-all duration-300 ease-in-out shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Checkout Button */}
        <button
          type="submit"
          className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-5 py-3 
               text-sm font-semibold text-white bg-amber-600 
               hover:bg-amber-700 active:scale-[0.98] 
               rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg hover:shadow-amber-500/20"
        >
          Checkout
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
