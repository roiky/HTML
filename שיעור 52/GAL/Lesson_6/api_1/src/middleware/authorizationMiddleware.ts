import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface ReqLocal extends Request {
    requestId: string;
    userClaims: {
        isAdmin: boolean;
        userName: string;
    };
}

// Example of token api validation, not production
export default function authorizationMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token =
        typeof authHeader === "string" && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1] // מחלץ רק את הטוקן
            : authHeader;

    if (!token || typeof token !== "string") {
        return next(new Error("UNAUTH"));
    }

    jwt.verify(token, process.env.SECRET as string, function (err: any, data: any) {
        if (err) return next(new Error("UNAUTH"));
        const { isAdmin, userName } = data;
        (req as ReqLocal).userClaims = { isAdmin, userName };
        return next();
    });
}
