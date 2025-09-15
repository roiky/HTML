import { Request, Response, NextFunction } from "express";
import { DOMAIN_TO_COLUMN } from "./domainMap";
import { getLevelIdByName, getLevels, updateLecturerKnowledgeById } from "../../services/lecturers.service";

export async function putKnowledgeHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const { domain, level } = req.body as { domain?: string; level?: string };

        // Basic Validation
        if (!id || id <= 0) return res.status(400).json({ message: "Invalid id" });
        if (!domain || !DOMAIN_TO_COLUMN[domain]) return res.status(400).json({ message: "Invalid domain" });

        // get Allowed Levels from DB
        const allowedLevels = await getLevels();
        if (!level || !allowedLevels.includes(level)) {
            return res.status(400).json({ message: "Invalid level" });
        }

        //
        const levelId = await getLevelIdByName(level);
        if (levelId == null) {
            return res.status(400).json({ message: "Level not found in knowledgeLevel table" });
        }

        // 4) Update the value
        const column = DOMAIN_TO_COLUMN[domain];
        const affected = await updateLecturerKnowledgeById(id, column, levelId);

        if (affected === 0) return res.status(404).json({ message: "Lecturer not found" });
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}
