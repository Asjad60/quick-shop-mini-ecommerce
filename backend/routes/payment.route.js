import { Router } from "express";
import { config } from "dotenv";
config();
const router = Router();
import Stripe from "stripe";
import sendMail from "../utils/sendMail";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { products } = req.body;
    if (!products.length) {
      return res.status(400).json({
        success: false,
        message: "Please provide atleast 1 product to make a payment",
      });
    }

    const lineItesms = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
          images: [product.imageURL],
        },
        unit_amount: Number(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItesms,
      mode: "payment",
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:5173/cart",
    });

    return res.status(200).json({
      success: true,
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    console.log("paymeny checkout error: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while payment",
    });
  }
});

router.post("/transaction-suucess", async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({
      success: false,
      message: "transaction Session id is required to save the data",
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log("Transaction log:");
    console.log({
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
    });
    // we can save this to a DB instead of console.log

    if (session.customer_details?.email) {
      await sendMail(
        session.customer_details.email,
        "Stripe Payment Successful",
        `<div>
          <p>"Thank you for being a valuable cutomer at our platform"</p>
          <span>Total Amount: ${session.amount_total}</span>
          <span>Currency: ${session.currency}</span>
          <span>Payment Status: ${session.payment_status}</span>
        </div>`
      );
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Transaction logging error:", err.message);
    return res.status(500).json({ success: false });
  }
});

export default router;
