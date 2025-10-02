import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export interface AuthRequest extends Request {
    user?: any;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = (req.headers.authorization as string) || "";
        if (!authHeader) return res.status(401).json({ message: "Unauthorized - missing auth header" });

        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
        if (!token) return res.status(401).json({ message: "Unauthorized - missing token" });

        const secret = process.env.JWT_SECRET || "secret";

        const decoded = jwt.verify(token, secret) as JwtPayload | string;

        const userId =
            typeof decoded === "object" && decoded !== null
                ? (decoded as any).userId ?? (decoded as any).user_id ?? (decoded as any).id
                : undefined;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - token missing userId" });
        }

        (req as any).userId = Number(userId);
        (req as any).user = decoded;

        next();
    } catch (error: any) {
        if (error?.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Unauthorized - invalid token" });
    }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin role required" });
    next();
}
