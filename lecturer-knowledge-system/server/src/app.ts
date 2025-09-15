import express from "express";
import cors from "cors";
import lecturersRoutes from "./routes/lecturers.routes.js";
import { errorMiddleware } from "./middleware/error.js";

export const app = express();
app.use(cors());
app.use(express.json());

// Health Check
app.get("/hc", (_req, res) => res.json({ ok: true }));

app.use("/lecturers", lecturersRoutes);
app.use(errorMiddleware);
