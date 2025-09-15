import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { putKnowledgeHandler } from "./putKnowLedge";
import { getLecturers } from "../../services/lecturers.service";

dotenv.config();
const router = express.Router();

const insertExpenses = `
        INSERT INTO northwind.expenses (id, date, category, amount, description)
        VALUES (?, ?, ?, ?, ?)
    `;

router.get("/", async (req, res, next) => {
    try {
        const result = await getLecturers();

        return res.status(200).json({ data: result });
    } catch (error) {
        res.json({ message: `there was an error ${error}` });
        return res.status(500).json({ message: "Expenses Error" });
    }
});

router.put("/:id/knowledge", putKnowledgeHandler);

export default router;
