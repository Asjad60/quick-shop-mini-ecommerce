import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const apiURL = "http://localhost:5000/api";

const Checkout = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const secret = import.meta.env.VITE_STRIPE_PUBLISH_KEY;
      const stripe = await loadStripe(secret);
      const body = { products: cart };
      const header = { "Content-Type": "application/json" };

      const res = await fetch(`${apiURL}/create-checkout-session`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(body),
      });

      const session = await res.json();

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
        toast.error(result.error);
      }
    } catch (error) {
      console.log("error at payment: ", error);
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    const total = cart
      ?.map((item) => item.price * item.quantity)
      .reduce((acc, curr) => acc + curr);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  return (
    <div className="w-full text-white md:w-[350px] bg-gray-800 border border-gray-700 p-2 rounded-md">
      <div className="flex flex-col gap-5 ">
        <span className="text-slate-300">total items: {cart.length}</span>
        <span className="text-3xl font-semibold">Total: $ {totalPrice}</span>

        <button
          className="btn max-w-min"
          onClick={handleCheckout}
          disabled={loading}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
