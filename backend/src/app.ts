import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import sweetRoutes from "./routes/sweet.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

export default app;
