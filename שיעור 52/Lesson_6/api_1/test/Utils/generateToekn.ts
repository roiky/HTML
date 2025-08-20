import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function createValidToken(userName: string = "test@gmail.com", isAdmin: boolean = true): string {
    const secret = process.env.SECRET || "secret";

    const token = jwt.sign({ userName, isAdmin }, secret, { expiresIn: "1m" });

    return token;
}
