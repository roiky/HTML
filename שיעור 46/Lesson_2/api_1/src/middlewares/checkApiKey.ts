import { Request, Response, NextFunction } from "express";

export default function checkApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKeyFromQuery = req.query.apiKey;
    const validApiKey = process.env.TOKEN;

    if (apiKeyFromQuery === validApiKey) {
        return next();
    } else {
        return next(new Error("WRONG-TOKEN"));
    }
}
