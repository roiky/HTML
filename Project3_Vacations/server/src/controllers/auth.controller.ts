import { Request, Response, NextFunction } from "express";
import { registerSchema, loginSchema } from "../utils/zodSchemas";
import * as usersService from "../services/users.service";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || "7d";

export async function registerHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ message: "Validation error", details: parsed.error.message });
        }
        const { first_name, last_name, email, password } = parsed.data;
        if (await usersService.isEmailExists(email)) {
            return res.status(409).json({ message: "Email already exists" });
        }
        const id = await usersService.createUser({ first_name, last_name, email, password, role: "user" });
        return res.status(201).json({ id, message: "User registered" });
    } catch (err) {
        next(err);
    }
}

export async function loginHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ message: "Validation error", details: parsed.error });
        }
        const { email, password } = parsed.data;
        const user = await usersService.findUserByEmail(email);
        if (!user || !user.password_hash) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // token payload
        const payload = {
            userId: user.user_id,
            role: user.role,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        };

        const token = jwt.sign(payload, JWT_SECRET as jwt.Secret, { expiresIn: JWT_EXPIRES } as jwt.SignOptions);
        return res.status(200).json({ token, user: payload });
    } catch (err) {
        next(err);
    }
}

export async function testAuth(req: Request, res: Response, next: NextFunction) {
    try {
        return res.status(200).json({ message: "OK" });
    } catch (err) {
        next(err);
    }
}
