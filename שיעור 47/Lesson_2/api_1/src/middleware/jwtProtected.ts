import express, { Request, Response, NextFunction } from "express";

import * as z from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ERRORS } from "../enum/httpStatus";
dotenv.config();
const router = express.Router();

export default function jwtProtected(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    //const authHeader = req.body.key;
    if (!authHeader) {
        throw new Error(ERRORS.BAD_REQUEST);
    } else {
        //const isVerified = jwt.verify(authHeader,process.env.SECRET as string, )
        return next();
    }
}
