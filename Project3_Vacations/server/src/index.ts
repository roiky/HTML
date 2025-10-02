import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import logger from "./logger";
import authRouter from "./routes/auth.routes";
import vacationsRouter from "./routes/vacations.routes";
import adminVacationsRouter from "./routes/vacations.admin.routes";
import reportVacationsRouter from "./routes/reports.routes";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

const uploadsPath = process.env.UPLOAD_DIR ? path.resolve(process.env.UPLOAD_DIR) : path.join(process.cwd(), "uploads"); // הכי בטוח: relative ל־project root

// public route: http://localhost:3000/uploads/<filename>
app.use(
    "/uploads",
    express.static(uploadsPath, {
        // optional settings
        maxAge: "7d",
        index: false,
    })
);

app.use("/auth", authRouter);
app.use("/vac", vacationsRouter);
app.use("/admin", adminVacationsRouter);
app.use("/reports", reportVacationsRouter);

app.get("/hc", (req, res, next) => {
    res.status(200).send("Vacations API is running!");
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
        logger.error(`Api is running on port ${PORT}!!!`);
    } else {
        logger.info(`Api is running on port ${PORT}!!!`);
        console.log(`Api is running on port ${PORT}`);
    }
});

export default app;
