import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { resetCart } from "../redux/slices/cartSlice";

const apiURL = "http://localhost:5000/api";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const onPaymentSuccess = async () => {
    if (!sessionId) {
      console.warn("No session_id in URL.");
      return;
    }

    await fetch(`${apiURL}/transaction-suucess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
      }),
    });
  };

  useEffect(() => {
    onPaymentSuccess();
    dispatch(resetCart());
  }, []);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-85px)]">
      <div className="flex flex-col items-center bg-cyan-950 p-4 rounded-md gap-5 max-w-3xs text-white">
        <div>
          <span className="px-3 py-1.5 text-lg bg-cyan-800 rounded-full">
            $
          </span>
        </div>
        <span className="text-2xl font-semibold">Payment Successfull</span>
        <span className="text-slate-300">Thank you for your payment</span>
        <Link to={"/"} className="btn max-w-max">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
