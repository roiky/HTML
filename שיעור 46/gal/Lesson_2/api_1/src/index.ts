import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import apiToken from "./middleware/api.token";
import requestDuration from "./middleware/requestDuration";
import limiter from "./middleware/rateLimiter";

import authRouter from "./controllers/auth";
import { ERRORS } from "./enum/httpStatus";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestDuration);
app.use(apiToken);
app.use(limiter);

app.get("/hc", (req, res, next) => {
    res.send("Api is Running");
});

app.use("/auth", authRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error.message);
    switch (error.message) {
        case ERRORS.BAD_REQUEST: {
            return res.status(400).send("Bad Request");
        }
        case ERRORS.UNAUTH: {
            return res.status(401).send("Unauthorized___");
        }
        case ERRORS.EXIST: {
            return res.status(401).send("Username taken!");
        }
        default: {
            return res.status(500).send("Something went wrong Yam is working to fix it & flight to America");
        }
    }
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
    } else {
        console.log(`Api is running on port ${PORT}`);
    }
});
