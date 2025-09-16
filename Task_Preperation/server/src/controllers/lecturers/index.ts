import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { putKnowledgeHandler } from "./putKnowLedge";
import { getLecturers, getLevels } from "../../services/lecturers.service";
import { postNewLecturer } from "./postNewLecturer";
import { removeLecturer } from "./removeLecturer";

dotenv.config();
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const result = await getLecturers();

        return res.status(200).json({ data: result });
    } catch (error) {
        res.json({ message: `there was an error ${error}` });
        return res.status(500).json({ message: "Expenses Error" });
    }
});

router.get("/levels", async (req, res, next) => {
    try {
        const result = await getLevels();

        return res.json({ data: result });
    } catch (error) {
        res.json({ message: `there was an error ${error}` });
        return res.status(500).json({ message: "Expenses Error" });
    }
});

router.put("/:id/knowledge", putKnowledgeHandler);
router.post("/addLecturer", postNewLecturer);
router.delete("/remove/:id", removeLecturer);

export default router;
