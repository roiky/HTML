import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import getOrders from "./getOrders";

dotenv.config();
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const result = await getOrders();

        return res.json({ data: result });
    } catch (error) {
        res.json({ message: `there was an error ${error}` });
        return res.status(500).json({ message: "Expenses Error" });
    }
});

export default router;
