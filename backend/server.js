import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import paymentRoute from "./routes/payment.route.js";

async function startServer() {
  const app = express();
  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:3000"],
    })
  );
  app.use(express.json());

  app.use("/api", paymentRoute);

  const PORT = process.env.PORT || 6000;

  app.listen(PORT, () => {
    console.log(`Server running on PORT = ${PORT}`);
  });
}

startServer();
