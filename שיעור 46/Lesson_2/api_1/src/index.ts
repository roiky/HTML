import express from "express";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import { checkApiKey } from "./middlewares/checkApiKey";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    const startTime = Date.now();
    res.on("finish", () => {
        const endTime = Date.now();
        console.log(`[${req.url} Duration]: ${endTime - startTime}ms`);
    });
    next();
});

app.get("/protected", checkApiKey, (req, res, next) => {
    res.send("You're in!");
});

//[=================================================================================]
//API LISTENER
app.listen(PORT, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(`API is running on port: ${PORT}`);
    }
});

//error middleware

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    switch (error.message) {
        case "WRONG-TOKEN": {
            return res.status(401).send("Unauthorized => Wrong Token!");
        }
        default: {
            return res.status(500).send("Something went wrong Yam is working to fix it & flight to America");
        }
    }
});
