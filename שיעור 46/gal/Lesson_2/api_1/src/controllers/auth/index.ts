import express, { Request, Response, NextFunction } from "express";
import { login } from "./loginHandler";
import { ERRORS } from "../../enum/httpStatus";
import * as z from "zod";
const router = express.Router();

export type User = z.infer<typeof User>;

const User = z.object({
    userName: z.email().max(30),
    password: z.string().min(4).max(20),
});

export const users = [{ userName: "admin@gmail.com", password: "admin", phone: "0504085212", age: 30 }];

function loginInputValidation(req: Request, res: Response, next: NextFunction) {
    const validation = User.safeParse(req.body);
    if (!validation.success) {
        console.log(validation);
        throw new Error(ERRORS.BAD_REQUEST);
    } else {
        next();
    }
}

const registerSchema = z.object({
    userName: z.email().max(30),
    password: z.string().min(4).max(20),
    phone: z.string().regex(/^05\d{8}$/),
    age: z.number().int().min(0).max(99),
});

function registerInputValidation(req: Request, res: Response, next: NextFunction) {
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
        console.log(validation);
        throw new Error(ERRORS.BAD_REQUEST);
    } else {
        next();
    }
}

router.post("/login", loginInputValidation, (req, res, next) => {
    try {
        const { userName, password } = req.body;
        const foundUser = login({ userName, password });
        if (foundUser) return res.json({ message: "User logged in successfully" });
        else throw new Error(ERRORS.UNAUTH);
    } catch (error) {
        console.log(error);
        return next(new Error((error as Error).message));
    }
});

router.post("/register", registerInputValidation, (req, res, next) => {
    try {
        const { userName, password, phone, age } = req.body;
        const userExist = users.find((u) => u.userName === userName);
        if (userExist) {
            throw new Error(ERRORS.EXIST);
        }
        users.push({ userName, password, phone, age });
        return res.json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        return next(new Error((error as Error).message));
    }
});

export default router;
