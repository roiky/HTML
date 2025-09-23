import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { ERRORS } from "./enum/httpStatus";
import logger from "./logger";
import authRouter from "./routes/auth.routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/auth", authRouter);

app.get("/hc", (req, res, next) => {
    res.status(200).send("Api is Running!!!");
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
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

export default app;
