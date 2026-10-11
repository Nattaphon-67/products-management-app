import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import productRouter from "./router/productRouter.js";

dotenv.config();
const PORT = process.env.PORT || process.env.BACKEND_PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);

connectDB();

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1>Welcome to Restful API Product Management App</h1>");
});

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});

export default app;
