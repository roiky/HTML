import { Request, Response, NextFunction } from "express";

export default function logDuration(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    res.on("finish", () => {
        console.log(`[${req.url} Duration]: ${Date.now() - startTime}ms`);
    });
    next();
}
