import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
import { ERRORS } from "./enum/httpStatus";
import logger from "./logger";
import cors from "cors";
import getConnection from "./db";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/hc", (req, res, next) => {
    res.send("Api is Running!!");
});

// app.use("/auth", authRouter);
// app.use("/gov-il-data", govILRouter);
// app.use("/uploader", uploaderRouter);
// app.use(authorizationMiddleware); // all the routers below protected!!!
// app.use("/api/expenses", expensesRouter);
// app.use("/api/orders", ordersRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${error.message} reqeustId: ${(req as ReqLocal).requestId}`);

    switch (error.message) {
        case ERRORS.BAD_REQUEST: {
            return res.status(400).send("Bad Request");
        }
        case ERRORS.UNAUTH: {
            return res.status(401).send("Unauthorized___");
        }
        default: {
            return res.status(500).send("Something went wrong! contact Roei Kalimi and report it!");
        }
    }
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
