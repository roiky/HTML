import express, { Request, Response, NextFunction } from "express";

import * as z from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ERRORS } from "../enum/httpStatus";
dotenv.config();
const router = express.Router();

export interface ReqLocal extends Request {
    requestId: string;
    userClaims: {
        isAdmin: boolean;
        userName: string;
    };
}

export default function jwtProtected(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"];
    //const token = const authHeader = req.body.key;
    if (token) {
        jwt.verify(token, process.env.SECRET as string, function (err: any, data: any) {
            if (err) return next(new Error("Error JWT"));
            else {
                const { isAdmin, userName } = data;
                (req as ReqLocal).userClaims = { isAdmin, userName };
                return next();
            }
        });
    } else {
        return next(new Error("Error JWT"));
    }
}
